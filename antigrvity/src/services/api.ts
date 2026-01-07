/**
 * 🔌 Mock API 서비스
 * 
 * [역할]
 * 1. 백엔드 서버 없이 로컬 데이터를 비동기로 제공
 * 2. 계좌 정보(getAccount), 거래 내역(getTransactions), 자산 목록(getAssets) 제공
 * 3. 실제 API 연동 시 이 파일의 내용을 실제 fetch/axios 호출로 변경하면 됨
 */
import { Account, Transaction, Asset } from '../types';

const API_BASE_URL = 'http://localhost:8080';

// Mock Data removed as we are now fully integrated with Python Backend

export const api = {
    getAccount: async (): Promise<Account> => {
        try {
            const response = await fetch(`${API_BASE_URL}/accounts/main`);
            if (!response.ok) {
                // 백엔드가 꺼져있거나 에러일 경우를 대비해 폴백(Fallback)이나 에러 처리
                console.warn('Backend connection failed, using mock data fallback if necessary');
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Map Backend Data (Float/Int) to Frontend Type
            return {
                id: data.id,
                accountNumber: data.accountNumber,
                balance: data.balance,
                currency: 'KRW',
                // 백엔드에는 name 필드가 없으므로 bankName 사용하거나 하드코딩
                type: 'checking',
            };
        } catch (error) {
            console.error('API Error (getAccount):', error);
            // 에러 발생 시 UI가 깨지지 않도록 기본값 반환 혹은 재throw
            throw error;
        }
    },

    getTransactions: async (): Promise<Transaction[]> => {
        try {
            // 1. 메인 계좌 ID 가져오기 (실제로는 상태관리에 저장된 ID 사용 권장)
            const accountRes = await fetch(`${API_BASE_URL}/accounts/main`);
            const accountData = await accountRes.json();

            // 2. 해당 계좌의 거래내역 조회
            const response = await fetch(`${API_BASE_URL}/accounts/${accountData.id}/transactions`);
            const data = await response.json();

            // 3. 데이터 매핑
            return data.map((t: any) => ({
                id: t.id,
                // 백엔드: amount(항상 양수), type(DEPOSIT/WITHDRAW)
                // 프론트엔드: amount(지출은 음수로 표현하기도 함, 여기서는 type으로 구분), type(credit/debit)
                amount: t.type === 'WITHDRAW' ? -t.amount : t.amount,
                currency: 'KRW',
                description: t.description,
                date: new Date(t.transactedAt).toISOString().split('T')[0], // YYYY-MM-DD
                type: t.type === 'DEPOSIT' ? 'credit' : 'debit',
            }));
        } catch (error) {
            console.error('API Error (getTransactions):', error);
            return [];
        }
    },

    getAssets: async (): Promise<Asset[]> => {
        try {
            const response = await fetch(`${API_BASE_URL}/assets`);
            if (!response.ok) {
                throw new Error('자산 조회 실패');
            }
            return await response.json();
        } catch (error) {
            console.error('API Error (getAssets):', error);
            // 에러 시 빈 배열 반환하여 앱이 죽지 않게 함
            return [];
        }
    },

    transfer: async (amount: number, recipient: string): Promise<boolean> => {
        try {
            const response = await fetch(`${API_BASE_URL}/transfer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, recipient }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || '이체 실패');
            }

            return true;
        } catch (error) {
            console.error('API Error (transfer):', error);
            throw error;
        }
    },

    // 4. 로그인 (PIN 인증)
    login: async (pinCode: string): Promise<any> => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pinCode }),
            });

            if (!response.ok) {
                if (response.status === 401) throw new Error('비밀번호가 일치하지 않습니다.');
                throw new Error('로그인 실패');
            }

            return await response.json();
        } catch (error) {
            console.error('API Error (login):', error);
            throw error;
        }
    },
};
