import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { append, update } from '../../redux/userSlice';
import { auth } from '../../firebase';
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from '../../firebase';

export default function SignupScreen({ navigation }) {
     const [name, setName] = useState('')
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
                    email: user.user.email,
               });
               navigation.navigate("Main");
          })
          return unsubscribe
     }, [])

     const handleSignUp = () => {
          createUserWithEmailAndPassword(auth, email, password)
          .then(userCredentials => {
               dispatch(append({
                    email: userCredentials.user.email, 
                    uid: userCredentials.user.uid,
                    name: name
               }));
               //add user information to cloudfirestore with uid

               try {
                    const userRef = doc(collection(db, "users"), userCredentials.user.uid);
                    setDoc(userRef, { email: userCredentials.user.email, name: name });
                    console.log("User added successfully!");
               } catch (e) {
                    console.error("Error adding user: ", e);
               }
               console.log('Registered with:', userCredentials.user.email);
               navigation.navigate("Setting")
          })
          .catch(error => alert(error.message))
     }

     //add user information to cloudfirestore with uid
     // async function addUser(uid, email) {
     //      try {
     //        const userRef = doc(collection(db, "users"), uid);
     //        await setDoc(userRef, { email: email, name: name });
     //        console.log("User added successfully!");
     //      } catch (e) {
     //        console.error("Error adding user: ", e);
     //      }
     // }

     return (
          <KeyboardAvoidingView
               style={styles.container}
               behavior="padding"
          >
               <View style={styles.inputSection}>
                    <TextInput
                         autoCapitalize='none'
                         placeholder="name"
                         onChangeText={setName}
                         value={name}
                         style={styles.input}
                    />
                    <TextInput
                         autoCapitalize='none'
                         placeholder="email"
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
    backgroundColor: "whtie"
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