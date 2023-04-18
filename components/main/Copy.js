//this screen is for user to start new live peer tutoring

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView,  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDoc, setDoc, addDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { db, auth } from '../../firebase'
import Constants from 'expo-constants';
import { useIsFocused } from '@react-navigation/native';


export default function CopyScreen({route,navigation}) { 
     // console.log('route.params.link')
     // console.log(route.params.link)
    return (
        <SafeAreaView style={{flex:1, margin: 10, backgroundColor: "white"}}>
          <Text style={{fontSize: 18, color: 'black', alignItems: 'center', margin:3}}>Select and Copy Link:</Text>
          <Text style={{fontSize: 20, color: 'black', alignItems: 'center', margin:3}} selectable={true}>{route.params.link}</Text>

          <Text style={{fontSize: 20, color: 'darkgray', alignItems: 'center', margin:3}} >If don't see the link, it doesn't have link </Text>
        </SafeAreaView>
    );
}