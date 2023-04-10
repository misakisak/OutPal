import React from 'react';
import { Text, View, Button } from 'react-native';

export default function Live({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>livelive!</Text>
          {/* <Button
            title="Register"
            onPress={() => navigation.navigate("Register")}
          />
          <Button
            title="Login"
            onPress={() => navigation.navigate("Login")}
          /> */}
    </View>
  )
}