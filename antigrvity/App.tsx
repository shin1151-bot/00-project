/**
 * 📱 앱 진입점 (Entry Point)
 * 
 * [주요 기능]
 * 1. 전역 상태 관리 Provider 설정 (QueryClient, SafeArea)
 * 2. 조건부 네비게이션 렌더링
 *    - 로그인 상태 (isAuthenticated) -> BottomTabNavigator (메인 앱)
 *    - 로그아웃 상태 (!isAuthenticated) -> LoginScreen (로그인 화면)
 */
/**
 * 🔐 로그인 화면 (Login Screen)
 * 
 * [주요 기능]
 * 1. 6자리 PIN 번호 인증 (테스트 번호: 123456)
 * 2. 커스텀 숫자 키패드 UI 구현
 * 3. 인증 성공 시 전역 로그인 상태(authStore) 업데이트 및 홈으로 이동
 */
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomTabNavigator } from './src/navigation/BottomTabNavigator';
import { LoginScreen } from './src/screens/LoginScreen';
import { useAuthStore } from './src/store/authStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const AppContent = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated ? <BottomTabNavigator /> : <LoginScreen />}
        <StatusBar style="dark" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
