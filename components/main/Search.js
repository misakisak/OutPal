//this screen is for user to start new live peer tutoring

import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { db, auth } from '../../firebase'
import { collection, getDoc, setDoc, addDoc, doc, updateDoc, getDocs } from "firebase/firestore";


export default function SearchScreen({navigation}) {
    const user = auth.currentUser;
    const [open, setOpen] = useState(false);
    // const [value, setValue] = useState(null);
    const [value, setValue] = useState("v8F1N37ud3vnUQ2KsCE3")
    // useEffect(() => {
    //     setList()
    // },[value]);

    const setList = async () => {
        setQuestionslist([]);
        const qCollection = collection(db, "Q's", value, "question");
        const qSnapshot = await getDocs(qCollection);
        const idArray = qSnapshot.docs.map((doc) => doc.id);
        const dataArray = qSnapshot.docs.map((doc) => doc.data());
        // const newItems = items.slice(); // Create a copy of the existing items array
        const newItems = [];
    
        const Collection = collection(db, "Q's", value, "question");
        const Snapshot = await getDocs(Collection);
        const IDArray = Snapshot.docs.map((doc) => doc.id);
    
        for (let i = 0; i < idArray.length; i++) {
          newItems.push({ question: dataArray[i]?.question || "", uid: dataArray[i].uid, name: dataArray[i].name, time: dataArray[i].time, tag: dataArray[i].tag, TagID: value, QID: IDArray[i] });
        }
        setQuestionslist(newItems);
        // console.log('!!!!!!!!!')
        // console.log(IDArray)
    }

    const fetchTeams = async (search) => {
        const q = query(collection(db, "Q's"), where('teamName', '>=', search));
        const snapshot = await getDocs(q);
        const [items, setItems] = useState([])

        const users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setTeams(users);
    };
    
    return (
        <View style={[{ flex: 1, backgroundColor: "white" }]}>
            <View style={styles.buttonContainer}>
            <DropDownPicker
                open={open}
                value={value}
                // items={items}
                setOpen={setOpen}
                setValue={setValue}
                // setItems={setItems}
                style={{flex: 1, margin: 4, width: '50%', flexDirection: 'row'}}
            />
                <TextInput
                    multiline
                    placeholder="Ask question..."
                    onChangeText={(text) => setText(text)}
                    style={{ flex: 0.5, width: '90%', alignSelf: "center", borderRadius: 10, marginBottom: 5, borderWidth: 1, borderColor: 'lightgray'}}
               />
                {/* <TouchableOpacity
                    onPress={() => navigation.navigate("Setting")}
                    style={styles.button}
                >
                    <Text style={styles.text}>Go setting</Text>
                </TouchableOpacity> */}
            </View>
        </View>
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