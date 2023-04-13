import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import { append, update } from '../../redux/userSlice';
// import { signOut, updateProfile } from 'firebase/auth';
import { collection, getDoc, setDoc, addDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { db, auth } from '../../firebase'
import DropDownPicker from "react-native-dropdown-picker";


export default function NewQuestionScreen({route, navigation}) {  
     const user = auth.currentUser;

     const [usersusers, setUsersusers] = useState({
          name: '',
          uid: '',
     });

     const [questions, setQuestions] = useState({
          question: '',
          uid: user.uid,
          name: usersusers.name,
          time: Date(),
          tag: '',
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
               setUsersusers(foundUser[0]);
               setQuestions({...questions, name: foundUser[0].name});
               // console.log(usersusers)
          }
          readCollection()
     }, [stateUsers]);


     const uploadQuestion = async() => {
          // const userRef = doc(collection(db, "users"), questions.uid);
          // const userDoc = await getDoc(userRef);
          // console.log(userDoc)
          const result = items.find((item) => item.value === value);
          setQuestions({...questions, tag: result.label});
          // console.log(result.label)
          // console.log(usersusers.name)
          sendQuestion(questions)
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

     async function sendQuestion(questions) {
          try {
               const userRef = doc(collection(db, "Q's", value, "question"))
               // const userRef = doc(collection(db, ("question", "Q's")), value)
               // await setDoc(doc(db, "Q's", value, "question"), data);
               await setDoc(userRef, { uid: questions.uid, name: questions.name, question: questions.question, time: questions.time, tag: questions.tag });
               console.log(questions.tag)
               console.log("User added successfully!");
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
                         style={{flex: 1}}
                    />
               </View>
               {/* <View style={{flex:5}}> */}
                    <TextInput
                         multiline
                         placeholder="Ask question..."
                         onChangeText={(text) => setQuestions({...questions, question: text})}
                         style={{ flex: 3, width: "80%", borderRadius: 10, marginBottom: 5, borderWidth: 1, borderColor: 'lightgray'}}
                    />
                    <TouchableOpacity onPress={uploadQuestion} style={styles.button}> 
                         <Text style={styles.buttonText}>send</Text>
                    </TouchableOpacity>      
               {/* </View> */}
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