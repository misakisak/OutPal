import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { auth } from '../firebase'
import { useDispatch, useSelector } from 'react-redux';

export default function HomeScreen({route}) {  
     const loggedInUser = firebase.auth().currentUser
     const data = useSelector((state) => state.userdata)
          .filter((farmer) => farmer.Username == route.params.userdata)[0];
     // const user = auth
     console.log(loggedInUser)
     console.log(data)

     return (

          <View>
               <Text style={styles.input}>Home: Logged in!!</Text>
          </View>
     )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSection: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 5,
    borderWidth: 2,
  },
  buttonSection: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
  button: {
    width: '100%',
    marginBottom: 5,
  },
});