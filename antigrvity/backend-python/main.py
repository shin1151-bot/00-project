"""
🚀 Antigravity Banking Backend (Main)
=====================================
이 파일은 백엔드 서버의 진입점(Entry Point)입니다.
FastAPI 앱을 생성하고, 데이터베이스를 초기화하며, 각 기능별 라우터들을 하나로 묶어줍니다.

[구조 설명]
- main.py: 앱 실행 및 설정
- database.py: DB 연결 설정 (SQLite)
- models.py: DB 테이블 정의 (ORM)
- schemas.py: 데이터 전송 객체 (DTO) 정의
- routers/: 기능별 API 분리 (auth, accounts, transfer, assets)
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from database import engine, get_db, Base, SessionLocal
import models
from routers import auth, accounts, transfer, assets

# 1. DB 테이블 생성 (앱 시작 시 자동 실행)
models.Base.metadata.create_all(bind=engine)

# Swagger 태그 메타데이터 (문서 설명용)
tags_metadata = [
    {
        "name": "auth",
        "description": "사용자 인증 및 로그인 처리",
    },
    {
        "name": "accounts",
        "description": "계좌 정보 및 입출금 거래 내역 조회",
    },
    {
        "name": "transfer",
        "description": "계좌 이체(송금) 및 잔액 차감 로직",
    },
    {
        "name": "assets",
        "description": "보유 자산(주식, 코인 등) 포트폴리오 조회",
    },
]

# 2. FastAPI 앱 설정
app = FastAPI(
    title="Antigravity Banking API",
    description="""
    # Antigravity 뱅킹 앱 백엔드 API
    
    Python **FastAPI**와 **SQLite**로 구축된 뱅킹 시스템입니다.
    
    ## 주요 기능
    * **인증**: 간편 비밀번호(PIN) 로그인
    * **조회**: 계좌 잔액, 거래 내역, 자산 현황
    * **이체**: 실시간 계좌 이체 및 트랜잭션 처리
    """,
    version="2.2.0",
    openapi_tags=tags_metadata
)

# 3. CORS 보안 설정
# 프론트엔드(React Native Web)에서의 접근을 허용합니다.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. 라우터 등록 (기능별 API 연결)
app.include_router(auth.router)     # 로그인
app.include_router(accounts.router) # 계좌 조회
app.include_router(transfer.router) # 이체
app.include_router(assets.router)   # 자산

# 5. 기본 경로 (Health Check)
@app.get("/")
def read_root():
    return {"message": "Antigravity Python Backend (Refactored) 🚀"}

# 6. 초기 데이터 주입 함수 (Seed Data)
# DB가 비어있을 때 김토스 계좌와 기초 데이터를 자동으로 넣습니다.
def init_db():
    db = SessionLocal()
    try:
        # User 테이블에 데이터가 없는지 확인
        if db.query(models.UserDB).count() == 0:
            print("🌱 DB가 비어있어 초기 데이터를 생성합니다...")
            
            # 사용자 생성 (김토스)
            user = models.UserDB(
                id="acc-1", name="김토스", pinCode="326623", 
                accountNumber="1002-123-456789", balance=5000000
            )
            db.add(user)
            
            # 초기 거래내역 생성
            tx1 = models.TransactionDB(
                id="tx-1", accountId="acc-1", type="DEPOSIT", amount=2000000, 
                description="급여 입금", transactedAt=datetime.now()
            )
            tx2 = models.TransactionDB(
                id="tx-2", accountId="acc-1", type="WITHDRAW", amount=15000, 
                description="배달의민족", transactedAt=datetime.now()
            )
            db.add(tx1)
            db.add(tx2)
            
            # 초기 자산 데이터 생성
            assets_data = [
                models.AssetDB(id="1", name="삼성전자", value=72000, change=1200, changePercent=1.65),
                models.AssetDB(id="2", name="KODEX 200", value=34500, change=-200, changePercent=-0.58),
                models.AssetDB(id="3", name="비트코인", value=85000000, change=1500000, changePercent=1.76),
                models.AssetDB(id="4", name="카카오", value=54000, change=0, changePercent=0.0),
            ]
            for asset in assets_data:
                db.add(asset)
            
            db.commit() # 변경사항 확정
            print("✅ 초기 데이터 생성 완료!")
    except Exception as e:
        print(f"❌ 초기화 중 오류 발생: {e}")
    finally:
        db.close()

# 앱 실행 시 초기화 함수 호출
init_db()

