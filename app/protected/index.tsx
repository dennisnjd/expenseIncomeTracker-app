import React from 'react';
import { Text, View } from 'react-native';

const Index = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'red' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome to the App!</Text>
      <Text>Index</Text>
    </View>
  )
}

export default Index;