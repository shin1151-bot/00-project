/**
 * 🎁 혜택 화면 ([Benefits] 탭)
 * 
 * [주요 기능]
 * 1. 포인트 현황 및 포인트 받기 기능
 * 2. 오늘의 미션 (만보기, 물마시기 등)
 * 3. 내 쿠폰함 및 친구 초대 배너
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { formatCurrency } from '../utils/formatters';

export const BenefitsScreen = () => {
    const [points, setPoints] = useState(3450);

    const coupons = [
        { id: '1', brand: '스타벅스', title: '아메리카노 1+1 쿠폰', dday: 'D-3' },
        { id: '2', brand: 'GS25', title: '도시락 20% 할인', dday: 'D-7' },
        { id: '3', brand: 'CGV', title: '영화 3,000원 할인권', dday: 'D-15' },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>혜택</Text>
                </View>

                {/* 포인트 카드 */}
                <View style={styles.pointCard}>
                    <View>
                        <Text style={styles.pointLabel}>내 포인트</Text>
                        <Text style={styles.pointValue}>{formatCurrency(points)} P</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.pointButton}
                        onPress={() => setPoints(prev => prev + 10)}
                    >
                        <Text style={styles.pointButtonText}>포인트 받기</Text>
                    </TouchableOpacity>
                </View>

                {/* 미션 섹션 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>오늘의 미션 🎯</Text>
                    <View style={styles.gridContainer}>
                        <TouchableOpacity style={styles.missionCard}>
                            <Text style={styles.missionIcon}>👣</Text>
                            <Text style={styles.missionTitle}>만보기</Text>
                            <Text style={styles.missionReward}>+10 P</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.missionCard}>
                            <Text style={styles.missionIcon}>💧</Text>
                            <Text style={styles.missionTitle}>물 마시기</Text>
                            <Text style={styles.missionReward}>+5 P</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.missionCard}>
                            <Text style={styles.missionIcon}>🥗</Text>
                            <Text style={styles.missionTitle}>식단 기록</Text>
                            <Text style={styles.missionReward}>+20 P</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 쿠폰 섹션 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>내 쿠폰함 🎟️</Text>
                    {coupons.map((coupon) => (
                        <TouchableOpacity key={coupon.id} style={styles.couponCard}>
                            <View style={styles.couponLeft}>
                                <View style={styles.brandLogo}>
                                    <Text style={styles.brandText}>{coupon.brand[0]}</Text>
                                </View>
                                <View>
                                    <Text style={styles.couponBrand}>{coupon.brand}</Text>
                                    <Text style={styles.couponTitle}>{coupon.title}</Text>
                                </View>
                            </View>
                            <View style={styles.ddayBadge}>
                                <Text style={styles.ddayText}>{coupon.dday}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.adBanner}>
                    <Text style={styles.adText}>친구 초대하고 5,000 포인트 받기 🎁</Text>
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
    header: {
        paddingHorizontal: SPACING.md,
        paddingTop: SPACING.md,
        marginBottom: SPACING.lg,
    },
    title: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: '700',
        color: COLORS.text.primary,
    },
    pointCard: {
        backgroundColor: '#1A1A1A',
        marginHorizontal: SPACING.md,
        borderRadius: 20,
        padding: SPACING.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    pointLabel: {
        color: '#A0aec0',
        fontSize: FONT_SIZES.sm,
        marginBottom: 4,
    },
    pointValue: {
        color: '#FFFFFF',
        fontSize: FONT_SIZES.xl,
        fontWeight: '700',
    },
    pointButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    pointButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: FONT_SIZES.sm,
    },
    section: {
        paddingHorizontal: SPACING.md,
        marginBottom: SPACING.xl,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.text.primary,
        marginBottom: SPACING.md,
    },
    gridContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    missionCard: {
        backgroundColor: COLORS.card,
        width: '31%',
        padding: SPACING.md,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    missionIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    missionTitle: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.primary,
        fontWeight: '600',
        marginBottom: 4,
    },
    missionReward: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.primary,
        fontWeight: '700',
    },
    couponCard: {
        backgroundColor: COLORS.card,
        padding: SPACING.md,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    couponLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    brandLogo: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    brandText: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: '#666',
    },
    couponBrand: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.text.secondary,
        marginBottom: 2,
    },
    couponTitle: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.text.primary,
    },
    ddayBadge: {
        backgroundColor: '#FEE2E2',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    ddayText: {
        color: '#EF4444',
        fontSize: FONT_SIZES.xs,
        fontWeight: '700',
    },
    adBanner: {
        marginHorizontal: SPACING.md,
        backgroundColor: '#E8F3FF',
        padding: SPACING.md,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    adText: {
        color: COLORS.primary,
        fontWeight: '600',
    },
});
