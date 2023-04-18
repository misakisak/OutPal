//this screen is for user to start new live peer tutoring

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput,TouchableWithoutFeedback,Keyboard, KeyboardAvoidingView, SafeAreaView, FlatList } from 'react-native';
import { collection, getDoc, setDoc, addDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { db, auth } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux';

export default function QCommentScreen({navigation, route}) {
    const user = auth.currentUser
     const Q = route.params.question
    //  console.log("route.params.question")
    //  console.log(route.params.question)
     const stateUsers = useSelector((state) => state.user)[1];

     const [text, setText] = useState("")
     // console.log(text)

     const [comment, setComment] = useState(
          {comment: '', uid: '', time: Date(), name: '', icon: '', QID: '', TagID: ''}
     )

     const [listComment, setListComment] = useState(

     )

     const [name, setName] = useState('')
     const [icon, setIcon] = useState('')
    //  console.log("stateusers")
    //  console.log(stateUsers)

    // listComment.sort((a, b) => new Date(a.time) - new Date(b.time)).reverse();
     useEffect( () => {
          setList()
          getUser(user.uid)
     }, []);
     async function getUser(uid) {
        try {
          const userRef = doc(collection(db, "users"), uid);
          const userDoc = await getDoc(userRef);  
          if (userDoc.exists()) {
            // setUsersusers({...usersusers, name: userDoc.data().name})
            // console.log("User data:", userDoc.data().name);
            // return userDoc.data().name
            setName(userDoc.data().name)
            setIcon(userDoc.data().icon)
            // console.log(name)
          } else {
            console.log("No such document!");
          }
        } catch (e) {
          console.error("Error getting user: ", e);
        }
   }
//The big baddy is Mitsuhide Akechi. There's a thin line between love and hate, so I think is love towards Nobunaga became hate. 
     async function sendComment(questions) {
          try {
                setComment({...comment, 
                    comment: text, 
                    uid: user.uid, 
                    time: Date(), 
                    name: name, 
                    icon: icon, 
                    QID: Q.QID, 
                    TagID: Q.TagID
                })
               
                console.log("name")
                // console.log(Q)
                
                const userRef = doc(collection(db, "Q's", Q.TagID, "question", Q.QID, "qcomments"))
                await setDoc(userRef, comment);
                const userRef2 = doc(collection(db, "Q's", Q.QID, "question", Q.QID, "qcomments"), userRef.id);
                await setDoc(userRef2, { QCID:  userRef.id });
                console.log("Comment added successfully!");
                setList();
          } catch (e) {
               console.error("Error sending comment: ", e);
          }
     }

    const setList = async () => {
          // setListComment([]);
          const qCollection = collection(db, "Q's", Q.TagID, "question", Q.QID, "qcomments");
          const qSnapshot = await getDocs(qCollection);
          const idArray = qSnapshot.docs.map((doc) => doc.id);
          const dataArray = qSnapshot.docs.map((doc) => doc.data());
          // const newItems = items.slice(); // Create a copy of the existing items array
          const newItems = [];

          // const Collection = collection(db, "Q's", value, "question");
          // const Snapshot = await getDocs(Collection);
          // const IDArray = Snapshot.docs.map((doc) => doc.id);
          // console.log('asdfasdfas')
          // console.log(doc.data())
          for (let i = 0; i < idArray.length; i++) {
               newItems.push({ comment: dataArray[i].comment, name: dataArray[i].name, time: dataArray[i].time});
          }
          setListComment(newItems);
          console.log('listComment')
          console.log(listComment)
    }

    return (
        // <KeyboardAvoidingView
        //             style={styles.container}
        //             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        //     >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={[{ flex: 1, backgroundColor: "white" }]}>

               {/* <Text style={{margin:30}}>QComment</Text> */}
               <View style={{borderWidth: 1, borderColor: 'gray',borderRadius: 10, margin: 5}}>
                  <Text style={{padding: 5, fontSize: 18}}>{Q.name}</Text>
                  <Text style={{padding: 5, fontSize: 15}}>{Q.question}</Text>
                  <Text style={{padding: 5, fontSize: 15}}>{Q.time}</Text>
                  <Text style={{padding: 5, fontSize: 15}}>{Q.tag}</Text>
              </View>
              <View style={{flex: 2, margin: 4, width: '95%'}}>
                    <FlatList
                         data={listComment}
                         renderItem={({item}) => 
                         <View style={{borderBottomWidth: 0.5, borderBottomColor: 'lightgray',}}>
                              <TouchableOpacity>
                              <Text style={{padding: 5, fontSize: 18}}>{item.name}</Text>
                              <Text style={{padding: 5, fontSize: 15}}>{item.comment}</Text>
                              <Text style={{padding: 5, fontSize: 15}}>{item.time}</Text>
                              {/* <Text style={{padding: 5, fontSize: 15}}>{item.tag}</Text> */}
                              </TouchableOpacity>
                         </View>
                         }
                         keyExtractor={item => item.id}
                    />
               </View>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                <View style={styles.container}>
               <TextInput
                    multiline
                    placeholder="Ask question..."
                    onChangeText={(text) => setText(text)}
                    style={{ flex: 0.5, width: '90%', alignSelf: "center", borderRadius: 10, marginBottom: 5, borderWidth: 1, borderColor: 'lightgray'}}
               />
               </View>
               </KeyboardAvoidingView>
               <TouchableOpacity onPress={sendComment} style={styles.button}> 
                         <Text style={styles.buttonText}>send</Text>
               </TouchableOpacity>
            {/* <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Live")}
                    style={styles.button}
                >
                    <Text style={styles.text}>Go Live</Text>
                </TouchableOpacity>
            </View> */}
            {/* <View style={styles.container}>
            {image && <Image source={{uri: image}} style={styles.image}/>}
            </View> */}
        </SafeAreaView>
        </TouchableWithoutFeedback>
        // </KeyboardAvoidingView>

    );
}
const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        alignSelf: 'center'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1.5
    },
    image: {
        flex: 1,
        aspectRatio: 1.5,
        alignSelf: 'center'
    },
    container: {
        // aspectRatio: 1.5,
        flex: 1
    },
    buttonContainer: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#F38181',
        width: '85%',
        padding: 8,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:2,
        marginRight:2,
        marginTop:10,
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexWrap: "wrap",
        alignContent: "space-around"
    },
    button1: {
        backgroundColor: '#F38181',
        width: '85%',
        padding: 8,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:180,
        marginRight:2,
        marginTop:2,
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexWrap: "wrap",
        alignContent: "space-around"
    },
    text: {
        color: 'white',
    }
})