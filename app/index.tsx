import { Redirect } from 'expo-router';
import React from 'react';

const Index = () => {

    const authenticated = false; // Replace with your authentication logic
    if (authenticated) {
        return <Redirect href='/protected' />;
    } else {
        return <Redirect href="/auth" />;
    }
}

export default Index;