import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { TransferScreen } from '../screens/TransferScreen';
import { TransactionDetailScreen } from '../screens/TransactionDetailScreen';
import { Transaction } from '../types';

export type HomeStackParamList = {
    HomeMain: undefined;
    Transfer: undefined;
    TransactionDetail: { transaction: Transaction };
};

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="HomeMain" component={HomeScreen} />
            <Stack.Screen name="Transfer" component={TransferScreen} />
            <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
        </Stack.Navigator>
    );
};
