export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Account {
    id: string;
    accountNumber: string;
    balance: number;
    currency: string;
    type: 'checking' | 'savings';
}

export interface Transaction {
    id: string;
    amount: number;
    currency: string;
    description: string;
    date: string;
    type: 'debit' | 'credit';
}

export interface Asset {
    id: string;
    name: string;
    value: number;
    change: number;
    changePercent: number;
}
