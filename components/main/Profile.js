//this screen is for user to start new live peer tutoring

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView,  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDoc, setDoc, addDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { db, auth } from '../../firebase'
import Constants from 'expo-constants';
import { useIsFocused } from '@react-navigation/native';


export default function ProfileScreen({navigation}) {
    const user = auth.currentUser

    const [ a, setA ] = useState(true)
    const [copiedText, setCopiedText] = useState('');

    const [usersusers, setUsersusers] = useState({
        email: user.email,
        name: '',
        uid: '',
        bio: '',
    });

    const stateUsers = useSelector((state) => state.user);
    const isFocused = useIsFocused();
    

    useEffect(() => {
        if (isFocused) {
            // Your function here
            getUser()
            console.log('Screen opened');
        } 
    },[isFocused]);

    async function getUser() {
        try {
          const userRef = doc(collection(db, "users"), user.uid);
          const userDoc = await getDoc(userRef);  
          if (userDoc.exists()) {
            setUsersusers({...usersusers, name: userDoc.data().name, bio: userDoc.data().bio, uid: userDoc.id, icon: userDoc.data().icon})
            // console.log("User data:", usersusers);
          } else {
            console.log("No such document!");
          }
        } catch (e) {
          console.error("Error getting user: ", e);
        }
    }


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
    

    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: "white", justifyContent: 'flex-start'}]}>
        <View style={styles.profile}>
            {/* <Image source={{ uri: 'https://cdn.icon-icons.com/icons2/2248/PNG/512/face_icon_137648.png' }} style={{height: 60, width: 60}} /> */}
            <Image 
                source={{ uri: usersusers.icon }} 
                style={{ justifyContent: 'center' ,textAlign: 'center',flexGrow: 0.7,borderRadius: 100,height: 60, width: 60, marginHorizontal: 10}} 
            />

            <View style={styles.followView}>
                <Text style={{fontSize:10}}>posts</Text>
                <Text style={{fontSize:17}}>30</Text>

            </View>
            <View style={styles.followView}>
                <Text style={{fontSize:10}}>followers</Text>
                <Text style={{fontSize:17}}>120</Text>

            </View>
            <View style={styles.followView}>
                <Text style={{fontSize:10}}>following</Text>
                <Text style={{fontSize:17}}>26</Text>
            </View>
        </View>
        <View style={styles.detailContainer}>
            <View style={{flex: 1, marginLeft: 20}}>
                <Text style={{fontWeight: 'bold'}}>{usersusers.name}</Text>
            
            </View>
            <TouchableOpacity style={styles.setting}  onPress={() => navigation.navigate("Edit", {data: usersusers})}>
                <Text style={{fontSize: 11}}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.setting}>
                <Text style={{fontSize: 11}}>Avatar Setting</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.setting} onPress={() => navigation.navigate("Setting")}>
                <Text style={{fontSize: 11}}> Setting</Text>
            </TouchableOpacity>
            
        </View>
        <View style={{borderBottomWidth: 1,  flex: 0.4, borderBottomColor: 'lightgrey'}}>
            <View style={{marginHorizontal: 20}}>
                <Text style={{fontSize: 11, color: 'gray'}}>User ID:</Text>
                <Text style={{fontSize: 11 , color: 'gray'}} selectable={true}>{usersusers.uid}</Text>
            </View>
            <ScrollView style={styles.commentContainer}>
                <Text>{usersusers.bio}</Text>
            </ScrollView>
        </View>
        <View style={{flex:2.5}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', borderBottomWidth: 1, borderBottomColor: 'lightgrey'}}>
                <TouchableOpacity style={{margin: 4}} onPress={() => setA(true)}>
                    <Text>Video</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{margin: 4}} onPress={() => setA(false)}>
                    <Text>Questions</Text>
                </TouchableOpacity>
            </View>
            {a ? (
                <ScrollView>
                <View style={styles.postContainer}>
                    <View style={styles.post}>
                        <Text style={{margin: 9}}>数学的帰納法、授業だけで理解できましたか？</Text>
                    </View>
                    <View style={styles.post}>
                        <Text style={{margin: 9}}>積和の公式の覚え方をわかりやすく説明します</Text>
                    </View>
                    <View style={styles.post}>
                        <Text style={{margin: 9}}>√２が無理数であることの証明、皆さんできますか？</Text>
                    </View>
                </View>
                </ScrollView>
            ) : (
                <Text>Show this when variable is not equal to 1</Text>
            )}
        </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    profile: {
        flex: 0.4,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    detailContainer:{
        flex: 0.1,
        flexDirection: 'row',
        marginRight: 5
        // backgroundColor: "blue"
    },
    setting:{
       flex: 1,
       height: 22,
       backgroundColor: '#EFEFEF' ,
       borderRadius: 5,
       marginLeft: 10,
       alignItems: 'center',
       justifyContent: 'center'

    },
     postContainer: {
         flex:6,
         alignItems: 'center',
         justifyContent: 'center',
         marginTop: 9
    },
    post: {
        flex: 1,
        width: '90%',
        marginBottom: 8,
        backgroundColor: '#E2F5EF',
        borderColor: 'gray',
        borderWidth: 0,
        borderRadius: 5,

    },
    followView: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        flexGrow: 0.9,
    },
    commentContainer:{
        flex: 0.4,
        textAlign: 'left',
        marginHorizontal: 20,
        // backgroundColor: "green"
    },
});