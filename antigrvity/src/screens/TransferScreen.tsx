import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { formatCurrency } from '../utils/formatters';

interface Contact {
    id: string;
    name: string;
    accountNumber: string;
}

const CONTACTS: Contact[] = [
    { id: '1', name: '김철수', accountNumber: '1234-5678-9012' },
    { id: '2', name: '이영희', accountNumber: '9876-5432-1098' },
    { id: '3', name: '박민수', accountNumber: '5555-6666-7777' },
];

export const TransferScreen = ({ navigation }: any) => {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [amount, setAmount] = useState('');
    const [memo, setMemo] = useState('');

    const handleQuickAmount = (value: number) => {
        setAmount(value.toString());
    };

    const handleTransfer = () => {
        if (!selectedContact) {
            Alert.alert('알림', '받는 사람을 선택해주세요.');
            return;
        }
        if (!amount || parseInt(amount) <= 0) {
            Alert.alert('알림', '송금 금액을 입력해주세요.');
            return;
        }

        Alert.alert(
            '송금 확인',
            `${selectedContact.name}님께 ${formatCurrency(parseInt(amount))}를 송금하시겠습니까?`,
            [
                { text: '취소', style: 'cancel' },
                {
                    text: '확인',
                    onPress: () => {
                        Alert.alert('완료', '송금이 완료되었습니다!');
                        navigation.goBack();
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backButton}>← 뒤로</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>송금</Text>
                </View>

                {/* 받는 사람 선택 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>받는 사람</Text>
                    {CONTACTS.map((contact) => (
                        <TouchableOpacity
                            key={contact.id}
                            style={[
                                styles.contactCard,
                                selectedContact?.id === contact.id && styles.contactCardSelected,
                            ]}
                            onPress={() => setSelectedContact(contact)}
                        >
                            <View style={styles.contactAvatar}>
                                <Text style={styles.contactAvatarText}>{contact.name[0]}</Text>
                            </View>
                            <View style={styles.contactInfo}>
                                <Text style={styles.contactName}>{contact.name}</Text>
                                <Text style={styles.contactAccount}>{contact.accountNumber}</Text>
                            </View>
                            {selectedContact?.id === contact.id && (
                                <Text style={styles.checkmark}>✓</Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* 금액 입력 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>송금 금액</Text>
                    <View style={styles.amountInputContainer}>
                        <Text style={styles.currencySymbol}>₩</Text>
                        <TextInput
                            style={styles.amountInput}
                            value={amount}
                            onChangeText={setAmount}
                            placeholder="0"
                            keyboardType="numeric"
                            placeholderTextColor={COLORS.text.secondary}
                        />
                    </View>

                    {/* 빠른 금액 선택 */}
                    <View style={styles.quickAmountContainer}>
                        {[10000, 50000, 100000, 500000].map((value) => (
                            <TouchableOpacity
                                key={value}
                                style={styles.quickAmountButton}
                                onPress={() => handleQuickAmount(value)}
                            >
                                <Text style={styles.quickAmountText}>
                                    {value >= 10000 ? `${value / 10000}만원` : `${value}원`}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* 메모 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>메모 (선택)</Text>
                    <TextInput
                        style={styles.memoInput}
                        value={memo}
                        onChangeText={setMemo}
                        placeholder="메모를 입력하세요"
                        placeholderTextColor={COLORS.text.secondary}
                        multiline
                    />
                </View>

                {/* 송금 버튼 */}
                <TouchableOpacity style={styles.transferButton} onPress={handleTransfer}>
                    <Text style={styles.transferButtonText}>송금하기</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.lg,
    },
    backButton: {
        fontSize: FONT_SIZES.lg,
        color: COLORS.primary,
        fontWeight: '600',
        marginRight: SPACING.md,
    },
    title: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: '700',
        color: COLORS.text.primary,
    },
    section: {
        paddingHorizontal: SPACING.md,
        marginBottom: SPACING.lg,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.text.primary,
        marginBottom: SPACING.sm,
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        padding: SPACING.md,
        borderRadius: 12,
        marginBottom: SPACING.sm,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    contactCardSelected: {
        borderColor: COLORS.primary,
        backgroundColor: 'rgba(0, 84, 255, 0.05)',
    },
    contactAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.sm,
    },
    contactAvatarText: {
        color: '#FFFFFF',
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.text.primary,
        marginBottom: 4,
    },
    contactAccount: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.text.secondary,
    },
    checkmark: {
        fontSize: FONT_SIZES.xl,
        color: COLORS.primary,
        fontWeight: '700',
    },
    amountInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    currencySymbol: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: '700',
        color: COLORS.text.primary,
        marginRight: SPACING.sm,
    },
    amountInput: {
        flex: 1,
        fontSize: FONT_SIZES.xxl,
        fontWeight: '700',
        color: COLORS.text.primary,
    },
    quickAmountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SPACING.sm,
    },
    quickAmountButton: {
        flex: 1,
        backgroundColor: COLORS.card,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.xs,
        borderRadius: 8,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    quickAmountText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        color: COLORS.text.primary,
        textAlign: 'center',
    },
    memoInput: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        fontSize: FONT_SIZES.md,
        color: COLORS.text.primary,
        minHeight: 80,
        textAlignVertical: 'top',
    },
    transferButton: {
        backgroundColor: COLORS.primary,
        marginHorizontal: SPACING.md,
        paddingVertical: SPACING.md + 4,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: SPACING.xl,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    transferButtonText: {
        color: '#FFFFFF',
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
    },
});
