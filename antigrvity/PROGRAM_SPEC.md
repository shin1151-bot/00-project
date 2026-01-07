# 📑 프로그램 목록 및 기능 명세서 (Program Specifications)

**프로젝트명**: Antigravity Mock Banking App
**문서 버전**: v1.0
**작성일**: 2026-01-03

---

## 1. 📱 화면 프로그램 (Screens)
사용자와 직접 상호작용하는 UI 화면 목록입니다.

### 1.1 로그인 (LoginScreen)
- **파일 경로**: `src/screens/LoginScreen.tsx`
- **설명**: 앱 실행 시 최초로 진입하는 PIN 번호 인증 화면
- **주요 기능 & 함수**:
  - `handlePress(num)`: 키패드 숫자 입력 처리 (최대 6자리)
  - `handleDelete()`: 입력된 마지막 숫자 삭제
  - `useEffect[pin]`: 6자리 입력 완료 시 PIN 검증 (`123456`) 및 로그인 액션 호출

### 1.2 홈 (HomeScreen)
- **파일 경로**: `src/screens/HomeScreen.tsx`
- **설명**: 로그인 후 메인 대시보드. 계좌 정보와 최근 거래 내역 노출
- **주요 기능**:
  - `useQuery['account']`: `api.getAccount`를 호출하여 계좌 잔액 등 조회
  - `useQuery['transactions']`: `api.getTransactions`를 호출하여 거래 내역 조회
  - `handleTransferPress()`: [송금] 버튼 클릭 이벤트 (Alert 처리)

### 1.3 자산 (AssetsScreen)
- **파일 경로**: `src/screens/AssetsScreen.tsx`
- **설명**: 사용자의 보유 자산 현황을 시각적으로 분석하여 제공
- **주요 기능**:
  - **AssetChart (내부 컴포넌트)**: 자산 비율(투자/예적금/현금)을 CSS Bar Chart로 렌더링
  - **카테고리 탭**: 전체/입출금/예적금/투자 등 자산 유형별 필터링 UI
  - `useQuery['assets']`: `api.getAssets` 호출, 총 자산 및 수익률 계산

### 1.4 상품 (ProductsScreen)
- **파일 경로**: `src/screens/ProductsScreen.tsx`
- **설명**: 금융 상품 마케팅 및 추천 페이지
- **주요 기능**:
  - **Marketing Banner**: 가로 스크롤(Paging) 가능한 이벤트 배너 영역
  - **Product List**: 상품별(대출, 예금 등) 상세 정보 및 금리 표시
  - **Recommendation**: 혜택별 카드 추천 리스트 (가로 스크롤)

### 1.5 혜택 (BenefitsScreen)
- **파일 경로**: `src/screens/BenefitsScreen.tsx`
- **설명**: 포인트 적립 및 쿠폰 관리/이벤트 참여
- **주요 기능**:
  - `useState[points]`: 현재 나의 포인트 상태 관리
  - **Mission Grid**: 만보기, 물 마시기 등 데일리 미션 아이콘 배치
  - **Coupon Wallet**: 브랜드별 쿠폰 목록 및 D-Day 뱃지 표시

### 1.6 더보기 (MoreScreen)
- **파일 경로**: `src/screens/MoreScreen.tsx`
- **설명**: 마이페이지, 설정 메뉴 및 로그아웃
- **주요 기능**:
  - **Menu List**: 설정, 고객센터 등 바로가기 메뉴 렌더링
  - **Logout Action**: 로그아웃 Confirm Alert 노출 및 `authStore.logout()` 실행

---

## 2. 🧩 공통 컴포넌트 (Components)
화면 간 재사용되는 UI 모듈입니다.

### 2.1 계좌 카드 (AccountCard)
- **파일 경로**: `src/components/AccountCard.tsx`
- **설명**: 홈 화면 상단에 위치한 파란색 메인 계좌 카드
- **Props**:
  - `accountNumber`: 계좌 번호
  - `balance`: 현재 잔액
  - `onTransferPress`: 송금 버튼 클릭 핸들러

### 2.2 거래 내역 리스트 (TransactionList)
- **파일 경로**: `src/components/TransactionList.tsx`
- **설명**: 입출금 내역을 리스트 형태로 표시
- **Props**:
  - `transactions`: 거래 내역 데이터 배열
- **기능**: 거래 금액 포맷팅, 입금/출금 색상 구분 처리

---

## 3. 📡 데이터 서비스 & 유틸리티 (Services & Utils)

### 3.1 Mock API (api.ts)
- **파일 경로**: `src/services/api.ts`
- **설명**: 백엔드 API를 대체하는 가상 데이터 제공 서비스
- **주요 함수**:
  - `getAccount()`: 사용자 계좌 정보 반환 (Promise)
  - `getTransactions()`: 최근 거래 내역 배열 반환 (Promise)
  - `getAssets()`: 보유 자산 목록 반환 (Promise)
  - `delay(ms)`: 네트워크 지연 시뮬레이션용 유틸리티

### 3.2 포맷터 (formatters.ts)
- **파일 경로**: `src/utils/formatters.ts`
- **설명**: 데이터 표시 형식을 변환하는 순수 함수 집합
- **주요 함수**:
  - `formatCurrency(amount)`: 숫자를 통화 형식(`₩10,000`)으로 변환
  - `formatDate(dateString)`: ISO 날짜 문자열을 보기 편한 형식으로 변환
  - `formatPercent(value)`: 소수점을 백분율 문자열로 변환

---

## 4. 💾 상태 관리 (State Management)

### 4.1 인증 저장소 (authStore.ts)
- **파일 경로**: `src/store/authStore.ts`
- **설명**: 로그인 세션을 전역적으로 관리 (Zustand 사용)
- **Interface**: `AuthState`
- **주요 액션**:
  - `login(user)`: 로그인 상태를 true로 변경하고 사용자 정보 저장
  - `logout()`: 로그인 상태를 false로 변경하고 데이터 초기화

---

## 5. 🧭 네비게이션 (Navigation)

### 5.1 하단 탭 (BottomTabNavigator)
- **파일 경로**: `src/navigation/BottomTabNavigator.tsx`
- **설명**: React Navigation의 Bottom Tabs 설정
- **기능**:
  - 5개 탭(Home, Assets, Products, Benefits, More) 라우팅 설정
  - 각 탭 아이콘 및 활성화/비활성화 색상 스타일링
