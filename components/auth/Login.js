import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { append, update } from '../../redux/userSlice';

// import rootReducer from './redux/reducers';
// import thunk from 'redux-thunk';
// import { applyMiddleware } from 'redux';

import { auth } from '../../firebase'
import SignupScreen from './Signup';
// import SignupScreen from '../auth/Signup'

export default function LoginScreen({ navigation }) {
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const dispatch = useDispatch();

     const [usersusers, setUsersusers] = useState({
          email: '',
          name: ''
     });
    
     useEffect(() => {
          const unsubscribe = auth.onAuthStateChanged(user => {
               if (!user) {
                    return;
               }
               setUsersusers({
                    ...usersusers,
                    email: user.email,
               });
          // console.log("\\user.email//")
          //      console.log(user.email)
          //      console.log("usersusers22!!!")
          //      console.log(usersusers)
               navigation.navigate("Home", { user: usersusers.email });
          })
          return unsubscribe
     }, [])

     const handleLogin = () => {
          signInWithEmailAndPassword(auth, email, password)
          .then(userCredentials => {
               dispatch(append({
                    email: userCredentials.user.email, 
                    uid: userCredentials.user.uid,
                    // name: username
               }));

               console.log('Logged in with:', userCredentials.user.email);
               navigation.navigate("Home", {user: userCredentials.user.email})
          })
          .catch(error => alert(error.message))
          
     }

     return (
          // <Provider store={store}>
          <KeyboardAvoidingView
               style={styles.container}
               behavior="padding"
          >
               <View style={styles.inputSection}>
                   
                    <TextInput
                         autoCapitalize='none'
                         placeholder="Email"
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
                         onPress={() => navigation.navigate("Signup")}
                         style={styles.button}
                         title="You haven't sign up yet?"
                    />
               </View>
          </KeyboardAvoidingView>
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