import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { append, update } from '../../redux/userSlice';
import { collection, getDoc, setDoc, addDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from '../../firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 


export default function HomeScreen({route, navigation}) {  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'gray', width: '100%'}}>
        <Text style={{fontSize: 20, margin: 5, flexDirection: ''}}>OutPal</Text>
        <TouchableOpacity 
            style={{margin: 5, alignSelf: 'flex-end'}}
            onPress={()=> navigation.navigate("Search")}
        >
          <AntDesign name="search1" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity 
            style={{margin: 5, alignSelf: 'flex-end'}}
            // onPress={()=> setState(false)}
        >
          <Feather name="bell" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity 
            style={{margin: 5, alignSelf: 'flex-end'}}
            onPress={() => navigation.navigate("Profile")}
            // onPress={()=> setState(false)}
        >
          <Ionicons name="person-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.actionContainer}>
        {/* <Button
          onPress={() => navigation.navigate("Profile")}
          style={styles.button}
          title="Go Profile"
        /> */}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 4,
    backgroundColor: "white"
  },
  detailsContainer: {
    width: '100%',
    padding: 8,
    flexDirection: 'row',
  },
  image: {
    padding: 10,
    height: 150,
    width: 150,
  },
  detailsContent: {
    paddingLeft: 4,
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 5,
    borderWidth: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentsContainer: {
    height: '40%',
    width: '100%',
    padding: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  button: {
    width: '50%',
    margin: 8,
  },
});