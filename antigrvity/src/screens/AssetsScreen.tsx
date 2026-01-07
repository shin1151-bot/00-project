/**
 * 💎 자산 화면 ([Assets] 탭)
 * 
 * [주요 기능]
 * 1. 전체 자산 금액 및 수익률 요약
 * 2. 자산 포트폴리오 차트 (투자/예적금/현금 비중)
 * 3. 보유 자산 상세 리스트 (주식, 코인, 예금 등)
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { api } from '../services/api';
import { formatCurrency, formatPercent } from '../utils/formatters';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SimpleChart = () => (
    <View style={styles.chartContainer}>
        <View style={styles.chartBarWrapper}>
            <View style={[styles.chartBar, { flex: 45, backgroundColor: COLORS.primary }]} />
            <View style={[styles.chartBar, { flex: 35, backgroundColor: '#FF8A3D' }]} />
            <View style={[styles.chartBar, { flex: 20, backgroundColor: '#A0AEC0' }]} />
        </View>
        <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.primary }]} />
                <Text style={styles.legendText}>투자 45%</Text>
            </View>
            <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#FF8A3D' }]} />
                <Text style={styles.legendText}>예적금 35%</Text>
            </View>
            <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#A0AEC0' }]} />
                <Text style={styles.legendText}>현금 20%</Text>
            </View>
        </View>
    </View>
);

export const AssetsScreen = () => {
    const [selectedTab, setSelectedTab] = useState('전체');
    const { data: assets, isLoading } = useQuery({
        queryKey: ['assets'],
        queryFn: api.getAssets,
    });

    if (isLoading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </SafeAreaView>
        );
    }

    const totalValue = assets?.reduce((sum, asset) => sum + asset.value, 0) || 0;
    const totalChange = assets?.reduce((sum, asset) => sum + asset.change, 0) || 0;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>내 자산</Text>
                    <View style={styles.totalValueContainer}>
                        <Text style={styles.totalValue}>{formatCurrency(totalValue)}</Text>
                        <Text style={[styles.totalChange, totalChange >= 0 ? styles.textSuccess : styles.textError]}>
                            {totalChange >= 0 ? '+' : ''}{formatCurrency(totalChange)} ({formatPercent(totalChange / totalValue)})
                        </Text>
                    </View>
                    <SimpleChart />
                </View>

                {/* 카테고리 탭 */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
                    {['전체', '입출금', '예적금', '투자', '대출'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, selectedTab === tab && styles.selectedTab]}
                            onPress={() => setSelectedTab(tab)}
                        >
                            <Text style={[styles.tabText, selectedTab === tab && styles.selectedTabText]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.assetsList}>
                    {assets?.map((asset) => (
                        <TouchableOpacity key={asset.id} style={styles.assetCard}>
                            <View style={styles.assetIcon}>
                                <Text style={{ fontSize: 24 }}>
                                    {(asset as any).type === 'stock' ? '📈' : (asset as any).type === 'crypto' ? '🪙' : '💰'}
                                </Text>
                            </View>
                            <View style={styles.assetInfo}>
                                <Text style={styles.assetName}>{asset.name}</Text>
                                <Text style={styles.assetCode}>{(asset as any).symbol}</Text>
                            </View>
                            <View style={styles.assetValues}>
                                <Text style={styles.assetValue}>{formatCurrency(asset.value)}</Text>
                                <Text style={[styles.assetChange, asset.change >= 0 ? styles.textSuccess : styles.textError]}>
                                    {formatPercent(asset.changePercent)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}

                    {/* 더미 데이터 추가 */}
                    <TouchableOpacity style={styles.assetCard}>
                        <View style={styles.assetIcon}>
                            <Text style={{ fontSize: 24 }}>🏦</Text>
                        </View>
                        <View style={styles.assetInfo}>
                            <Text style={styles.assetName}>카카오뱅크 예금</Text>
                            <Text style={styles.assetCode}>만기 2026.12.31</Text>
                        </View>
                        <View style={styles.assetValues}>
                            <Text style={styles.assetValue}>{formatCurrency(15000000)}</Text>
                            <Text style={styles.textGray}>2.4%</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

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
        paddingBottom: SPACING.lg,
    },
    title: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: '700',
        color: COLORS.text.primary,
        marginBottom: SPACING.md,
    },
    totalValueContainer: {
        marginBottom: SPACING.lg,
    },
    totalValue: {
        fontSize: 32,
        fontWeight: '700',
        color: COLORS.text.primary,
        marginBottom: 4,
    },
    totalChange: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
    },
    textSuccess: { color: COLORS.success },
    textError: { color: COLORS.error || '#ef4444' },
    textGray: { color: COLORS.text.secondary },

    chartContainer: {
        marginTop: SPACING.md,
    },
    chartBarWrapper: {
        flexDirection: 'row',
        height: 24,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: SPACING.sm,
    },
    chartBar: {
        height: '100%',
    },
    chartLegend: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: SPACING.md,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    legendText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
        fontWeight: '500',
    },

    tabsScroll: {
        paddingHorizontal: SPACING.md,
        marginBottom: SPACING.lg,
        height: 40, // explicit height for scrollview
        flexGrow: 0,
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: COLORS.card,
        marginRight: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    selectedTab: {
        backgroundColor: COLORS.text.primary,
        borderColor: COLORS.text.primary,
    },
    tabText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        color: COLORS.text.secondary,
    },
    selectedTabText: {
        color: '#FFFFFF',
    },

    assetsList: {
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.xl,
    },
    assetCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    assetIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.card,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
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
    assetCode: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
    },
    assetValues: {
        alignItems: 'flex-end',
    },
    assetValue: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.text.primary,
        marginBottom: 2,
    },
    assetChange: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '500',
    },
});
