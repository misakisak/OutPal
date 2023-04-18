//this screen is for user to start new live peer tutoring

import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, Button, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { db, auth } from '../../firebase'
import { collection, getDoc, setDoc, addDoc, doc, updateDoc, getDocs, where, query } from "firebase/firestore";
import firebase from 'firebase/app';
import 'firebase/database';
import { FlatList } from 'react-native-gesture-handler';



export default function SearchScreen({navigation}) {
    const user = auth.currentUser;
    const [open, setOpen] = useState(false);
    // const [value, setValue] = useState(null);
    const [value, setValue] = useState("null");

    // const [value, setValue] = useState("v8F1N37ud3vnUQ2KsCE3")
    // const [items, setItems] = useState([])
    const [items, setItems] = useState([
        {label: "search with user id", value: "uid"},
        {label: "search question", value: "question"},
        {label: "search live", value: "live"},
        
    ])
    const [tags, setTags] = useState([])

    const [text, setText] = useState('')

    const [searchUser, setSearchUser] = useState([])

    const [Qresult, setQresult] = useState()

    useEffect(() => {
        // readCollection()
    },[]);

    const readCollection = async () => {
        const qCollection = collection(db, "Q's");
        const qSnapshot = await getDocs(qCollection);
        const idArray = qSnapshot.docs.map((doc) => doc.id);
        const dataArray = qSnapshot.docs.map((doc) => doc.data());
        const newItems = []; // Create a copy of the existing items array
        for (let i = 0; i < idArray.length; i++) {
          newItems.push({ label: dataArray[i].Tag, value: idArray[i] });
        }
        setTags(newItems);
    }; 

    async function getOtherUser(uid) {
        try {
            const userRef = doc(collection(db, "users"), uid);
            const userDoc = await getDoc(userRef);  
            if (userDoc.exists()) {
              console.log("User data:", userDoc.data());
            //   navigation.navigate("Other Profile", {data: userDoc.data(), uid: text})
              navigation.navigate("Other Profile", {uid: text})

            } else {
              console.log("No such document!");
            }
        } catch (e) {
            console.error("Error getting user: ", e);
        }
    }

    async function searchQuestion(text) {
        const newItems = [];
        readCollection()
        // console.log("tag tag tag tag tag tag tag tag tag")
        // console.log(tags[0])
        for (let j = 0; j < tags.length; j++) {
            const q = query(collection(db, "Q's", tags[j].value, "question"), where('question', '>=', text));
            const querySnapshot = await getDocs(q);
            const idArray = querySnapshot.docs.map((doc) => doc.id);
            const dataArray = querySnapshot.docs.map((doc) => doc.data());
            for (let i = 0; i < dataArray.length; i++) {
                newItems.push({ question: dataArray[i]?.question || "", uid: dataArray[i].uid, name: dataArray[i].name, time: dataArray[i].time, tag: dataArray[i].tag, TagID: value, QID: idArray[i] });
            }
        }
        setQresult(newItems)
        console.log(Qresult)
    }

    const search = async () => {
        if (value == 'uid') {
            // setText(text.replace(/\s/g, ''))
            getOtherUser(text.replace(/\s/g, ''))
        }
        else if (value == 'question') {
            searchQuestion(text)
        }
        
    }
    
    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: "white" }]}>
            {/* <View style={styles.buttonContainer}> */}
            <View style={{flex:1}}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    // setItems={setItems}
                    style={{flex: 1, margin: 4, width: '50%', flexDirection: 'row'}}
                />
                <TextInput
                    multiline
                    placeholder="Ask question..."
                    onChangeText={(text) => setText(text)}
                    style={{ marginTop: 40, flex: 1, width: '90%', alignSelf: "center", borderRadius: 10, marginBottom: 5, borderWidth: 1, borderColor: 'lightgray'}}
               />
               <TouchableOpacity style={styles.button} onPress={()=>search()}>
                    <Text>Search</Text>
                </TouchableOpacity>
            </View>

            <View style={{flex:4}}>
                {value == "question" ? (
                    <FlatList
                        data={Qresult}
                        renderItem={({item}) => 
                        <View style={{margin: 4, borderWidth: 1, borderRadius: 4, borderColor: 'gray',}}>
                            <TouchableOpacity onPress={() => navigation.navigate("QComment", {question: item})}  >
                            <Text style={{padding: 5, fontSize: 18, color: 'black'}}>{item.name}</Text>
                            <Text style={{padding: 5, fontSize: 15}}>{item.question}</Text>
                            <Text style={{padding: 5, fontSize: 15}}>{item.time}</Text>
                            <Text style={{padding: 5, fontSize: 15}}>{item.tag}</Text>
                            </TouchableOpacity>
                        </View>
                        }
                        keyExtractor={item => item.QID}
                    />
                ) : (
                    <View>
                    <Text>Show this when variable is not equal to 1</Text>
                    </View>
                )}

            </View>
              
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
        alignContent: "space-around",
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