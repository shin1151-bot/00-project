# Antigravity Python Backend (FastAPI + SQLite)

이 프로젝트는 Antigravity 뱅킹 앱을 위한 백엔드 서버입니다.  
Python의 **FastAPI** 프레임워크와 **SQLite** 데이터베이스를 사용하여 가볍고 강력하게 구축되었습니다.

## 📁 프로젝트 구조 (Project Structure)

```
backend-python/
├── main.py              # 앱 진입점 (설정 및 실행)
├── database.py          # DB 연결 및 세션 설정 (bank.db)
├── models.py            # DB 스키마 정의 (User, Transaction, Asset)
├── schemas.py           # 데이터 전송 객체 (DTO) 정의
└── routers/             # API 라우터 (기능별 분리)
    ├── auth.py          # 로그인/인증
    ├── accounts.py      # 계좌 및 거래내역 조회
    ├── transfer.py      # 이체(송금) 로직
    └── assets.py        # 자산 조회
```

## 🛠️ 기술 스택 (Tech Stack)

*   **Language**: Python 3.10+
*   **Framework**: FastAPI
*   **Database**: SQLite (파일 기반 DB)
*   **ORM**: SQLAlchemy (DB 조작 라이브러리)
*   **Server**: Uvicorn (ASGI 서버)

## 🚀 실행 방법 (How to Run)

1.  **의존성 설치**:
    ```bash
    pip install fastapi uvicorn sqlalchemy
    ```

2.  **서버 실행**:
    ```bash
    python -m uvicorn main:app --reload --port 8080
    ```
    *   `--reload`: 코드가 변경되면 자동으로 서버 재시작
    *   `--port 8080`: 8080번 포트에서 실행

3.  **API 문서 확인 (Swagger UI)**:
    *   브라우저에서 `http://localhost:8080/docs` 접속
    *   모든 API를 테스트해볼 수 있습니다.

## 🔑 주요 API 명세 (API Specification)

| 기능 | HTTP Method | Endpoint | 설명 |
|---|---|---|---|
| **로그인** | `POST` | `/auth/login` | PIN 코드로 로그인 |
| **내 계좌 조회** | `GET` | `/accounts/main` | 로그인한 사용자의 계좌 정보 조회 |
| **거래 내역** | `GET` | `/accounts/{id}/transactions` | 특정 계좌의 거래 내역 조회 |
| **이체(송금)** | `POST` | `/transfer` | 잔액 차감 및 이체 내역 생성 |
| **자산 조회** | `GET` | `/assets` | 보유 주식/코인 목록 조회 |

## 💾 데이터베이스 정보

*   서버 실행 시 `bank.db` 파일이 생성됩니다.
*   초기 실행 시 '김토스' 유저와 예제 거래내역이 자동으로 생성됩니다.
*   DB를 초기화하려면 `bank.db` 파일을 삭제하고 서버를 재시작하세요.
