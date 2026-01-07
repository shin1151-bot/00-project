# 프로젝트 구조 및 파일 설명

## 📂 전체 구조

```
antigrvity/
├── 📱 App.tsx                          # 앱 진입점 - Navigation & Query Provider 설정
├── 📄 index.ts                         # Expo 엔트리 포인트
├── ⚙️ babel.config.js                  # Babel 설정 (NativeWind 플러그인 포함)
├── ⚙️ tailwind.config.js               # TailwindCSS 설정 (디자인 시스템)
├── 📘 tsconfig.json                    # TypeScript 설정
├── 📦 package.json                     # 프로젝트 의존성
├── 📖 README.md                        # 프로젝트 문서
│
└── 📁 src/
    ├── 📁 components/                  # 재사용 가능한 UI 컴포넌트
    │   ├── AccountCard.tsx            # 계좌 잔액 카드 컴포넌트
    │   └── TransactionList.tsx        # 거래 내역 리스트 컴포넌트
    │
    ├── 📁 screens/                     # 화면 컴포넌트
    │   ├── HomeScreen.tsx             # 홈 화면 (계좌 요약 + 거래 내역)
    │   ├── AssetsScreen.tsx           # 자산 화면 (투자 포트폴리오)
    │   ├── ProductsScreen.tsx         # 상품 화면 (금융 상품 목록)
    │   ├── BenefitsScreen.tsx         # 혜택 화면 (캐시백, 포인트, 쿠폰)
    │   └── MoreScreen.tsx             # 더보기 화면 (설정, 고객센터)
    │
    ├── 📁 navigation/                  # 네비게이션 설정
    │   └── BottomTabNavigator.tsx     # 하단 탭 네비게이터
    │
    ├── 📁 store/                       # 상태 관리 (Zustand)
    │   └── authStore.ts               # 인증 상태 스토어
    │
    ├── 📁 services/                    # API 서비스
    │   └── api.ts                     # Mock API 함수들
    │
    ├── 📁 types/                       # TypeScript 타입 정의
    │   └── index.ts                   # 공통 타입 (User, Account, Transaction, Asset)
    │
    ├── 📁 utils/                       # 유틸리티 함수
    │   └── formatters.ts              # 포맷팅 함수 (통화, 날짜, 퍼센트)
    │
    └── 📁 constants/                   # 상수
        └── theme.ts                   # 디자인 시스템 상수 (색상, 간격, 폰트)
```

## 📝 주요 파일 설명

### 🎯 App.tsx
앱의 진입점으로, 다음을 설정합니다:
- QueryClientProvider (TanStack Query)
- NavigationContainer (React Navigation)
- BottomTabNavigator

### 🎨 tailwind.config.js
디자인 시스템 색상 정의:
- Primary: #0054FF
- Background: #F8F9FA
- Success: #10B981
- Error: #EF4444

### 📱 Screens

#### HomeScreen.tsx
- 사용자 인사말
- AccountCard (계좌 잔액 + 빠른 송금)
- TransactionList (최근 거래 내역)
- TanStack Query로 데이터 페칭

#### AssetsScreen.tsx
- 총 자산 가치 표시
- 투자 자산 목록
- 수익률 및 변동 표시

#### ProductsScreen.tsx
- 금융 상품 카드 목록
- 상품별 금리 정보

#### BenefitsScreen.tsx
- 캐시백 정보
- 포인트 잔액
- 사용 가능한 쿠폰

#### MoreScreen.tsx
- 메뉴 항목 (내 정보, 설정, 고객센터, 공지사항)
- 앱 버전 정보

### 🧩 Components

#### AccountCard.tsx
Props:
- accountNumber: string
- balance: number
- currency: string
- onTransferPress: () => void

Features:
- 그라디언트 배경
- 그림자 효과
- 빠른 송금 버튼

#### TransactionList.tsx
Props:
- transactions: Transaction[]

Features:
- 거래 내역 리스트
- 입금/출금 색상 구분
- 날짜 포맷팅

### 🔧 Services

#### api.ts
Mock API 함수들:
- `getAccount()`: 계좌 정보 조회
- `getTransactions()`: 거래 내역 조회
- `getAssets()`: 자산 정보 조회
- `transfer()`: 송금 (Mock)

### 💾 Store

#### authStore.ts
Zustand 스토어:
- user: User | null
- isAuthenticated: boolean
- login(user): void
- logout(): void

### 🛠️ Utils

#### formatters.ts
- `formatCurrency(amount, currency)`: 통화 포맷팅
- `formatDate(dateString)`: 날짜 포맷팅
- `formatPercent(value)`: 퍼센트 포맷팅

### 📐 Types

#### index.ts
타입 정의:
- User
- Account
- Transaction
- Asset

## 🎨 디자인 시스템

### 색상
```typescript
COLORS = {
  primary: '#0054FF',
  background: '#F8F9FA',
  card: '#FFFFFF',
  text: {
    primary: '#1A1A1A',
    secondary: '#6B7280',
  },
  success: '#10B981',
  error: '#EF4444',
  border: '#E5E7EB',
}
```

### 간격
```typescript
SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
}
```

### 폰트 크기
```typescript
FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
}
```

## 🚀 다음 단계

1. **실제 API 연동**: `src/services/api.ts`의 Mock 데이터를 실제 API로 교체
2. **인증 구현**: 로그인/로그아웃 기능 추가
3. **송금 기능**: 실제 송금 플로우 구현
4. **애니메이션**: React Native Reanimated로 부드러운 애니메이션 추가
5. **테스트**: Jest와 React Native Testing Library로 테스트 작성
