/**
 * 🔐 로그인 화면 (Login Screen)
 * 
 * [주요 기능]
 * 1. 6자리 PIN 번호 인증 (테스트 번호: 326623)
 * 2. 커스텀 숫자 키패드 UI 구현
 * 3. 인증 성공 시 전역 로그인 상태(authStore) 업데이트 및 홈으로 이동
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { useAuthStore } from '../store/authStore';
import { api } from '../services/api';

export const LoginScreen = () => {
    const [pin, setPin] = useState<string>('');
    const { login } = useAuthStore();

    useEffect(() => {
        const verifyPin = async () => {
            if (pin.length === 6) {
                try {
                    const result = await api.login(pin);
                    if (result.success) {
                        login(result.user);
                    }
                } catch (error: any) {
                    Alert.alert('오류', error.message || '로그인에 실패했습니다.');
                    setPin('');
                }
            }
        };
        verifyPin();
    }, [pin]);

    const handlePress = (num: string) => {
        if (pin.length < 6) {
            setPin(prev => prev + num);
        }
    };

    const handleDelete = () => {
        setPin(prev => prev.slice(0, -1));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* 브랜드 로고 영역 제거됨 */}

                {/* 요청하신 문구 */}
                <Text style={styles.instruction}>패턴을 이용해 로그인 해주세요</Text>

                {/* PIN Indicator */}
                <View style={styles.pinContainer}>
                    {[...Array(6)].map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.pinDot,
                                i < pin.length && styles.pinDotFilled,
                            ]}
                        />
                    ))}
                </View>

                {/* Number Pad */}
                <View style={styles.keypad}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <TouchableOpacity
                            key={num}
                            style={styles.key}
                            onPress={() => handlePress(num.toString())}
                        >
                            <Text style={styles.keyText}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.key} onPress={() => { }}>
                        <Text style={styles.keyText}></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.key} onPress={() => handlePress('0')}>
                        <Text style={styles.keyText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.key} onPress={handleDelete}>
                        <Text style={styles.keyText}>←</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: SPACING.xl * 2,
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.background, // or 'rgba(0,0,0,0.05)'
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    logoIcon: {
        fontSize: 40,
    },
    logoText: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: '800',
        color: COLORS.primary,
        letterSpacing: 0.5,
    },
    instruction: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '600',
        color: COLORS.text.primary,
        marginBottom: SPACING.xl * 2,
        textAlign: 'center',
    },
    pinContainer: {
        flexDirection: 'row',
        marginBottom: SPACING.xl * 3,
    },
    pinDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: COLORS.border,
        marginHorizontal: SPACING.xs,
    },
    pinDotFilled: {
        backgroundColor: COLORS.primary,
    },
    keypad: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: 400,
    },
    key: {
        width: '30%',
        aspectRatio: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    keyText: {
        fontSize: FONT_SIZES.xl,
        fontWeight: '600',
        color: COLORS.text.primary,
    },
});
