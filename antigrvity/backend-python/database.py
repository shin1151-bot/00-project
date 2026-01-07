"""
[데이터베이스 설정 파일]
SQLite 데이터베이스 연결 및 세션(Session) 설정을 담당합니다.
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLite DB 파일 경로 (현재 폴더의 bank.db 사용)
SQLALCHEMY_DATABASE_URL = "sqlite:///./bank.db"

# 1. 엔진 생성 (데이터베이스와의 연결 통로)
# check_same_thread: False 옵션은 SQLite를 멀티 스레드 환경(FastAPI)에서 쓸 때 필요합니다.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# 2. 세션 로컬 생성 (DB 세션을 생성하는 공장)
# autocommit=False: 실수로 커밋되는 것을 방지
# autoflush=False: 명시적으로 flush할 때만 DB에 반영
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 3. 모델의 기본 클래스 (모든 DB 모델은 이 Base를 상속받아야 함)
Base = declarative_base()

# 4. DB 의존성 주입 함수 (Dependency Injection)
# API 요청이 올 때마다 DB 세션을 열고, 처리가 끝나면 닫아주는 역할
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

