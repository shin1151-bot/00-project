/**
 * 📦 상품 화면 ([Products] 탭)
 * 
 * [주요 기능]
 * 1. 금융 상품 배너 (슬라이드형)
 * 2. 인기 상품 TOP 3 (대출, 적금 등)
 * 3. 추천 카드 가로 스크롤 리스트
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';

export const ProductsScreen = () => {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>금융 상품</Text>
                </View>

                {/* 배너 영역 */}
                <View style={styles.bannerContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled>
                        <View style={[styles.banner, { backgroundColor: '#E8F3FF' }]}>
                            <View style={styles.bannerContent}>
                                <Text style={styles.bannerTag}>이벤트</Text>
                                <Text style={styles.bannerTitle}>첫 계좌 개설 시{'\n'}최대 1만원 지급</Text>
                                <Text style={styles.bannerSubtitle}>지금 바로 혜택받기 {'>'}</Text>
                            </View>
                            <Text style={styles.bannerEmoji}>💰</Text>
                        </View>
                        <View style={[styles.banner, { backgroundColor: '#FFF4E6' }]}>
                            <View style={styles.bannerContent}>
                                <Text style={[styles.bannerTag, { color: '#FF8A3D', backgroundColor: '#FFE8CC' }]}>신규 출시</Text>
                                <Text style={styles.bannerTitle}>26주 적금으로{'\n'}매주 저축 습관</Text>
                                <Text style={[styles.bannerSubtitle, { color: '#FF8A3D' }]}>자세히 보기 {'>'}</Text>
                            </View>
                            <Text style={styles.bannerEmoji}>📅</Text>
                        </View>
                    </ScrollView>
                </View>

                {/* 인기 상품 섹션 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>인기 상품 TOP 3 🔥</Text>
                    <TouchableOpacity style={styles.productCard}>
                        <View style={styles.productIcon}><Text style={{ fontSize: 24 }}>💳</Text></View>
                        <View style={styles.productInfo}>
                            <View style={styles.productHeader}>
                                <Text style={styles.productName}>신용대출</Text>
                                <View style={styles.tag}><Text style={styles.tagText}>Best</Text></View>
                            </View>
                            <Text style={styles.productDesc}>필요한 만큼 빌리고 쓴 만큼만 이자를</Text>
                        </View>
                        <View style={styles.rateContainer}>
                            <Text style={styles.rate}>4.8%~</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.productCard}>
                        <View style={styles.productIcon}><Text style={{ fontSize: 24 }}>🏠</Text></View>
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>전월세보증금 대출</Text>
                            <Text style={styles.productDesc}>최대 2.22억원까지 가능해요</Text>
                        </View>
                        <View style={styles.rateContainer}>
                            <Text style={styles.rate}>3.5%~</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.productCard}>
                        <View style={styles.productIcon}><Text style={{ fontSize: 24 }}>📈</Text></View>
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>자유적금</Text>
                            <Text style={styles.productDesc}>매일 조금씩 모아보세요</Text>
                        </View>
                        <View style={styles.rateContainer}>
                            <Text style={styles.rate}>5.0%</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* 카드 추천 섹션 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>추천 카드 💳</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsScroll}>
                        <TouchableOpacity style={styles.cardItem}>
                            <View style={[styles.cardImage, { backgroundColor: '#333' }]} />
                            <Text style={styles.cardName}>블랙 카드</Text>
                            <Text style={styles.cardBenefit}>전월실적 조건 없음</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardItem}>
                            <View style={[styles.cardImage, { backgroundColor: '#FFB800' }]} />
                            <Text style={styles.cardName}>골드 카드</Text>
                            <Text style={styles.cardBenefit}>쇼핑 3% 적립</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardItem}>
                            <View style={[styles.cardImage, { backgroundColor: COLORS.primary }]} />
                            <Text style={styles.cardName}>블루 카드</Text>
                            <Text style={styles.cardBenefit}>대중교통 10% 할인</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View style={{ height: 40 }} />
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
        marginBottom: SPACING.md,
    },
    title: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: '700',
        color: COLORS.text.primary,
    },
    bannerContainer: {
        height: 180,
        marginBottom: SPACING.xl,
    },
    banner: {
        width: 320,
        marginHorizontal: SPACING.md,
        borderRadius: 20,
        padding: SPACING.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bannerContent: {
        flex: 1,
    },
    bannerTag: {
        color: COLORS.primary,
        backgroundColor: 'rgba(0, 84, 255, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
        fontSize: FONT_SIZES.xs,
        fontWeight: '600',
        marginBottom: SPACING.sm,
        overflow: 'hidden',
    },
    bannerTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: '700',
        color: COLORS.text.primary,
        marginBottom: SPACING.sm,
        lineHeight: 28,
    },
    bannerSubtitle: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        color: COLORS.primary,
    },
    bannerEmoji: {
        fontSize: 60,
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
    productCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    productIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.card,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    productInfo: {
        flex: 1,
    },
    productHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    productName: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.text.primary,
        marginRight: 6,
    },
    tag: {
        backgroundColor: '#FEE2E2',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    tagText: {
        color: '#EF4444',
        fontSize: 10,
        fontWeight: '700',
    },
    productDesc: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
    },
    rateContainer: {
        alignItems: 'flex-end',
    },
    rate: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.primary,
    },
    cardsScroll: {
        marginHorizontal: -SPACING.md,
        paddingHorizontal: SPACING.md,
    },
    cardItem: {
        width: 120,
        marginRight: SPACING.md,
    },
    cardImage: {
        width: 120,
        height: 180,
        borderRadius: 12,
        marginBottom: SPACING.sm,
    },
    cardName: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.text.primary,
        marginBottom: 2,
    },
    cardBenefit: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.text.secondary,
    },
});
