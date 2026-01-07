import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { Transaction } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';

type Props = StackScreenProps<HomeStackParamList, 'TransactionDetail'>;

export const TransactionDetailScreen = ({ route, navigation }: Props) => {
    const { transaction } = route.params;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backButton}>← 뒤로</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>거래 상세</Text>
                </View>

                {/* 금액 표시 */}
                <View style={styles.amountContainer}>
                    <Text style={[
                        styles.amount,
                        transaction.type === 'credit' ? styles.creditAmount : styles.debitAmount
                    ]}>
                        {transaction.type === 'credit' ? '+' : ''}{formatCurrency(transaction.amount, transaction.currency)}
                    </Text>
                    <Text style={styles.description}>{transaction.description}</Text>
                </View>

                {/* 거래 정보 */}
                <View style={styles.infoContainer}>
                    <InfoRow label="거래 일시" value={`${transaction.date} 14:32:15`} />
                    <InfoRow label="거래 유형" value={transaction.type === 'credit' ? '입금' : '출금'} />
                    <InfoRow label="거래 번호" value={transaction.id} />
                    <InfoRow label="잔액" value={formatCurrency(125430, 'KRW')} />
                </View>

                {/* 영수증 버튼 */}
                <TouchableOpacity style={styles.receiptButton}>
                    <Text style={styles.receiptButtonText}>📄 영수증 보기</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.shareButton}>
                    <Text style={styles.shareButtonText}>공유하기</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.lg,
    },
    backButton: {
        fontSize: FONT_SIZES.lg,
        color: COLORS.primary,
        fontWeight: '600',
        marginRight: SPACING.md,
    },
    title: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: '700',
        color: COLORS.text.primary,
    },
    amountContainer: {
        alignItems: 'center',
        paddingVertical: SPACING.xl,
        backgroundColor: COLORS.card,
        marginHorizontal: SPACING.md,
        borderRadius: 16,
        marginBottom: SPACING.lg,
    },
    amount: {
        fontSize: 40,
        fontWeight: '700',
        marginBottom: SPACING.sm,
    },
    creditAmount: {
        color: COLORS.success,
    },
    debitAmount: {
        color: COLORS.text.primary,
    },
    description: {
        fontSize: FONT_SIZES.lg,
        color: COLORS.text.secondary,
    },
    infoContainer: {
        backgroundColor: COLORS.card,
        marginHorizontal: SPACING.md,
        borderRadius: 16,
        padding: SPACING.md,
        marginBottom: SPACING.lg,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    infoLabel: {
        fontSize: FONT_SIZES.md,
        color: COLORS.text.secondary,
    },
    infoValue: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.text.primary,
    },
    receiptButton: {
        backgroundColor: COLORS.primary,
        marginHorizontal: SPACING.md,
        paddingVertical: SPACING.md + 4,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    receiptButtonText: {
        color: '#FFFFFF',
        fontSize: FONT_SIZES.md,
        fontWeight: '700',
    },
    shareButton: {
        backgroundColor: COLORS.card,
        marginHorizontal: SPACING.md,
        paddingVertical: SPACING.md + 4,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: SPACING.xl,
    },
    shareButtonText: {
        color: COLORS.text.primary,
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
    },
});
