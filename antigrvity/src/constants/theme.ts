export const COLORS = {
    primary: '#478DF5',    // 기업은행 느낌의 밝은 파란색
    background: '#F3F5F7', // 깔끔한 연회색 배경
    card: '#FFFFFF',       // 카드는 흰색
    text: {
        primary: '#1B1E26',    // 글자는 진한 곤색 (거의 검정)
        secondary: '#8B95A1',  // 보조 글자는 회색
    },
    success: '#10B981',
    error: '#EF4444',
    border: '#E5E8EB',     // 테두리는 연한 회색
} as const;

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
} as const;

export const FONT_SIZES = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
} as const;

// Border Radius 추가
export const BORDER_RADIUS = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 999,
} as const;
