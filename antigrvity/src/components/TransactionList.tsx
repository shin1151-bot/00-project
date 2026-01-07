import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { Transaction } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';

interface TransactionListProps {
    transactions: Transaction[];
    onTransactionPress?: (transaction: Transaction) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, onTransactionPress }) => {
    const renderTransaction = ({ item }: { item: Transaction }) => (
        <TouchableOpacity
            style={styles.transactionItem}
            onPress={() => onTransactionPress?.(item)}
        >
            <View style={styles.transactionInfo}>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.date}>{formatDate(item.date)}</Text>
            </View>
            <Text style={[
                styles.amount,
                item.type === 'credit' ? styles.credit : styles.debit
            ]}>
                {item.type === 'credit' ? '+' : ''}{formatCurrency(item.amount, item.currency)}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>최근 거래</Text>
            <FlatList
                data={transactions}
                renderItem={renderTransaction}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: SPACING.lg,
        paddingHorizontal: SPACING.md,
    },
    title: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.text.primary,
        marginBottom: SPACING.md,
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        padding: SPACING.md,
        borderRadius: 12,
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    transactionInfo: {
        flex: 1,
    },
    description: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.text.primary,
        marginBottom: 4,
    },
    date: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
    },
    amount: {
        fontSize: FONT_SIZES.md,
        fontWeight: '700',
    },
    credit: {
        color: COLORS.success,
    },
    debit: {
        color: COLORS.text.primary,
    },
});
