import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// import rootReducer from './redux/reducers';
// import thunk from 'redux-thunk';
// import { applyMiddleware } from 'redux';

import { auth } from '../../firebase'

export default function LoginScreen({ navigation }) {
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     // const [user1, setUser1] = useState('')
     // const user = userCredentials.user

     const [users, setUsers] = useState({
          // email: user.providerData[0].email,
          // name: '',
          email: '',
          name: ''
     });
    
     useEffect(() => {
          const unsubscribe = auth.onAuthStateChanged(user => {
               if (!user) {
                    return;
               }
               
               const userName = user.providerData[0].displayName || '';
               setUsers({
                    ...users,
                    email: user.email,
               });
               console.log("users!!!")
               console.log(user.email)
               console.log("users22!!!")
               console.log(users)
               navigation.navigate("Home", { user: users });
          })
          return unsubscribe
     }, [])
     // console.log(user.email)

     const handleSignUp = () => {
          createUserWithEmailAndPassword(auth, email, password)
          .then(userCredentials => {
               // const user = userCredentials.user;
               // setUsers = userCredentials.user
               setUsers({
                    ...users,
                    email: userCredentials.user.email,
               });
               // console.log('Registered with:', user.email);
               console.log('Registered with:', users.name);
          })
          .catch(error => alert(error.message))
          navigation.navigate("Home", {user: users})
     }
     
     const handleLogin = () => {
          signInWithEmailAndPassword(auth, email, password)
          .then(userCredentials => {
               // const user = userCredentials.user;
               // setUsers = userCredentials.user;
               setUsers({
                    ...users,
                    email: userCredentials.user.email,
               });
               console.log("setUsers###")
               console.log(users)
               console.log('Logged in with:', users.email);
               // setUser1(user.email)
          })
          .catch(error => alert(error.message))
          navigation.navigate("Home", {user: users})
     }

     return (
          // <Provider store={store}>
          <KeyboardAvoidingView
               style={styles.container}
               behavior="padding"
          >
               {/* <View style={{backgroundColor: "black", height: 1, width: "100%", margin: 10}}/> */}
               <View style={styles.inputSection}>
                    <TextInput
                         autoCapitalize='none'
                         placeholder="Username"
                         onChangeText={setEmail}
                         value={email}
                         style={styles.input}
                    />
                    <TextInput
                         autoCapitalize='none'
                         placeholder="password"
                         onChangeText={setPassword}
                         value={password}
                         style={styles.input}
                         secureTextEntry
                    />
                    </View>

                    <View style={styles.buttonSection}>
                    <Button 
                         onPress={handleLogin}
                         style={styles.button}
                         title="Login"
                    />

                    <Button 
                         outline
                         onPress={handleSignUp}
                         style={styles.button}
                         title="Register"
                    />
               </View>
          </KeyboardAvoidingView>
          // </Provider>
     );
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