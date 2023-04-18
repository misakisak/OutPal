import React, {Component, useState} from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider }  from 'react-redux';
import store from "./redux/store";
import LoginScreen from './components/auth/Login'
import SignupScreen from './components/auth/Signup'
import Main from './components/Main'
import liveScreen from './components/main/Live';
import EditScreen from './components/main/Edit';
import SettingScreen from './components/main/Setting'
import AIScreen from './components/main/AI';
import ProfileScreen from './components/main/Profile';
import NewQuestionScreen from './components/main/NewQuestion';
import QCommentScreen from './components/main/QComment';
import SearchScreen from './components/main/Search';
import OtherProfileScreen from './components/main/OtherProfile';
import CopyScreen from './components/main/Copy';

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
              name="Edit" 
              component={EditScreen}
              navigation={this.props.navigation}
              options={{
                headerStyle: {backgroundColor: "white"},
                headerTintColor: "black",
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
            {/* <Stack.Screen 
              name="Profile" 
              component={ProfileScreen}
              navigation={this.props.navigation}
              options={{
                headerStyle: {backgroundColor: "white", borderWidth: 1, borderColor: "gray"},
                headerTintColor: "black",
                headerTitleStyle: {fontWeight: 'bold'}
              }}
            /> */}
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen}
              navigation={this.props.navigation}
              options={{
                headerShown: false,
                headerStyle: {backgroundColor: "white", borderWidth: 1, borderColor: "gray",},
                headerTintColor: "black",
                headerTitleStyle: {fontWeight: 'bold'},
                // header: props => <MyHeaderComponent {...props}/>
              }}
            />
            <Stack.Screen 
              name="NewQuestion" 
              component={NewQuestionScreen}
              navigation={this.props.navigation}
              options={{
                headerStyle: {backgroundColor: "white"},
                headerTintColor: "black",
                // headerTitleStyle: {fontWeight: 'bold'}
              }}
            />
            <Stack.Screen 
              name="QComment" 
              component={QCommentScreen}
              navigation={this.props.navigation}
              options={{
                headerStyle: {backgroundColor: "white"},
                headerTintColor: "black",
                // headerTitleStyle: {fontWeight: 'bold'}
              }}
            />
            <Stack.Screen 
              name="Search" 
              component={SearchScreen}
              navigation={this.props.navigation}
              options={{
                // heardershown
                headerStyle: {backgroundColor: "white"},
                headerTintColor: "black",
                headerTitleStyle: {fontWeight: 'bold'}
              }}
            />
            <Stack.Screen 
              name="Setting" 
              component={SettingScreen}
              navigation={this.props.navigation}
              options={{
                headerStyle: {backgroundColor: "white"},
                headerTintColor: "black",
                headerTitleStyle: {fontWeight: 'bold'}
              }}
            />
            <Stack.Screen 
              name="Other Profile" 
              component={OtherProfileScreen}
              navigation={this.props.navigation}
              options={{
                headerStyle: {backgroundColor: "white"},
                headerTintColor: "black",
                headerTitleStyle: {fontWeight: 'bold'}
              }}
            />
            <Stack.Screen 
              name="Copy" 
              component={CopyScreen}
              navigation={this.props.navigation}
              options={{
                headerStyle: {backgroundColor: "white"},
                headerTintColor: "black",
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