import { Stack } from 'expo-router';
import React from 'react';

export default function _layout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="add_expense" />
            <Stack.Screen name="add_income" />
        </Stack>
    )
};
