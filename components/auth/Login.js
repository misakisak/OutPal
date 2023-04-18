import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, Text, View, Image, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { append } from '../../redux/userSlice';
import { collection, getDoc, doc } from "firebase/firestore";
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
               getUser()
               setUsersusers({
                    ...usersusers,
                    email: user.email,
               });
               navigation.navigate("Main", { user: usersusers.email });
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

     async function getName(uid) {
          const qCollection = doc(db, "users", uid);
          const qSnapshot =  await getDoc(qCollection);
          if (qSnapshot.exists()) {
               const dataArray = qSnapshot.map((doc) => doc.data());
               console.log('dataArray')
               console.log(dataArray)
          }
     }

     const handleLogin = () => {
          signInWithEmailAndPassword(auth, email, password)

          .then(userCredentials => {
               getUser(userCredentials.user.uid)
               dispatch(append({
                    email: userCredentials.user.email, 
                    uid: userCredentials.user.uid,
               }));
               console.log('Logged in with:', usersusers);
          })
          .catch(error => console.log(error))
          
     }

     return (
          <View
               style={styles.container}
          >
               <Text style={styles.tittle}>
                    OUTPAL
                </Text>
               <Image 
                    source={{ uri:'https://static.wixstatic.com/media/b96e2b_23e7dce1a5754474916ca336c5d8d659~mv2.png/v1/fill/w_646,h_606,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/%E3%83%AD%E3%82%B4%E3%80%80%E7%B7%A8%E9%9B%86.png'}}
                    style={{height: '21%', width: '48.5%', margin: 5}}
               />
               
                <Text style={styles.SUBtittle}>
                    FROM
                    EDUPOPS
                </Text>
               <KeyboardAvoidingView style={styles.inputSection}  behavior="padding">
                   <View style={styles.inputSection} >
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
               </KeyboardAvoidingView>

               <View style={styles.buttonSection}>
                    <TouchableOpacity
                         onPress={handleLogin}
                         style={styles.button}
                    >
                         <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    {/* <Button 
                         onPress={handleLogin}
                         style={styles.button}
                         title="Login"
                    /> */}
                    <TouchableOpacity
                         outline
                         onPress={() => navigation.navigate("Signup")}
                         style={styles.button2}
                    >
                         <Text style={styles.buttonText}>You haven't sign up yet?</Text>
                    </TouchableOpacity>
               </View>
               <View style={{flex:0.5}}></View>
          </View>
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
    borderColor: 'purple'
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
     marginTop: 24,
     marginBottom:10,
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