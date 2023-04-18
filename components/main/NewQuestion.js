import React, { useState, useEffect } from 'react';
import {  TouchableWithoutFeedback,Keyboard, KeyboardAvoidingView,StyleSheet, Text, View, Button, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { append, update } from '../../redux/userSlice';
import { signOut, updateProfile } from 'firebase/auth';
import { collection, getDoc, setDoc, addDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { db, auth } from '../../firebase'
import DropDownPicker from "react-native-dropdown-picker";


export default function NewQuestionScreen({route, navigation}) {  
     const user = auth.currentUser;

     const [usersusers, setUsersusers] = useState({
          name: '',
          uid: '',
     });

     const [text, setText] = useState("")
     // console.log(text)

     const [questions, setQuestions] = useState({
          question: '',
          uid: user.uid,
          name: usersusers.name,
          time: Date(),
          tag: '',
          icon: usersusers.icon
     });

     const [open, setOpen] = useState(false);
     const [value, setValue] = useState(null);
     const [items, setItems] = useState([
     //   { label: "Calculus", value: "CeEpS6jdplOJkeyiJ2u4" },
     ]);
     
     const dispatch = useDispatch();

     const stateUsers = useSelector((state) => state.user);
     

     useEffect( () => {
          if (!user.email) {
               return;
          }
          if (!stateUsers) {
               return;
          }
          const foundUser = stateUsers.filter(
               ({email}) => email == user.email
          );
          if (foundUser.length > 0) {
               getUser(user.uid)
               console.log(questions)
          }
          readCollection()
     }, [])
     // }, [stateUsers]);

     async function getUser(uid) {
          try {
            const userRef = doc(collection(db, "users"), uid);
            const userDoc = await getDoc(userRef);  
            if (userDoc.exists()) {
              setUsersusers({...usersusers, name: userDoc.data().name, icon: userDoc.data().icon})
              console.log("User data:", userDoc.data());
            } else {
              console.log("No such document!");
            }
          } catch (e) {
            console.error("Error getting user: ", e);
          }
     }

     useEffect( () => {
          // if (!user.email) {
          //      return;
          // }
          // if (!stateUsers) {
          //      return;
          // }
          const foundUser = stateUsers.filter(
               ({email}) => email == user.email
          );
          // if (foundUser.length > 0) {
               // setUsersusers(foundUser[0]);
               // setQuestions({...questions, name: stateUsers[0].name});
               setTagTag()
               // console.log(questions.uid)
          // }
          console.log(questions)
     }, [value]);
     


     const setTagTag = async() => {
          const result = items.find((item) => item.value === value);
         console.log(result.label)
          // setQuestions({...questions, tag: result.label});
          return result.label
     }

  //get tag information from cloudfirestore
     const readCollection = async () => {
          const qCollection = collection(db, "Q's");
          const qSnapshot = await getDocs(qCollection);
          const idArray = qSnapshot.docs.map((doc) => doc.id);
          const dataArray = qSnapshot.docs.map((doc) => doc.data());
          const newItems = items.slice(); // Create a copy of the existing items array
          for (let i = 0; i < idArray.length; i++) {
               newItems.push({ label: dataArray[i].Tag, value: idArray[i] });
          }
          setItems(newItems);
          // console.log(items)
     };

     async function sendQuestion() {
          try {
               const userRef = doc(collection(db, "Q's", value, "question"))
               // console.log(questions)
               // await setDoc(userRef, { uid: questions.uid || "", name: questions.name, question: questions.question, time: questions.time, tag: questions.tag });
               // setQuestions({...questions, question: text, tag:await setTagTag()});
               await setDoc(userRef, { uid: questions.uid, name: usersusers.name, question: text, tag: await setTagTag(), time: Date(), icon: usersusers.icon, TagID: value, QID: userRef.id});
               const userRef1 = doc(collection(db, "users", user.uid, "question"))
               await setDoc(userRef1, { TagID: value, QID: userRef.id});
               console.log('questions')
               console.log(questions)
               console.log("User added successfully!");
               alert("Question sended successfully👍")
          } catch (e) {
               console.error("Error adding user: ", e);
          }
     }
  

     return (
          
          <SafeAreaView style={styles.container}>
          
               <View style={{flex:1}}>
                    <DropDownPicker
                         open={open}
                         value={value}
                         items={items}
                         setOpen={setOpen}
                         setValue={setValue}
                         setItems={setItems}
                         style={{margin:5, width: "95%"}}
                    />
               </View>
               {/* <View style={{flex:5}}> */}
               <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{width: '100%', 
                    flex: 1, 
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: 4,
                    backgroundColor: "white"}}>
                    <View 
                         style={{
                              width: '100%', 
                              flex: 1, 
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                              padding: 4,
                              backgroundColor: "white"
                         }}
                    >
                    <TextInput
                         multiline
                         placeholder="Ask question..."
                         onChangeText={(text) => setText(text)}
                         style={{ flex: 3, width: "80%", borderRadius: 10, marginBottom: 5, borderWidth: 1, borderColor: 'lightgray'}}
                    />
                    <TouchableOpacity onPress={sendQuestion} style={styles.button}> 
                         <Text style={styles.buttonText}>send</Text>
                    </TouchableOpacity> 
               </View>

               </KeyboardAvoidingView>     
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
     // button: {
     //      width: '50%',
     //      margin: 8,
     // },
     button: {
          marginTop: "auto",
          backgroundColor: "#10a37f",
          padding: 16,
          borderRadius: 4,
          alignItems: "center",
          marginVertical: 6,
     },
     buttonText: {
          color: "white",
          fontWeight: "bold",
     },
});