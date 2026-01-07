import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { formatCurrency } from '../utils/formatters';

interface AccountCardProps {
    accountNumber: string;
    balance: number;
    currency: string;
    onTransferPress: () => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
    accountNumber,
    balance,
    currency,
    onTransferPress,
}) => {
    return (
        <View style={styles.wrapper}>
            {/* 1. 상단 탭 */}
            <View style={styles.tabContainer}>
                <View style={[styles.tab, styles.activeTab]}>
                    <Text style={styles.tabText}>기업은행</Text>
                </View>
                <View style={[styles.tab, styles.inactiveTab]}>
                    <Text style={[styles.tabText, styles.inactiveTabText]}>오픈뱅킹</Text>
                </View>
            </View>

            {/* 2. 메인 카드 */}
            <View style={styles.container}>
                {/* 헤더: 은행/계좌명/계좌번호 */}
                <View style={styles.header}>
                    <View style={styles.topRow}>
                        <Text style={styles.bankName}>🔵 SHINPROG</Text>
                        <TouchableOpacity>
                            <Text style={styles.copyIcon}>⋮</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.accountName}>주거래우대통장(급여통장)</Text>

                    <TouchableOpacity style={styles.accountNumberContainer}>
                        <Text style={styles.accountNumber}>{accountNumber}</Text>
                        <Text style={styles.copyIcon}>📋</Text>
                    </TouchableOpacity>
                </View>

                {/* 잔액 표시 */}
                <View style={styles.balanceContainer}>
                    <Text style={styles.balance}>{formatCurrency(balance).replace('₩', '')}</Text>
                    <Text style={styles.currency}>원</Text>
                    <Text style={styles.refreshIcon}>↻</Text>
                </View>

                {/* 하단 버튼 (이체 / ATM출금) */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.actionButton} onPress={onTransferPress}>
                        <Text style={styles.buttonText}>이체</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
                        <Text style={styles.buttonText}>ATM출금</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: SPACING.md,
        marginTop: SPACING.lg,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: -SPACING.md, // 카드가 탭을 살짝 덮게 하거나, 딱 붙게
        zIndex: 1,
        paddingLeft: SPACING.sm,
    },
    tab: {
        backgroundColor: COLORS.card,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        marginRight: 4,
    },
    activeTab: {
        backgroundColor: COLORS.card, // 활성 탭은 카드와 같은 색
    },
    inactiveTab: {
        backgroundColor: '#E5E8EB', // 밝은 회색으로 변경
    },
    tabText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        color: COLORS.text.primary,
    },
    inactiveTabText: {
        color: COLORS.text.secondary,
    },
    container: {
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: SPACING.lg,
        ...Platform.select({
            web: { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)' },
            default: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 5,
            }
        }),
    },
    header: {
        flexDirection: 'column',
        marginBottom: SPACING.xl,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    bankName: {
        fontSize: FONT_SIZES.md,
        fontWeight: '700',
        color: COLORS.primary, // 기업은행 로고 색상처럼 포인트 컬러 사용
        flexDirection: 'row',
        alignItems: 'center',
    },
    accountName: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.text.primary,
        marginBottom: SPACING.xs,
    },
    accountNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    accountNumber: {
        fontSize: FONT_SIZES.md,
        color: COLORS.text.secondary,
        marginRight: 4,
    },
    copyIcon: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
    },
    balanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end', // 잔액 우측 정렬 (이미지 참고)
        marginBottom: SPACING.xl,
    },
    balance: {
        fontSize: 32, // 더 크게
        fontWeight: '700',
        color: COLORS.text.primary,
    },
    currency: {
        fontSize: FONT_SIZES.lg,
        color: COLORS.text.primary,
        marginLeft: 4,
        marginTop: 8,
    },
    refreshIcon: {
        fontSize: FONT_SIZES.lg,
        color: COLORS.text.primary,
        marginLeft: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    actionButton: {
        flex: 1, // 5:5 비율
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryButton: {
        backgroundColor: COLORS.primary, // 같은 색
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
    },
});
