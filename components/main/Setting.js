import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Linking, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { append, update } from '../../redux/userSlice';
import { signOut, updateProfile } from 'firebase/auth';
import { collection, getDoc, setDoc, addDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from '../../firebase'
import * as ImagePicker from 'expo-image-picker';
// import {   ref, uploadBytes } from 'firebase/storage';
import firebase from 'firebase/app'
import { storage } from "../../firebase";
import {  ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uuidv4 } from '@firebase/util';
import { useIsFocused } from '@react-navigation/native';
import { setAutoFreeze } from 'immer';

export default function Setting({route, navigation}) {  
  // const user = auth.currentUser;
  // console.log(user.email)
  const [imageUri, setImageUri] = useState(null);
  const [a, setA] = useState(false)

  const [usersusers, setUsersusers] = useState({
    email: '',
    name: '',
    uid: route.params.uid,
    bio: '',
  });
  // setUsersusers(route.params.data)
  // console.log(usersusers)
  const isFocused = useIsFocused();


  const dispatch = useDispatch();

  const stateUsers = useSelector((state) => state.user);
  // console.log(stateUsers[1].name)

  useEffect( () => {
      getUser(usersusers.uid);
  }, [isFocused, a]);

  const handleLogout = () => {
    signOut(auth).then( r => {;
      navigation.navigate("Login");
    });
  };

  //get user information from cloudfirestore
  async function getUser(uid) {
    try {
      const userRef = doc(collection(db, "users"), uid);
      const userDoc = await getDoc(userRef);  
      if (userDoc.exists()) {
        setUsersusers({...usersusers, name: userDoc.data().name, bio: userDoc.data().bio, icon: userDoc.data().icon})
        console.log("User data:", userDoc.data());
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.error("Error getting user: ", e);
    }
  }

const OpenURLButton = ({ url, children, style, style2, style3, style4}) => {
     const handlePress = useCallback(async () => {
         const supported = await Linking.canOpenURL(url);
         if (supported) {
             await Linking.openURL(url);
         } else {
             Alert.alert(`Don't know how to open this URL: ${url}`);
         }
         }, [url]);
 
     return <View style={style4}>
          <TouchableOpacity onPress={handlePress} style={[style, style2]} ><Text style={style3}>{children}</Text></TouchableOpacity>
         </View>;
 };


  return (
    
    <View style={styles.container}>

      <View style={styles.detailsContainer}>
        <View style={styles.detailsContent}>
          <View style={styles.detailInput}>
            <Text>Name: {usersusers.name} </Text>
            <Text>Email: {usersusers.email} </Text>
          </View>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <Button
          onPress={handleLogout}
          style={styles.button}
          title="Logout"
        />
      </View>
      <View styles={[ styles.buttonContainer]}>
          <Text>Learn more about Edupops</Text>
          <OpenURLButton url={'https://edupopsofficial.wixsite.com/edupops'} style={styles.buttonOutline3} style2={styles.button3} style3={styles.buttonText3} style4={styles.button33} > 
               Official Web Site
          </OpenURLButton>
          <OpenURLButton url={'https://twitter.com/edu_pops'} style={styles.buttonOutline3} style2={styles.button3} style3={styles.buttonText3} > 
               Twitter: @edu_pops
          </OpenURLButton>
     </View>
    </View>
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
    flexDirection: 'column',
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
  button: {
    width: '50%',
    margin: 8,
  },
});