import React from 'react';
import { Text, View, Button } from 'react-native';

export default function Questionscreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>question!</Text>
          <Button
            title="AI"
            onPress={() => navigation.navigate("AI")}
          />
          {/* <Button
            title="Login"
            onPress={() => navigation.navigate("Login")}
          /> */}
    </View>
  )
}