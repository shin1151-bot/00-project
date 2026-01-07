# 🔙 백엔드 개발 준비 리스트 (Backend Preparation)

현재 프론트엔드(Mock Data)를 실제 백엔드 시스템으로 전환하기 위한 준비 계획입니다.

## 1. 🛠 기술 스택 선정 (Tech Stack)
팀/프로젝트 환경에 맞는 기술을 선정해야 합니다. TypeScript를 사용하는 Frontend와 언어를 통일하면 생산성이 높습니다.

*   **Runtime**: Node.js (추천)
*   **Framework**: NestJS (TypeScript 기반, 구조적임) 또는 Express.js (가볍고 빠름)
*   **Database**: PostgreSQL (금융 데이터 무결성 보장에 유리) 또는 MySQL
*   **Authentication**: JWT (JSON Web Token)
*   **ORM**: Prisma (타입 안전성 우수) 또는 TypeORM

## 2. 🗄 데이터베이스 스키마 설계 (DB Schema)
프론트엔드 데이터 모델(`src/types`)을 기반으로 설계된 초안입니다.

### 2.1 Users (사용자)
가입한 사용자 정보
- `id` (PK, UUID)
- `email` (Unique, 로그인 ID)
- `password_hash` (암호화된 비밀번호)
- `name` (표시 이름)
- `pin_code` (앱 잠금용 6자리 해시)
- `created_at`

### 2.2 Accounts (계좌)
사용자가 보유한 계좌 정보
- `id` (PK)
- `user_id` (FK -> Users)
- `account_number` (계좌번호)
- `balance` (현재 잔액, Decimal)
- `bank_name` (은행명)
- `type` (입출금/예금/적금)

### 2.3 Transactions (거래 내역)
계좌의 입출금 기록 (가장 중요)
- `id` (PK)
- `account_id` (FK -> Accounts)
- `type` (DEPOSIT / WITHDRAWL)
- `amount` (거래 금액)
- `balance_after` (거래 후 잔액)
- `description` (적요/거래처)
- `transacted_at` (거래 일시)

## 3. 🔌 API 명세서 작성 (API Specifications)
프론트엔드 `src/services/api.ts`를 대체할 실제 엔드포인트입니다.

### 인증 (Auth)
- `POST /auth/login`: 이메일/비밀번호 검증 -> Access/Refresh Token 발급
- `POST /auth/verify-pin`: PIN 번호 검증 (간편 로그인 전용)

### 홈 & 계좌 (Accounts)
- `GET /accounts/main`: 메인 계좌 정보 조회
- `GET /accounts/:id/transactions`: 특정 계좌의 거래 내역 조회 (Pagination)
- **`POST /transfers`**: 계좌 이체 실행 (Transaction 트랜잭션 처리 필수)

### 자산 & 상품 (Assets & Products)
- `GET /assets`: 사용자 자산 포트폴리오 조회
- `GET /products`: 판매 중인 금융 상품 목록 조회

### 혜택 & 유저 (User)
- `GET /user/points`: 내 포인트 조회
- `POST /user/points/claim`: 미션 완료 시 포인트 지급 처리

## 4. ⚙️ 개발 환경 및 보안 (Env & Security)

### 필수 보안 적용 사항
1.  **HTTPS 적용**: 모든 통신 암호화 (SSL 인증서)
2.  **비밀번호 해싱**: `bcrypt` 또는 `argon2` 사용하여 DB 저장
3.  **입력값 검증**: `class-validator` 등을 사용하여 잘못된 데이터 차단
4.  **JWT 관리**: Access Token(짧게), Refresh Token(길게, Secure Cookie) 분리

## 5. 🔄 프론트엔드 수정 계획 (Integration Plan)

백엔드 API가 준비되면 프론트엔드에서 다음 작업이 필요합니다.

1.  **환경 변수 설정**: `.env` 파일에 `API_BASE_URL=https://api.myservice.com` 추가
2.  **API 클라이언트 교체**: 
    - `src/services/api.ts`의 Mock 함수들을 `axios` 또는 `fetch` 호출로 변경
    - 예: `return { ...mockData }` ➡️ `return axios.get('/accounts/main')`
3.  **에러 핸들링**: 네트워크 오류, 인증 만료(401) 등에 대한 전역 처리 추가

---
**Next Action**: 
1. `nestjs`나 `express`로 백엔드 프로젝트 초기화 (`npm init`)
2. 로컬에 `PostgreSQL` 데이터베이스 설치 (또는 Docker 실행)
