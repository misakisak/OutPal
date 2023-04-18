import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Linking,SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { db, auth } from '../../firebase'
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { collection, getDoc, setDoc, addDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

export default function HomeScreen({ navigation }) {  
  const [isLoading, setIsLoading] = useState(false);
  const user = auth.currentUser;
  const [items, setItems] = useState([])
  const isFocused = useIsFocused();
  const [tagValue, setTagValue] = useState(null)
  const [ i, setI ] = useState(true)
  const [listLive, setListLive] = useState([])
  const stateUsers = useSelector((state) => state.user);
  const [newlive, setNewlive] = useState([{
    uid: user.uid,
    name: '',
    TagID: '',
    tag: '',
    Title: '',
    Time: '',
    Detail: '',
    Link: ''
  }])
  
  useEffect( () => {
    setIsLoading(true);
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
      // readCollection()
      // setList()
      console.log(tagValue)
    }
    console.log(isLoading)

    if (tagValue == null) {
      setAllList().then(() => {
        setIsLoading(false);
        console.log(isLoading)
      });
    }
    console.log(tagValue)
  }, [tagValue]);

  function a(a) {
    setIsLoading(true);
    setList(a).then(() => {
      setIsLoading(false);
      console.log(isLoading)
    });
  }

  function b() {
    readCollection()
    setAllList().then(() => {
      setIsLoading(false);
      console.log(isLoading)
    });
  }

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      if (i){
        readCollection()
        setI(false)
      }
      setAllList().then(()=>{
        setIsLoading(false);
      })
      setIsLoading(false);
      console.log('screen opened')
    }
  },[isFocused]);

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
    console.log('items')
    console.log(items)
  }; 

  const setAllList = async () => {
    setListLive([]);
    const newItems = [];
    for (let a = 0; a < items.length; a++) {
      const qCollection = collection(db, "Q's", items[a].value, "live");
      const qSnapshot = await getDocs(qCollection);
      const idArray = qSnapshot.docs.map((doc) => doc.id);
      const dataArray = qSnapshot.docs.map((doc) => doc.data());
      for (let i = 0; i < idArray.length; i++) {
         newItems.push({
          uid: dataArray[i].uid,
          name: dataArray[i].name,
          tagID: dataArray[i].TagID,
          tag: dataArray[i].tag,
          title: dataArray[i].Title,
          time: dataArray[i].Time,
          detail: dataArray[i].Detail,
          link: dataArray[i].Link,
          icon: dataArray[i].icon,
          LiveID: dataArray[i].LiveID
        })
      }
    }    
    setListLive(...listLive,newItems)
    console.log('listLive')
    console.log(newItems)
  }

  const setList = async (value) => {
    setListLive([]);
    const newItems =[]
      const qCollection = collection(db, "Q's", value, "live");
      const qSnapshot = await getDocs(qCollection);
      const idArray = qSnapshot.docs.map((doc) => doc.id);
      const dataArray = qSnapshot.docs.map((doc) => doc.data());
      for (let i = 0; i < idArray.length; i++) {
        newItems.push({uid: dataArray[i].uid,
          name: dataArray[i].name,
          tagID: dataArray[i].TagID,
          tag: dataArray[i].tag,
          title: dataArray[i].Title,
          time: dataArray[i].Time,
          detail: dataArray[i].Detail,
          link: dataArray[i].Link,
          icon: dataArray[i].icon,
          uid: dataArray[i].uid,
          LiveID: dataArray[i].LiveID
        })
      }
    setListLive(...listLive, newItems.sort())
    console.log('!!!!!!!!')
    console.log(listLive.icon)
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
          >
            <Feather name="bell" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity 
              style={{margin: 7, alignSelf: 'flex-end'}}
              onPress={() => navigation.navigate("Profile")}
          >
            <Ionicons name="person-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{height: "6%", width: '100%'}}>
        <FlatList
          data={items}
          horizontal={true}
          renderItem={({item}) => 
          <View style={{ backgroundColor: "white", flexDirection: "column", marginHorizontal: 4}}>
            <TouchableOpacity 
              style={{ hegiht: '10%', marginVertical: 10, padding: 1, borderRadius: 13, borderWidth: 1, borderColor: "#ECB2FF", backgroundColor: "#F2CAFF"}}
              onPress={()=>a(item.value)}
            >
              <Text>{item.label}</Text>
            </TouchableOpacity>
          </View>
          }
          keyExtractor={item => item.value}
        />        

      </View>
      {isLoading ? (
        <View style={{flex: 30, backgroundColor: 'white', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.title}>Loading...</Text>
          <Image 
            source={{uri: 'https://static.wixstatic.com/media/2ab6c0_46a1e117f9d44a86ad8c606662dbfc73~mv2.png/v1/fit/w_712,h_734,q_90/2ab6c0_46a1e117f9d44a86ad8c606662dbfc73~mv2.webp'}}
            style={{ height: '55%', width: '80%', margin: 3}}
          />
        </View>
      ): (

        <FlatList
          data={listLive}
          style={{flex: 30, backgroundColor: 'white', width: '100%'}}
          contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
          renderItem={({item}) => 
            <View style={{flexDirection: 'row', alignItems: 'center', width: '90%', backgroundColor: '#ECFFF9', margin:10, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: "#CAF1E4"}}>
              <View style={{flexDirection: 'column', flex: 6}}>
                <TouchableOpacity style={{fledDirection: 'column'}} onPress={() => navigation.navigate("Other Profile", {uid: item.uid})}>
                  <Image source={{ uri: item.icon }} style={{borderRadius: 100,height: 60, width: 80, margin: 3}} />
                  <Text style={styles.title}>{item.name}</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 15, padding: 4}}>Title: {item.title}</Text>
                <Text style={{fontSize: 13, padding: 4}}>Date: {item.time}</Text>
                <Text style={{fontSize: 13, padding: 4}}>#{item.tag}</Text>
                {/* <Text style={{fontSize: 13, padding: 5}}>{item.link}</Text> */}
                <Text style={{fontSize: 13, padding: 4}}>Detail: {item.detail}</Text>
                    <OpenURLButton url={item.link} style={styles.buttonOutline3} style2={styles.setting} style3={styles.buttonText3} style4={styles.button33} > 
                        Link to the meet!
                    </OpenURLButton>
                    <TouchableOpacity style={{alignItems: 'center', margin: 2}} onPress={() => navigation.navigate("Copy", {link: item.link})}>
                      <Text>Copy Link</Text>
                    </TouchableOpacity>
              </View>
            </View>
          }
          keyExtractor={item => item.LiveID}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
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
  setting:{
    flex: 1,
    height: 22,
    backgroundColor: '#EFEFEF' ,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center'

 },
});