//Tabscreens

import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { connect } from 'react-redux';

import HomeScreen from './main/Home';
import newLiveScreen from './main/NewLive';
import profileScreen from './main/Setting';
import QuestionScreen from './main/Question';

const Tab = createMaterialBottomTabNavigator();

export class Main extends Component {

     render() {
          return ( 
               <Tab.Navigator 
                    initialRouteName="Home" 
                    labeled={false}
                    barStyle={{ backgroundColor: "#95E1D3" }}
               >
                    <Tab.Screen name="Home" component={HomeScreen} navigation={this.props.navigation}
                         options={{
                              tabBarIcon: ({ color, size }) => (
                              <MaterialCommunityIcons name="home" color={color} size={26}/>
                              ),
                         }}
                    />
                    <Tab.Screen name="NewLive" component={newLiveScreen} navigation={this.props.navigation}
                         options={{
                              tabBarIcon: ({ color, size }) => (
                                   <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
                              ),
                         }}
                    />
                    <Tab.Screen name="Question" component={QuestionScreen}
                         options={{
                              tabBarIcon: ({ color, size }) => (
                                   // <MaterialCommunityIcons name="account-group" color={color} size={26}/>
                                   <MaterialCommunityIcons name="chat-question" size={24} color="black" />
                              ),
                         }}
                    />
               </Tab.Navigator>
          ) 
     }
}

export default Main;