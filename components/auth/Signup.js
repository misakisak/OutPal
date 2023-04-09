import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { append, update } from '../../redux/userSlice';
import { auth } from '../../firebase'

export default function SignupScreen({ navigation }) {
     const [username, setUsername] = useState('')
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
               // console.log("user.email!!!")
               // console.log(user.email)
               // console.log("usersusers22!!!")
               // console.log(usersusers)
               navigation.navigate("Home", { user: usersusers });
          })
          return unsubscribe
     }, [])

     const handleSignUp = () => {
          createUserWithEmailAndPassword(auth, email, password)
          .then(userCredentials => {
               // setUsersusers({
               //      ...usersusers,
               //      email: userCredentials.user.email,
               // });
               dispatch(append({
                    email: userCredentials.user.email, 
                    uid: userCredentials.user.uid,
                    // name: username
               }));
               console.log('Registered with:', userCredentials.user.email);
               navigation.navigate("Home", {user: userCredentials.user.email, username})
          })
          .catch(error => alert(error.message))
          
     }

     return (
          <KeyboardAvoidingView
               style={styles.container}
               behavior="padding"
          >
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
          //please teach me how to solve 5x2+8)step by step 

                    <View style={styles.buttonSection}>

                    <Button 
                         outline
                         onPress={handleSignUp}
                         style={styles.button}
                         title="Sign up"
                    />

                    <Button 
                         onPress={() => navigation.navigate('Login')}
                         style={styles.button}
                         title="You have your account already?"
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