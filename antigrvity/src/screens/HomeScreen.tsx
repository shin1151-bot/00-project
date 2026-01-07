/**
 * 🏠 홈 화면 ([Home] 탭)
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { api } from '../services/api';
import { AccountCard } from '../components/AccountCard';
import { TransactionList } from '../components/TransactionList';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';

export const HomeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

    const { data: account, isLoading: accountLoading } = useQuery({
        queryKey: ['account'],
        queryFn: api.getAccount,
    });

    const { data: transactions, isLoading: transactionsLoading } = useQuery({
        queryKey: ['transactions'],
        queryFn: api.getTransactions,
    });

    const handleTransferPress = () => {
        navigation.navigate('Transfer');
    };

    const handleTransactionPress = (transaction: any) => {
        navigation.navigate('TransactionDetail', { transaction });
    };

    // 오픈뱅킹 탭 클릭 시 BottomTabNavigator의 OpenBanking 화면으로 이동
    const handleOpenBankingPress = () => {
        const parent = (navigation as any).getParent?.();
        if (parent) {
            // @ts-ignore
            parent.navigate('OpenBanking');
        } else {
            // @ts-ignore
            navigation.navigate('OpenBanking');
        }
    };

    if (accountLoading || transactionsLoading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* 1. 상단 탭 */}
                <View style={styles.header}>
                    <View style={styles.topTabContainer}>
                        {/* 기업은행 탭 (Active) */}
                        <View style={styles.activeTab}>
                            <Text style={styles.activeTabText}>기업은행</Text>
                        </View>
                        {/* 오픈뱅킹 탭 (Inactive) */}
                        <TouchableOpacity style={styles.inactiveTab} onPress={handleOpenBankingPress}>
                            <Text style={styles.inactiveTabText}>오픈뱅킹</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.mailIcon}>📩</Text>
                    </TouchableOpacity>
                </View>

                {/* 2. 메인 계좌 카드 */}
                {account && (
                    <AccountCard
                        accountNumber={account.accountNumber}
                        balance={account.balance}
                        currency={account.currency}
                        onTransferPress={handleTransferPress}
                    />
                )}

                {/* 3. 인디케이터 */}
                <View style={styles.indicatorContainer}>
                    <View style={[styles.dot, styles.activeDot]} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                </View>

                {/* 4. 최근 이체내역 헤더 */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>최근 이체내역</Text>
                    <Text style={styles.dropdownIcon}>v</Text>
                </View>

                {/* 5. 나만의 맞춤메뉴 */}
                <View style={styles.gridSection}>
                    <Text style={styles.sectionTitle}>나만의 맞춤메뉴</Text>
                    <View style={styles.gridContainer}>
                        <MenuIcon label="전체계좌" icon="🔍" />
                        <MenuIcon label="이벤트" icon="🎁" />
                        <MenuIcon label="환율조회" icon="💰" />
                        <MenuIcon label="추가" icon="➕" />
                    </View>
                </View>

                {/* 거래 리스트 */}
                {transactions && (
                    <View style={{ marginTop: SPACING.lg }}>
                        <TransactionList transactions={transactions} onTransactionPress={handleTransactionPress} />
                    </View>
                )}

                <View style={styles.bottomSpacer} />
            </ScrollView>
        </SafeAreaView>
    );
};

const MenuIcon = ({ label, icon }: { label: string; icon: string }) => (
    <TouchableOpacity style={styles.menuItem}>
        <View style={styles.iconCircle}>
            <Text style={{ fontSize: 24 }}>{icon}</Text>
        </View>
        <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    header: {
        paddingHorizontal: SPACING.md,
        paddingTop: SPACING.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topTabContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 20,
        padding: 4,
        gap: 4,
    },
    activeTab: {
        backgroundColor: COLORS.card,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    activeTabText: {
        fontSize: FONT_SIZES.md,
        fontWeight: '700',
        color: COLORS.text.primary,
    },
    inactiveTab: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    inactiveTabText: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.text.secondary,
    },
    mailIcon: {
        fontSize: 24,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: SPACING.lg,
        gap: 6,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.text.secondary,
        opacity: 0.3,
    },
    activeDot: {
        width: 16,
        backgroundColor: COLORS.text.primary,
        opacity: 1,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        padding: SPACING.md,
        marginHorizontal: SPACING.md,
        borderRadius: 16,
        marginBottom: SPACING.lg,
    },
    gridSection: {
        paddingHorizontal: SPACING.md,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.text.primary,
        marginBottom: SPACING.md,
        flex: 1,
    },
    dropdownIcon: {
        color: COLORS.text.secondary,
        fontSize: FONT_SIZES.sm,
    },
    gridContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    menuItem: {
        alignItems: 'center',
        gap: 8,
    },
    iconCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.card,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuLabel: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        fontWeight: '500',
    },
    bottomSpacer: {
        height: SPACING.xl * 2,
    },
});
