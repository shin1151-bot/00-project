/**
 * 💾 인증 상태 저장소 (Auth Store)
 * 
 * [주요 기능]
 * 1. Zustand를 사용한 전역 로그인 상태 관리
 * 2. 사용자 정보 (User) 저장 및 관리
 * 3. login() / logout() 액션 제공
 */
import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    login: (user) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
}));
