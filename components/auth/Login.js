import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { append, update } from '../../redux/userSlice';
// import { auth } from '../../firebase'
import { collection, getDoc, setDoc, addDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { db, auth } from '../../firebase'

export default function LoginScreen({ navigation }) {
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const dispatch = useDispatch();

     const [usersusers, setUsersusers] = useState({
          email: '',
          uid: ''
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
               navigation.navigate("Main", { user: usersusers.email });
          })
          return unsubscribe
     }, [])

     function getName(uid) {
          // const userRef = doc(collection(db, "users"), uid);
          // const stateUsers = useSelector((state) => state.user)[1];
          const qCollection = (collection(db, "users"), usersusers.uid);
          const qSnapshot =  getDocs(qCollection);
          const idArray = qSnapshot.docs.map((doc) => doc.id);
          const dataArray = qSnapshot.docs.map((doc) => doc.data());
          // const newItems = items.slice(); // Create a copy of the existing items array
          // const newItems = [];
      
          // const Collection = collection(db, "Q's", value, "question");
          // const Snapshot =  getDocs(Collection);
          // const IDArray = Snapshot.docs.map((doc) => doc.id);
      
          // for (let i = 0; i < idArray.length; i++) {
          //   newItems.push({ question: dataArray[i]?.question || "", uid: dataArray[i].uid, name: dataArray[i].name, time: dataArray[i].time, tag: dataArray[i].tag, TagID: value, QID: IDArray[i] });
          // }
          // setQuestionslist(newItems);
          console.log('dataArray')
          console.log(dataArray)
     }

     const handleLogin = () => {
          signInWithEmailAndPassword(auth, email, password)
          .then(userCredentials => {
               // getName(userCredentials.user.uid)
               dispatch(append({
                    email: userCredentials.user.email, 
                    uid: userCredentials.user.uid,
               }));
               // getName(userCredentials.user.uid)
               // const newItems = { uid: dataArray[i].comment, name: dataArray[i].name, time: dataArray[i].time}
               // setUsersusers({...usersusers, uid:userCredentials.user.uid })

               console.log('Logged in with:', usersusers);
               navigation.navigate("Main", {user: userCredentials.user.email})
          })

          // .then(
          //      getName()
          // )
          .catch(error => console.log(error.message))
          
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
    backgroundColor: "white"
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