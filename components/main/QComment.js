//this screen is for user to start new live peer tutoring

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, SafeAreaView, FlatList } from 'react-native';
import { collection, getDoc, setDoc, addDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { db, auth } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux';

export default function QCommentScreen({navigation, route}) {
     const Q = route.params.question
     // console.log("route.params.question")
     // console.log(route.params.question)
     const stateUsers = useSelector((state) => state.user);

     const [text, setText] = useState("")
     // console.log(text)

     const [comment, setComment] = useState(
          {comment: '', uid: '', time: Date(), name: ''}
     )

     const [listComment, setListComment] = useState(

     )
     // console.log("stateusers")
     // console.log(stateUsers)

//     listComment.sort((a, b) => new Date(a.time) - new Date(b.time)).reverse();
     useEffect( () => {
          setList()
     }, []);

     function sendComment(questions) {
          try {
               const userRef = doc(collection(db, "Q's", Q.TagID, "question", Q.QID, "qcomments"))
               // const userRef = doc(collection(db, ("question", "Q's")), value)
               // await setDoc(doc(db, "Q's", value, "question"), data);
                setDoc(userRef, { comment: text, uid: Q.uid, time: Date(), name:stateUsers[0].name });
               // console.log(questions.tag)
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
          // console.log('listComment')
          // console.log(listComment)
     }

    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: "white" }]}>
               {/* <Text style={{margin:30}}>QComment</Text> */}
               <View style={{borderBottomWidth: 1, borderBottomColor: 'gray',}}>
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
               <TextInput
                    multiline
                    placeholder="Ask question..."
                    onChangeText={(text) => setText(text)}
                    style={{ flex: 1, width: '90%', alignSelf: "center", borderRadius: 10, marginBottom: 5, borderWidth: 1, borderColor: 'lightgray'}}
               />
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
        aspectRatio: 1.5,
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