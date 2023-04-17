import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
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

export default function EditScreen({route, navigation}) {  
  const user = auth.currentUser;
  console.log(user.email)
  const [imageUri, setImageUri] = useState(null);
  const [a, setA] = useState(false)

  const [usersusers, setUsersusers] = useState({
    email: user.email,
    name: '',
    uid: user.uid,
    bio: '',
  });
  // setUsersusers(route.params.data)
  // console.log(usersusers)
  const isFocused = useIsFocused();


  const dispatch = useDispatch();

  const stateUsers = useSelector((state) => state.user);
  // console.log(stateUsers[1].name)

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
      // console.log('Founduser[1]')
      // console.log(foundUser[1])
      // setUsersusers(foundUser[0]);
      getUser(usersusers.uid);
    }

  }, [isFocused, a]);

  //   useEffect(() => {
  //     if (isFocused) {
  //         // Your function here
  //         getUser()
  //         console.log('Screen opened');
  //     } 
  // },[isFocused]);

  const handleLogout = () => {
    signOut(auth).then( r => {;
      navigation.navigate("Login");
    });
  };

  const updateDetails = async() => {
    dispatch(
      update({
        // email: usersusers.email,
        name: usersusers.name,
        bio: usersusers.bio,
      })
    );
    console.log(usersusers.name)
    // console.log
    updateUser(usersusers.uid, usersusers.name, usersusers.bio)
  }

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

  async function updateUser(uid, name, bio) {
    try {
      const userRef = doc(collection(db, "users"), uid);
      if (bio && name){
        await updateDoc(userRef, { name: name, bio: bio });
      }
      else if (bio){
        await updateDoc(userRef, { bio: bio });
      }
      else if (name) {
        await updateDoc(userRef, { name: name});
      }
      console.log("User added successfully");
      alert("Updated successfully👍")
    } catch (e) {
      console.error("Error adding user: ", e);
    }
  }


  // const handleButtonPress = async() => {
  //   const result =  await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //   });

  //   // if (!result.cancelled) {
  //     setImageUri(result.uri);
  //     console.log(result.uri)

  //     // Upload the image to Firebase Storage
  //     const response =  await fetch(result.uri);
  //     const blob =  await response.blob();
  //     const fileName = result.uri.split('/').pop();
  //     const storageRef = ref(getStorage(), `images/${fileName}`);
  //     const uploadTask = uploadBytes(storageRef, blob);
  //   // }
  // }
  
  const handleButtonPress = async() => {
    const result =  await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    setImageUri(result.assets[0].uri)
    // console.log(result)
    const uri = result.assets[0].uri;
    // const storageRef = storage.ref();
    // const imageRef = storageRef.child('images/image.jpg');
    const image = await fetch(result.assets[0].uri);
      const bytes = await image.blob();
    const fileRef = ref(storage, uuidv4());

    const file = new File([bytes], uri);
    // const uploadTask = putFile(storageRef, file)
    // uploadTask.then((snapshot) => {
    //   console.log("Uploaded a blob or file!");
    //   const downloadURL = getDownloadURL(storageRef);
    // });
    await uploadBytes(fileRef, file)

    const farmerImageUrl = await getDownloadURL(fileRef);
    // setImageUri(farmerImageUrl)
    console.log(farmerImageUrl)

    try {
      const userRef = doc(collection(db, "users"), user.uid);
        await updateDoc(userRef, { icon: farmerImageUrl });

      console.log("User added successfully!");
      // setUsersusers(...usersusers, icon: farmerImageUrl)
      setA(true)
      alert("Picture uploaded successfully👍")
    } catch (e) {
      console.error("Error adding user: ", e);
    }

  } 


  return (
    
    <View style={styles.container}>

      <View style={styles.detailsContainer}>
        <View style={styles.detailsContent}>
          <View style={styles.detailInput}>
          <Image source={{ uri: usersusers.icon }} style={{ justifyContent: 'center' ,textAlign: 'center',borderRadius: 100,height: 60, width: 80, margin: 10}} />
            <Text>Name: {usersusers.name} </Text>
            <Text>Email: {usersusers.email} </Text>
          </View>

          <View style={styles.detailInput}>
            <Text>Name: </Text>
            <TextInput
              placeholder="new name"
              onChangeText={text => setUsersusers({
                ...usersusers,
                name: text,
              })}
              style={styles.input}
              defaultValue={usersusers.name}
            />
            <Text>Bio: </Text>
            <TextInput
              multiline
              placeholder="bio"
              onChangeText={text => setUsersusers({
                ...usersusers,
                bio: text,
              })}
              style={styles.input}
              defaultValue={usersusers.bio}
            />
          </View>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <Button
          onPress={updateDetails}
          title={"Update Details"}
        />
        {/* <Button
          onPress={handleLogout}
          style={styles.button}
          title="Logout"
        /> */}
      </View>
      <Button title="Pick Image" onPress={handleButtonPress}/>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
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
  button: {
    width: '50%',
    margin: 8,
  },
});