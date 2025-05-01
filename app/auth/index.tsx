import { Collapsible } from '@components/Collapsible';
import React from 'react';
import { Text, View } from 'react-native';

const Index = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow' }}>
      <Text>Login Screen</Text>
      <Collapsible
        title="Collapsible"
        children={
          <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 8 }}>
            <Text style={{ color: 'white' }}>This is the content of the collapsible.</Text>
          </View>
        }
      />
    </View>
  )
}

export default Index;