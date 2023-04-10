import React, {Component, useState} from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider }  from 'react-redux';
import store from "./redux/store";


import LoginScreen from './components/auth/Login'
import SignupScreen from './components/auth/Signup'
import HomeScreen from './components/main/Home'
import Main from './components/Main'
import liveScreen from './components/main/Live';
import SettingScreen from './components/main/Setting';
import auth from './firebase'
import AIScreen from './components/main/AI';
import ProfileScreen from './components/main/Profile';
// import onAuthStateChanged from "firebase/auth"


const Stack = createStackNavigator();

export class App extends Component {

  render() {    
    // const { loggedIn, loaded } = this.state;
    // if(!loaded){
    //   return(
    //     <View style={{ flex: 1, justifyContent: 'center'}}>
    //       <Text>Every single have rights and power to change the world. It is up to you!!</Text>
    //     </View>
    //   )
    // }

    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              navigation={this.props.navigation}
              options={{
                headerShown: false,
                headerStyle: {backgroundColor: "#95E1D3"},
                headerTintColor: "white",
                headerTitleStyle: {fontWeight: 'bold'},
              }}
            />
            {/* <Stack.Screen 
              name="Home"  
              component={HomeScreen} 
              navigation={this.props.navigation} 
              options={{
                headerStyle: {backgroundColor: "#95E1D3"},
                headerTintColor: "white",
                headerTitleStyle: {fontWeight: 'bold'},
              }}
            /> */}
            <Stack.Screen 
              name="Signup" 
              component={SignupScreen} 
              navigation={this.props.navigation}
              options={{
                headerShown: false,
                headerStyle: {backgroundColor: "#95E1D3"},
                headerTintColor: "white",
                headerTitleStyle: {fontWeight: 'bold'},
              }}
            />
            <Stack.Screen 
              name="Live" 
              component={liveScreen}
              navigation={this.props.navigation}
              options={{
                headerStyle: {backgroundColor: "#95E1D3"},
                headerTintColor: "white",
                headerTitleStyle: {fontWeight: 'bold'}
              }}
            />
            <Stack.Screen 
              name="Setting" 
              component={SettingScreen}
              navigation={this.props.navigation}
              options={{
                headerStyle: {backgroundColor: "#95E1D3"},
                headerTintColor: "white",
                headerTitleStyle: {fontWeight: 'bold'}
              }}
            />
            <Stack.Screen 
              name="AI" 
              component={AIScreen}
              navigation={this.props.navigation}
              options={{
                headerStyle: {backgroundColor: "#95E1D3"},
                headerTintColor: "white",
                headerTitleStyle: {fontWeight: 'bold'}
              }}
            />
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen}
              navigation={this.props.navigation}
              options={{
                headerStyle: {backgroundColor: "#95E1D3"},
                headerTintColor: "white",
                headerTitleStyle: {fontWeight: 'bold'}
              }}
            />
            <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>     
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App;