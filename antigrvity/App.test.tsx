import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🏦 모바일 뱅킹 앱</Text>
            <Text style={styles.subtitle}>웹 버전 테스트</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#0054FF',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        color: '#6B7280',
    },
});
