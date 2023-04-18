//this screen is for user to start new live peer tutoring

import React from 'react';
import { Text, SafeAreaView } from 'react-native';

export default function CopyScreen({route,navigation}) { 

    return (
        <SafeAreaView style={{flex:1, margin: 10, backgroundColor: "white"}}>
          <Text style={{fontSize: 18, color: 'black', alignItems: 'center', margin:3}}>Select and Copy Link:</Text>
          <Text style={{fontSize: 20, color: 'black', alignItems: 'center', margin:3}} selectable={true}>{route.params.link}</Text>

          <Text style={{fontSize: 20, color: 'darkgray', alignItems: 'center', margin:3}} >If don't see the link, it doesn't have link </Text>
        </SafeAreaView>
    );
}