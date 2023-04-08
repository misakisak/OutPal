import React, {Component, useState} from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider }  from 'react-redux';
import store from "./redux/store";


import LoginScreen from './components/auth/Login'
import HomeScreen from './components/Home'

const Stack = createStackNavigator();

export class App extends Component {
  render() {    
    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              navigation={this.props.navigation}
              options={{
                headerStyle: {backgroundColor: "#95E1D3"},
                headerTintColor: "white",
                headerTitleStyle: {fontWeight: 'bold'},
              }}
            /> 
            <Stack.Screen 
              name="Home"  
              component={HomeScreen} 
              navigation={this.props.navigation} 
              options={{
                headerStyle: {backgroundColor: "#95E1D3"},
                headerTintColor: "white",
                headerTitleStyle: {fontWeight: 'bold'},
              }}
            />            
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App;