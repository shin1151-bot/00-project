/**
 * 🏦 오픈뱅킹 화면 (OpenBanking Screen)
 * 
 * [기능]
 * 1. 흩어진 내 모든 자산을 한 눈에 확인
 * 2. 타행 계좌 연결 관리
 * 3. 총 자산 현황 요약
 */
import React, { useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

// 데모용 은행 목록 데이터
const OTHER_BANKS = [
    { id: 'kb', name: '국민은행', connected: false, color: '#FFBC00', icon: '🏦' },
    { id: 'shinhan', name: '신한은행', connected: false, color: '#0046FF', icon: '🏦' },
    { id: 'woori', name: '우리은행', connected: false, color: '#0078FF', icon: '🏦' },
    { id: 'hana', name: '하나은행', connected: false, color: '#009490', icon: '🏦' },
];

export const OpenBankingScreen = () => {
    // 실제 자산 데이터 로딩
    const { data: assets, refetch, isRefetching } = useQuery({
        queryKey: ['assets'],
        queryFn: api.getAssets,
        initialData: [],
    });

    // 1. 탭 진입(Focus) 시 자동으로 데이터 갱신
    useFocusEffect(
        useCallback(() => {
            console.log("🔄 오픈뱅킹 탭 진입: 자산 데이터 갱신");
            refetch();
        }, [])
    );

    // 2. 수동 새로고침 핸들러
    const handleRefresh = async () => {
        await refetch();
        Alert.alert("알림", "자산 정보가 최신으로 업데이트되었습니다. 🔄");
    };

    // 3. 은행 연결 핸들러
    const handleConnectBank = (bankName: string) => {
        Alert.alert("은행 연결", `${bankName} 연결을 진행하시겠습니까?`, [
            { text: "취소", style: "cancel" },
            { text: "연결하기", onPress: () => Alert.alert("성공", `${bankName} 자산을 가져왔습니다!`) }
        ]);
    };

    const totalAssetValue = assets.reduce((sum, asset) => sum + asset.value, 0);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>오픈뱅킹</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* 1. 총 자산 요약 카드 */}
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>내 총 자산</Text>
                    <View style={styles.amountContainer}>
                        <Text style={styles.amount}>
                            {totalAssetValue.toLocaleString()}
                        </Text>
                        <Text style={styles.currency}>원</Text>
                    </View>
                    <View style={styles.divider} />
                    <TouchableOpacity
                        style={styles.refreshButton}
                        onPress={() => {
                            console.log('🔄 자산 새로고침 버튼 눌림');
                            handleRefresh();
                        }}
                        disabled={isRefetching}
                        activeOpacity={0.6}
                    >
                        <Text style={styles.refreshText}>
                            {isRefetching ? "🔄 갱신 중..." : "🔄 자산 새로고침"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* 2. 내 계좌 목록 (연결된 자산) */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>연결된 자산</Text>
                    {assets.length > 0 ? (
                        assets.map((asset) => (
                            <View key={asset.id} style={styles.assetItem}>
                                <View style={styles.assetIcon}>
                                    <Text style={styles.assetIconText}>💰</Text>
                                </View>
                                <View style={styles.assetInfo}>
                                    <Text style={styles.assetName}>{asset.name}</Text>
                                    <Text style={styles.assetValue}>
                                        {asset.value.toLocaleString()}원
                                    </Text>
                                </View>
                                <View style={styles.percentBadge}>
                                    <Text style={[
                                        styles.percentText,
                                        { color: asset.changePercent >= 0 ? COLORS.success : COLORS.error }
                                    ]}>
                                        {asset.changePercent > 0 ? '+' : ''}{asset.changePercent}%
                                    </Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>연결된 자산이 없습니다.</Text>
                        </View>
                    )}
                </View>

                {/* 3. 다른 은행 연결하기 (프로모션 영역) */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>다른 금융사 연결하기</Text>
                    <Text style={styles.sectionDesc}>
                        흩어진 내 돈을 한 곳에서 관리하세요.
                    </Text>

                    <View style={styles.bankGrid}>
                        {OTHER_BANKS.map((bank) => (
                            <TouchableOpacity
                                key={bank.id}
                                style={styles.bankItem}
                                onPress={() => handleConnectBank(bank.name)}
                            >
                                <View style={[styles.bankIconBg, { backgroundColor: bank.color + '20' }]}>
                                    <Text>{bank.icon}</Text>
                                </View>
                                <Text style={styles.bankName}>{bank.name}</Text>
                                <Text style={styles.connectText}>연결</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={styles.bankItem}
                            onPress={() => Alert.alert("알림", "더 많은 금융기관을 준비 중입니다.")}
                        >
                            <View style={[styles.bankIconBg, { backgroundColor: COLORS.border }]}>
                                <Text>➕</Text>
                            </View>
                            <Text style={styles.bankName}>전체보기</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 4. 마이데이터 배너 */}
                <TouchableOpacity
                    style={styles.banner}
                    onPress={() => Alert.alert("마이데이터", "카드 실적 통합 조회 서비스는 준비 중입니다.")}
                >
                    <View>
                        <Text style={styles.bannerTitle}>내 모든 카드 실적은?</Text>
                        <Text style={styles.bannerDesc}>한 번에 모아서 확인해보세요 👉</Text>
                    </View>
                    <Text style={{ fontSize: 32 }}>💳</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        backgroundColor: COLORS.background,
    },
    headerTitle: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: '800',
        color: COLORS.text.primary,
    },
    scrollContent: {
        padding: SPACING.lg,
        paddingBottom: 80,
    },
    summaryCard: {
        backgroundColor: COLORS.card,
        borderRadius: BORDER_RADIUS.xl,
        padding: SPACING.xl,
        marginBottom: SPACING.xl,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    summaryLabel: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        marginBottom: SPACING.xs,
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: SPACING.lg,
    },
    amount: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.text.primary,
        marginRight: SPACING.xs,
    },
    currency: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '600',
        color: COLORS.text.secondary,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginBottom: SPACING.md,
    },
    refreshButton: {
        alignItems: 'center',
    },
    refreshText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.primary,
        fontWeight: '600',
    },
    section: {
        marginBottom: SPACING.xl,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.text.primary,
        marginBottom: SPACING.xs,
    },
    sectionDesc: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        marginBottom: SPACING.md,
    },
    assetItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.sm,
    },
    assetIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    assetIconText: {
        fontSize: 20,
    },
    assetInfo: {
        flex: 1,
    },
    assetName: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.text.primary,
        marginBottom: 2,
    },
    assetValue: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
    },
    percentBadge: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: BORDER_RADIUS.sm,
        backgroundColor: COLORS.background,
    },
    percentText: {
        fontSize: FONT_SIZES.xs,
        fontWeight: '700',
    },
    emptyState: {
        padding: SPACING.lg,
        alignItems: 'center',
        backgroundColor: COLORS.card,
        borderRadius: BORDER_RADIUS.lg,
    },
    emptyText: {
        color: COLORS.text.secondary,
    },
    bankGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    bankItem: {
        width: '18%',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    bankIconBg: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    bankName: {
        fontSize: 11,
        color: COLORS.text.primary,
        fontWeight: '600',
        marginBottom: 2,
        textAlign: 'center',
    },
    connectText: {
        fontSize: 10,
        color: COLORS.primary,
        fontWeight: '500',
    },
    banner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: SPACING.lg,
        borderRadius: BORDER_RADIUS.xl,
        marginBottom: SPACING.xl,
    },
    bannerTitle: {
        color: '#FFF',
        fontSize: FONT_SIZES.md,
        fontWeight: '700',
        marginBottom: 4,
    },
    bannerDesc: {
        color: '#CCC',
        fontSize: FONT_SIZES.sm,
    },
});
