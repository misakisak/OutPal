import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { append, update } from '../../redux/userSlice';
import { auth } from '../../firebase';
import { collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
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

     async function getUser(uid) {
          try {
            const userRef = doc(collection(db, "users"), uid);
            const userDoc = await getDoc(userRef);  
            if (userDoc.exists()) {
              setUsersusers({...usersusers, name: userDoc.data().name})
              console.log("User data:", userDoc.data());
            } else {
              console.log("No such document!");
            }
          } catch (e) {
            console.error("Error getting user: ", e);
          }
     }


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
               navigation.navigate("Edit")
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
               <Text style={styles.tittle}>
                    OUTPAL
                </Text>
               <Image 
                    source={{ uri:'https://static.wixstatic.com/media/b96e2b_23e7dce1a5754474916ca336c5d8d659~mv2.png/v1/fill/w_646,h_606,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/%E3%83%AD%E3%82%B4%E3%80%80%E7%B7%A8%E9%9B%86.png'}}
                    style={{height: '20%', width: '46%', margin: 5}}
               />
               
                <Text style={styles.SUBtittle}>
                    FROM
                    EDUPOPS
                </Text>

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
                    {/* <Button 
                         outline
                         onPress={handleSignUp}
                         style={styles.button}
                         title="Sign up"
                    />
                    <Button 
                         onPress={() => navigation.navigate('Login')}
                         style={styles.button}
                         title="You have your account already?"
                    /> */}
                    <TouchableOpacity
                         onPress={handleSignUp}
                         style={styles.button}
                    >
                         <Text style={styles.buttonText}>Signup</Text>
                    </TouchableOpacity>
                    {/* <Button 
                         onPress={handleLogin}
                         style={styles.button}
                         title="Login"
                    /> */}
                    <TouchableOpacity
                         outline
                         onPress={() => navigation.navigate("Login")}
                         style={styles.button2}
                    >
                         <Text style={styles.buttonText}>You have your account already?</Text>
                    </TouchableOpacity>
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
    borderWidth: 1,
    borderColor: 'purple',
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
  tittle: {
     // marginTop: 24,
     marginButtom: 13,
     fontSize: 22,
     fontWeight: 'bold',
     textAlign: 'center',
     color: 'black',
     // marginTop: 100,
 },
 SUBtittle:{
     marginTop: 24,
     marginBottom: 12,
     fontSize: 14,
     textAlign: 'center',
     color: 'black',
     // marginTop: 120,
 },
 button: {
     marginTop: "auto",
     backgroundColor: "lightblue",
     padding: 10,
     borderRadius: 4,
     alignItems: "center",
     marginVertical: 10,
},
button2: {
     marginTop: "auto",
     backgroundColor: "lightgray",
     padding: 10,
     borderRadius: 4,
     alignItems: "center",
     marginVertical: 6,
},
buttonText: {
     color: "white",
     fontWeight: "bold",
},
});