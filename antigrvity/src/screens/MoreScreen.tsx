/**
 * ☰ 더보기 화면 ([More] 탭)
 * 
 * [주요 기능]
 * 1. 전체 메뉴 목록 (송금, 계좌, 카드, 투자 등)
 * 2. 앱 설정 및 고객센터 연결
 * 3. 로그아웃 기능 (authStore 상태 초기화)
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { useAuthStore } from '../store/authStore';

export const MoreScreen = () => {
    const { user, logout } = useAuthStore();

    const menuItems = [
        { id: '1', title: '내 정보', icon: '👤' },
        { id: '2', title: '설정', icon: '⚙️' },
        { id: '3', title: '고객센터', icon: '💬' },
        { id: '4', title: '공지사항', icon: '📢' },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>더보기</Text>
                </View>

                <View style={styles.menuList}>
                    {menuItems.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.menuItem}>
                            <View style={styles.menuItemContent}>
                                <Text style={styles.menuIcon}>{item.icon}</Text>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                            </View>
                            <Text style={styles.chevron}>›</Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        style={[styles.menuItem, styles.logoutButton]}
                        onPress={() => Alert.alert('로그아웃', '로그아웃 하시겠습니까?', [
                            { text: '취소', style: 'cancel' },
                            { text: '확인', style: 'destructive', onPress: logout }
                        ])}
                    >
                        <View style={styles.menuItemContent}>
                            <Text style={styles.menuIcon}>👋</Text>
                            <Text style={[styles.menuTitle, styles.logoutText]}>로그아웃</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.version}>버전 1.0.0</Text>
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
        paddingBottom: SPACING.lg,
    },
    title: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: '700',
        color: COLORS.text.primary,
    },
    menuList: {
        paddingHorizontal: SPACING.md,
    },
    menuItem: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: SPACING.md,
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        fontSize: 24,
        marginRight: SPACING.sm,
    },
    menuTitle: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.text.primary,
    },
    chevron: {
        fontSize: 24,
        color: COLORS.text.secondary,
    },
    footer: {
        alignItems: 'center',
        marginTop: SPACING.xl,
        paddingBottom: SPACING.xl,
    },
    version: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
    },
    logoutButton: {
        marginTop: SPACING.lg,
        borderTopWidth: 8,
        borderTopColor: COLORS.background,
    },
    logoutText: {
        color: 'red',
    },
});
