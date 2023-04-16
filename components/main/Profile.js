//this screen is for user to start new live peer tutoring

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDoc, setDoc, addDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { db, auth } from '../../firebase'
import Constants from 'expo-constants';

export default function ProfileScreen({navigation}) {

      const stateUsers = useSelector((state) => state.user);
      console.log("stateUSers")
      console.log(stateUsers[1])
    //   useEffect(() => {
    //     console.log("stateUSers")
    //     console.log(stateUsers)
    //   },[]);


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
        <SafeAreaView style={[{ flex: 1, backgroundColor: "white",  }]}>
            <View style={styles.profile}>
                <Image source={{ uri: 'https://cdn.icon-icons.com/icons2/2248/PNG/512/face_icon_137648.png' }} style={{height: 60, width: 60}} />
                <View style={styles.followView}>
                <Text>30</Text>
                <Text style={{fontSize:10}}>posts</Text>
                </View>
                <View style={styles.followView}>
                <Text>120</Text>
                <Text style={{fontSize:10}}>followers</Text>
                </View>
                <View style={styles.followView}>
                <Text>26</Text>
                <Text style={{fontSize:10}}>following</Text>
                </View>

            </View>
            <View style={styles.postContainer}>
            </View>
            <TouchableOpacity
                    onPress={() => navigation.navigate("Setting")}
                    style={styles.button}
                >
                    <Text style={styles.text}>Go setting</Text>
                </TouchableOpacity>
        </SafeAreaView>
        // <SafeAreaView style={[{ flex: 1, backgroundColor: "white",  }]}>
        //     <View style={styles.buttonContainer}>
        //         <View style={{flexDirection: "row", backgroundColor: 'green', width: "100%"}}>
        //             <Image source={{ uri: 'https://cdn.icon-icons.com/icons2/2248/PNG/512/face_icon_137648.png' }} style={{height: 100, width: 100}} />
        //             <Text style={{padding: 10}}>30</Text>
        //             <Text style={{padding: 10}}>20</Text>
        //         </View>
        //         <TouchableOpacity
        //             onPress={() => navigation.navigate("Setting")}
        //             style={styles.button}
        //         >
        //             <Text style={styles.text}>Go setting</Text>
        //         </TouchableOpacity>
        //     </View>
        // </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    profile: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        flexDirection: 'row'
    },
     postContainer: {
         flex:2,
         backgroundColor:'#E2F5EF'
    },
    followView: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        flexGrow: 0.9,

    },

});