export const formatCurrency = (amount: number, currency: string = 'KRW'): string => {
    if (currency === 'KRW') {
        return `₩${amount.toLocaleString('ko-KR')}`;
    }
    return `${currency} ${amount.toLocaleString()}`;
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}.${day}`;
};

export const formatPercent = (value: number): string => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
};
