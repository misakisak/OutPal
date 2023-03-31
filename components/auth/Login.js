import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase';

import { auth } from '../../firebase'

export default function LoginScreen({ navigation }) {
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
   
     useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged(user => {
         if (!user) {
          return;
         }
       })
       navigation.navigate("Home")
       return unsubscribe
     }, [])
   
     const handleSignUp = () => {
          auth
          .createUserWithEmailAndPassword(email, password)
          .then(userCredentials => {
               const user = userCredentials.user;
               console.log('Registered with:', user.email);
          })
          .catch(error => alert(error.message))
     }
   
     const handleLogin = () => {
          auth
          .signInWithEmailAndPassword(email, password)
          .then(userCredentials => {
               const user = userCredentials.user;
               console.log('Logged in with:', user.email);
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