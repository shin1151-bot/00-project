/**
 * 🧭 하단 탭 네비게이션 (Bottom Tab Navigator)
 * 
 * [메뉴 구성]
 * 1. 🏠 홈 (Home): 계좌 잔액, 빠른 송금, 최근 거래 내역
 * 2. 💎 자산 (Assets): 자산 포트폴리오 차트, 투자 현황
 * 3. 📦 상품 (Products): 금융 상품 배너, 인기 상품 추천
 * 4. 🎁 혜택 (Benefits): 포인트, 미션, 쿠폰함
 * 5. ☰ 더보기 (More): 설정, 프로필, 로그아웃
 */
import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, FONT_SIZES } from '../constants/theme';
import { HomeStackNavigator } from './HomeStackNavigator';
import { OpenBankingScreen } from '../screens/OpenBankingScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { BenefitsScreen } from '../screens/BenefitsScreen';
import { MoreScreen } from '../screens/MoreScreen';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.text.secondary,
                tabBarStyle: {
                    backgroundColor: COLORS.card,
                    borderTopWidth: 1,
                    borderTopColor: COLORS.border,
                    paddingTop: 8,
                    paddingBottom: 8,
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: FONT_SIZES.xs,
                    fontWeight: '600',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackNavigator}
                options={{
                    tabBarLabel: '홈',
                    tabBarIcon: ({ color }) => <TabIcon icon="🏠" color={color} />,
                }}
            />
            <Tab.Screen
                name="OpenBanking"
                component={OpenBankingScreen}
                options={{
                    tabBarLabel: '오픈뱅킹',
                    tabBarIcon: ({ color }) => <TabIcon icon="🏦" color={color} />,
                }}
                listeners={{
                    tabPress: () => {
                        console.log('✅ 오픈뱅킹 탭 클릭됨!');
                    },
                }}
            />
            <Tab.Screen
                name="Products"
                component={ProductsScreen}
                options={{
                    tabBarLabel: '상품',
                    tabBarIcon: ({ color }) => <TabIcon icon="📦" color={color} />,
                }}
            />
            <Tab.Screen
                name="Benefits"
                component={BenefitsScreen}
                options={{
                    tabBarLabel: '혜택',
                    tabBarIcon: ({ color }) => <TabIcon icon="🎁" color={color} />,
                }}
            />
            <Tab.Screen
                name="More"
                component={MoreScreen}
                options={{
                    tabBarLabel: '더보기',
                    tabBarIcon: ({ color }) => <TabIcon icon="☰" color={color} />,
                }}
            />
        </Tab.Navigator>
    );
};

const TabIcon = ({ icon, color }: { icon: string; color: string }) => {
    return <Text style={{ fontSize: 24, color }}>{icon}</Text>;
};
