import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { append, update } from '../../redux/userSlice';
import { collection, getDoc, setDoc, addDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from '../../firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
// import { collection, getDoc, setDoc, addDoc, doc, updateDoc, getDocs } from "firebase/firestore";


export default function HomeScreen({route, navigation}) {  


  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: '6.5%', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'gray', width: '100%'}}>
        <Text style={{fontSize: 27, marginHorizontal: 14,}}>OutPal</Text>
        <View style={{width: '70%', flexDirection: 'row-reverse',alignSelf: 'flex-end'}}>
          <TouchableOpacity 
              style={{margin: 7, alignSelf: 'flex-end'}}
              onPress={()=> navigation.navigate("Search")}
          >
            <AntDesign name="search1" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity 
              style={{margin: 7, alignSelf: 'flex-end'}}
              // onPress={()=> setState(false)}
          >
            <Feather name="bell" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity 
              style={{margin: 7, alignSelf: 'flex-end'}}
              onPress={() => navigation.navigate("Profile")}
              // onPress={()=> setState(false)}
          >
            <Ionicons name="person-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{height: "5.5%", width: '100%'}}>
        {/* <SafeAreaView> */}
        <ScrollView horizontal={true} style={{width: '100%', backgroundColor: "white", flexDirection: "column"}}>
          
          <TouchableOpacity style={{ hegiht: '10%', marginVertical: 10, padding: 1, borderRadius: 13, borderWidth: 1, borderColor: "#CAF1E4", backgroundColor: "#ECFFF9"}}>
            <Text>Biology</Text>
          </TouchableOpacity>

          <Text>  </Text>

          <TouchableOpacity style={{ hegiht: '10%',marginVertical: 10, padding: 1, borderRadius: 13, borderWidth: 1, borderColor: "#CAF1E4", backgroundColor: "#ECFFF9"}}>
            <Text>Biology</Text>
          </TouchableOpacity>

          <Text>  </Text>

          <TouchableOpacity style={{ hegiht: '10%',marginVertical: 10, padding: 1, borderRadius: 13, borderWidth: 1, borderColor: "#CAF1E4", backgroundColor: "#ECFFF9"}}>
            <Text>Biology</Text>
          </TouchableOpacity>

          <Text>  </Text>

          <TouchableOpacity style={{ hegiht: '10%',marginVertical: 10, padding: 1, borderRadius: 13, borderWidth: 1, borderColor: "#CAF1E4", backgroundColor: "#ECFFF9"}}>
            <Text>Biology</Text>
          </TouchableOpacity>

          <Text>  </Text>

          <TouchableOpacity style={{ hegiht: '10%',marginVertical: 10, padding: 1, borderRadius: 13, borderWidth: 1, borderColor: "#CAF1E4", backgroundColor: "#ECFFF9"}}>
            <Text>Biology</Text>
          </TouchableOpacity>

          <Text>  </Text>

          <TouchableOpacity style={{ hegiht: '10%',marginVertical: 10, padding: 1, borderRadius: 13, borderWidth: 1, borderColor: "#CAF1E4", backgroundColor: "#ECFFF9"}}>
            <Text>Biology</Text>
          </TouchableOpacity>
          <Text>  </Text>

          <TouchableOpacity style={{ hegiht: '10%',marginVertical: 10, padding: 1, borderRadius: 13, borderWidth: 1, borderColor: "#CAF1E4", backgroundColor: "#ECFFF9"}}>
            <Text>Biology</Text>
          </TouchableOpacity>
          <Text>  </Text>

          <TouchableOpacity style={{ hegiht: '10%',marginVertical: 10, padding: 1, borderRadius: 13, borderWidth: 1, borderColor: "#CAF1E4", backgroundColor: "#ECFFF9"}}>
            <Text>Biology</Text>
          </TouchableOpacity>
          <Text>  </Text>

          <TouchableOpacity style={{ hegiht: '10%',marginVertical: 10, padding: 1, borderRadius: 13, borderWidth: 1, borderColor: "#CAF1E4", backgroundColor: "#ECFFF9"}}>
            <Text>Biology</Text>
          </TouchableOpacity>

          
          </ScrollView>
        {/* </SafeAreaView> */}
        
      </View>

     

      <ScrollView style={{flex: 30, backgroundColor: 'white', width: '100%'}}>
        <View style={{ height: "90%", backgroundColor: '#ECFFF9', margin:10, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: "#CAF1E4"}}>
          <View style={{flexDirection: 'row', width: '100%',}}>
            <Image source={{ uri: 'https://cdn.icon-icons.com/icons2/2248/PNG/512/face_icon_137648.png' }} style={{ flex: 1, margin: 3}} />
            <View style={{flexDirection: 'column', flex: 6}}>
              <Text style={styles.title}>Name</Text>
              <Text style={{fontSize: 15, padding: 5}}>Tag</Text>
          
            </View>
          </View>
          <View style={{flexDirection: 'column',flex: 1, width: "100%"}}>

            <Text style={{ alignItems: 'flex-start', padding: 5}}>Title</Text>
            <Text style={{ alignItems: 'flex-start', paddingLeft: 5}}>content</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'flex-start',
    padding: 4,
    backgroundColor: "white",
    flexDirection: "column"

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
    padding: 5
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