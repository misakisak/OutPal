//this screen is for user to start new live peer tutoring

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView, Dimensions, TextInput, SafeAreaView} from 'react-native';
import { collection, getDoc, setDoc, addDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { db, auth } from '../../firebase'
import { useIsFocused } from '@react-navigation/native';
import DropDownPicker from "react-native-dropdown-picker";
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from 'moment';



export default function NewLive({navigation}) {
    const user = auth.currentUser
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
    //   { label: "Calculus", value: "CeEpS6jdplOJkeyiJ2u4" },
    ]);

    const [title, setTitle] = useState(null)
    const [detail, setDetail] = useState(null)
    const [link, setLink] = useState(null)
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

  const [newlive, setNewlive] = useState({
    uid: user.uid,
    name: '',
    TagID: '',
    tag: '',
    Title: '',
    Time: '',
    Detail: '',
    Link: ''
  })

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    console.log(date)
  };

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

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getUser()
            readCollection()
        } 
    },[isFocused]);

    const [usersusers, setUsersusers] = useState({
        email: user.email,
        name: '',
        uid: '',
        bio: '',
    });

    const setTagTag = async() => {
        // setQuestions("")
        const result = items.find((item) => item.value === value);
        console.log(result.label)
        // setQuestion({...questions, tag: result.label});
        return result.label
    }

    async function getUser() {
        try {
          const userRef = doc(collection(db, "users"), user.uid);
          const userDoc = await getDoc(userRef);  
          if (userDoc.exists()) {
            setUsersusers({...usersusers, name: userDoc.data().name, bio: userDoc.data().bio, uid: userDoc.id, icon: userDoc.data().icon})
            console.log("User data:", usersusers);
          } else {
            console.log("No such document!");
          }
        } catch (e) {
          console.error("Error getting user: ", e);
        }
    }

    async function createLive() {
        try {
            setNewlive({
                uid: '',
                name: '',
                TagID: '',
                tag: '',
                Title: '',
                Time: '',
                Detail: '',
                Link: ''
            });
            console.log(newlive)
            setNewlive({...newlive, 
                uid: user.uid,
                name: usersusers.name,
                TagID: value,
                tag: await setTagTag(),
                Title: title,
                Time: moment(date).format('YYYY/MM/DD HH:mm:ss'),
                Detail: detail,
                Link: link,
                icon: usersusers.icon
            })
            console.log(newlive)
            const userRef = doc(collection(db, "Q's", value, "live"))
            await setDoc(userRef, newlive);
            const userRef2 = doc(collection(db, "Q's", value, "live"), userRef.id);
            await updateDoc(userRef, { LiveID:  userRef.id });

            const userRef3 = doc(collection(db, "users", user.uid, "live"));
            // const liveCollectionRef = collectisn(userDocRef, 'live');
            setDoc(userRef3,{LiveID: userRef.id, TagID: value})
            alert("Live Schedule Created Successfully👍")
        } catch (e) {
             console.error("Error adding user: ", e);
        }
   }


    return (
        
        <SafeAreaView style={[{ flex: 1, backgroundColor: "white"}]}>
            <SafeAreaView style={{padding: 10,flex: 1}}>
                <View style={styles.buttonContainer}>
                    <View style={{width: '100%', margin: 5, alignItems: 'flex-start', flexDirection:'row'}}>
                        <Image source={{ uri: usersusers.icon }} style={{borderRadius: 100,height: 40, width: 58, margin: 10}} />
                        <View style={{flexDirection: 'column'}}>
                        <Text style={styles.paragraph1}>{usersusers.name}</Text>
                        <Text style={styles.paragraph}>User ID:</Text>
                        <Text style={styles.paragraph}>{usersusers.uid}</Text>
                        </View>
                    </View>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="datetime"
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        containerStyle={{ height: '15%', margin: 4 }}
                    />
                    <TextInput style={styles.textInput} placeholder="Title" onChangeText={(text) => setTitle(text)} />
                    <TextInput style={styles.textInput} placeholder="link" value={link} onChangeText={(text) => setLink(text.replace(/\s/g, ''))}  />
                    <Text style={styles.paragraph}>Details</Text>
                    <TextInput style={styles.textInput2} multiline onChangeText={(text) => setDetail(text)}  />
                   
                </View>

                    <TouchableOpacity style={styles.button2} onPress={()=>createLive()}>
                        <Text>Create Live</Text>
                    </TouchableOpacity>

                <Text style={styles.paragraph2}>Your Live Schedule</Text>

                <ScrollView style={{flex: 1, backgroundColor: "white", margin: 2}}>
                    <View style={styles.ScheduleContainer}>
                        <Text style={styles.paragraph}>3/26 20:00~</Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={{padding:3, color: 'white', fontSize: 15}}>Live now!</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ScheduleContainer}>
                        <Text style={styles.paragraph}>4/1 19:30~</Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={{padding:3, color: 'white', fontSize: 15}}>Live now!</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    buttonContainer:{
        flex: 2,
        height: height -100,
        width: width-20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0FAF7',
        alignSelf: 'center',
    },
    textInput: {
        height: 28,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 0,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        margin: 5,
    },
    textInput2: {
        height: '20%',
        width: '90%',
        borderColor: 'gray',
        // borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        marginBottom: 20
    },
    ScheduleContainer: {
        // flex: 1,
        height: '80%',
        borderColor: '#D9D9D9', 
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: 'white',
        marginHorizontal: 3
    },
    paragraph2: {
        textAlign: 'left',
        margin:4,
        fontSize:15,
    },
    paragraph1: {
        textAlign: 'left',
        margin:2,
        fontSize:18,
    },
    paragraph: {
        textAlign: 'left',
        fontSize: 12,
    },
    button:{
        height:'50%',
        borderRadius:5,
        backgroundColor: '#F63B3B',
        margin: 1
    },
    button2:{
        // flex: 1,
        height: '5%',
        width: '50%',
        backgroundColor: '#EFEFEF' ,
        borderRadius: 5,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
 
     },
});