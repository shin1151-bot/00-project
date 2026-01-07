# 🏦 모바일 뱅킹 앱 (Mock Version)

Expo와 React Native(Web)로 구현한 핀테크 스타일의 모바일 뱅킹 애플리케이션 프로토타입입니다.
실제 백엔드 없이 작동하도록 Mock Data 서비스가 내장되어 있으며, 직관적인 UI/UX와 5개의 핵심 탭 메뉴를 제공합니다.

---

## ✨ 주요 기능 (Key Features)

### 1. 🔐 인증 시스템
- **PIN 로그인**: 6자리 비밀번호 인증 (기본값: `123456`)
- **보안 키패드**: 커스텀 숫자 키패드 UI
- **자동 전환**: 로그인/로그아웃 상태에 따른 즉각적인 화면 전환

### 2. 🏠 홈 (Home)
- **계좌 관리**: 메인 계좌 잔액 확인 및 표시
- **거래 내역**: 최근 입출금 내역 타임라인 제공
- **빠른 송금**: 직관적인 송금 버튼 (데모)

### 3. 💎 자산 (Assets)
- **포트폴리오 차트**: 자산 분포(투자, 예적금, 현금) 시각화
- **수익률 분석**: 실시간 변동률(%) 및 수익금 표시
- **자산 리스트**: 주식, 코인, 부동산 등 보유 자산 목록

### 4. 📦 상품 (Products)
- **상품 큐레이션**: 배너를 통한 신규/이벤트 상품 홍보
- **베스트 상품**: 대출, 적금 등 인기 금융 상품 TOP 3
- **카드 추천**: 가로 스크롤 형태의 추천 카드 리스트

### 5. 🎁 혜택 (Benefits)
- **포인트 시스템**: 미션 수행을 통한 포인트 적립 (애니메이션)
- **오늘의 미션**: 만보기, 물 마시기 등 데일리 미션
- **쿠폰함**: 스타벅스, 편의점 등 보유 쿠폰 관리

---

## 🛠 기술 스택 (Tech Stack)

- **Framework**: Expo (React Native Web)
- **Language**: TypeScript
- **Navigation**: React Navigation (Bottom Tabs)
- **State Management**: Zustand (Auth), TanStack Query (Server State)
- **Design**: Flexbox, Custom StyleSheet
- **Icons**: React Native Text/Emojis (for Web compatibility)

---

## 🚀 실행 방법 (Getting Started)

### 1. 설치
```bash
npm install
```

### 2. 실행 (Web)
```bash
npx expo start --web
```
브라우저에서 `http://localhost:8081` (또는 터미널에 표시된 포트)로 접속하세요.

---

## 📂 프로젝트 구조 (Structure)

```
src/
├── components/     # 재사용 가능한 UI 컴포넌트 (AccountCard, TransactionList 등)
├── constants/      # 디자인 시스템 상수 (COLORS, SPACING, FONT)
├── navigation/     # 네비게이션 설정 (BottomTabNavigator)
├── screens/        # 주요 화면 (Home, Assets, Products, Benefits, More, Login)
├── services/       # Mock API 서비스 (api.ts)
├── store/          # 전역 상태 관리 (authStore.ts)
├── types/          # TypeScript 타입 정의
└── utils/          # 유틸리티 함수 (포맷팅 등)
```

---

## 📝 개발자 노트

이 프로젝트는 프로토타이핑 목적으로 제작되었습니다.
- 모든 데이터는 `src/services/api.ts`에서 관리되는 가상(Mock) 데이터입니다.
- 웹 브라우저 환경에 최적화되어 있으나, 모바일(iOS/Android)에서도 실행 가능합니다.
