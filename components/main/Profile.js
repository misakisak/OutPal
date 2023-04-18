//this screen is for user to start new live peer tutoring

import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, Text, Linking, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView,  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDoc, setDoc, addDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { db, auth } from '../../firebase'
import Constants from 'expo-constants';
import { useIsFocused } from '@react-navigation/native';

export default function ProfileScreen({navigation}) {
    const user = auth.currentUser
    const [ a, setA ] = useState(true)
    const [i, setI] = useState(true)
    const [copiedText, setCopiedText] = useState('');
    const [usersusers, setUsersusers] = useState({
        email: user.email,
        name: '',
        uid: '',
        bio: '',
    });
    const [userLiveList, setUserLiveList] = useState([])
    const [liveContentList, setLiveContentList] = useState([])

    const [userQuestionList, setUserQuestionList] = useState([])
    const [questionContentList, setQuestionContentList] = useState([])

    const stateUsers = useSelector((state) => state.user);
    const isFocused = useIsFocused();

    // const newItems2 = [];
    
    useEffect(() => {
        if (isFocused) {
            // Your function here
            getUser()
            readLiveCollection()
            console.log('Profile Screen opened');
        } 
    },[isFocused]);

    // useEffect(() => {
    //     getUser()
    //     readLiveCollection()
    //     console.log('first time!');
    // },[]);

    async function getUser() {
        try {
          const userRef = doc(collection(db, "users"), user.uid);
          const userDoc = await getDoc(userRef);  
          if (userDoc.exists()) {
            setUsersusers({...usersusers, name: userDoc.data().name, bio: userDoc.data().bio, uid: userDoc.id, icon: userDoc.data().icon})
            console.log("User data:", userDoc.data());
            readLiveCollection()//asdfsdfasdf
            readQuestionCollection()
          } else {
            console.log("No such document!");
          }
        } catch (e) {
          console.error("Error getting user: ", e);
        }
    }

    async function getUserQuestion () {
        const qCollection = collection(db, "users", user.uid, 'question');
        const qSnapshot = await getDocs(qCollection);
        const idArray = qSnapshot.docs.map((doc) => doc.id);
        const dataArray = qSnapshot.docs.map((doc) => doc.data());
        const newItems = []; // Create a copy of the existing items array
        for (let i = 0; i < idArray.length; i++) {
            newItems.push({ TagID: dataArray[i].TagID, QID: dataArray[i].QID });
        }
        setUserQuestionList(newItems)
        console.log(userQuestionList)
    }

    function video () {
        setA(true)
        readLiveCollection()
    }

    function question () {
        setA(false)
        readQuestionCollection()
    }

    // async function getUserLive() {
    //     const qCollection = collection(db, "users", user.uid, 'live');
    //     const qSnapshot = await getDocs(qCollection);
    //     const idArray = qSnapshot.docs.map((doc) => doc.id);
    //     const dataArray = qSnapshot.docs.map((doc) => doc.data());
    //     const newItems = []; // Create a copy of the existing items array
    //     for (let i = 0; i < idArray.length; i++) {
    //         newItems.push({ TagID: dataArray[i].TagID, LiveID: dataArray[i].LiveID });
    //     }
    //     setUserLiveList(newItems)
    //     console.log(userLiveList)
    //     console.log(userLiveList[0])
    // }

    const readQuestionCollection = async () => {
        const qCollection = collection(db, "users", user.uid, 'question');
        const qSnapshot = await getDocs(qCollection);
        const idArray = qSnapshot.docs.map((doc) => doc.id);
        const dataArray = qSnapshot.docs.map((doc) => doc.data());
        const newItems = []; // Create a copy of the existing items array
        for (let i = 0; i < idArray.length; i++) {
            newItems.push({ TagID: dataArray[i].TagID, QID: dataArray[i].QID });
        }
        setUserQuestionList(newItems)
        console.log('userQuestionList')
        console.log(userQuestionList)
        // console.log(userLiveList[1].LiveID)
        
        // console.log(userLiveList.length)
        // setLiveContentList([]);
        const newItems2 = [];
        for (let a = 0; a < userQuestionList.length; a++) {
            const qCollection = collection(db, "Q's", userQuestionList[a].TagID, "question");
            const qSnapshot = await getDocs(qCollection);
            const idArray = qSnapshot.docs.map((doc) => doc.id);
            const dataArray = qSnapshot.docs.map((doc) => doc.data());
            for (let i = 0; i < idArray.length; i++) {
                // newItems2.push({
                //     uid: dataArray[i].uid,
                //     name: dataArray[i].name,
                //     tagID: dataArray[i].TagID,
                //     tag: dataArray[i].tag,
                //     title: dataArray[i].Title,
                //     time: dataArray[i].Time,
                //     detail: dataArray[i].Detail,
                //     link: dataArray[i].Link,
                //     icon: dataArray[i].icon,
                //     uid: dataArray[i].uid,
                //     LiveID: dataArray[i].LiveID
                // })
                newItems2.push({ 
                    question: dataArray[i]?.question || "", 
                    uid: dataArray[i].uid, 
                    name: dataArray[i].name, 
                    time: dataArray[i].time, 
                    tag: dataArray[i].tag, 
                    icon: dataArray[i].icon,
                    TagID: userQuestionList[a].TagID, 
                    QID: dataArray[i].QID
                });
                console.log("dataArray[i]")
                console.log(dataArray[i])
            }
        }    
        // setLiveContentList(...liveContentList, newItems2)
        console.log('questionContentList')
        setQuestionContentList(...questionContentList, newItems2)
        console.log(newItems2)
    }; 

    const readLiveCollection = async () => {
        const qCollection = collection(db, "users", user.uid, 'live');
        const qSnapshot = await getDocs(qCollection);
        const idArray = qSnapshot.docs.map((doc) => doc.id);
        const dataArray = qSnapshot.docs.map((doc) => doc.data());
        const newItems = []; // Create a copy of the existing items array
        for (let i = 0; i < idArray.length; i++) {
            newItems.push({ TagID: dataArray[i].TagID, LiveID: dataArray[i].LiveID });
        }
        setUserLiveList(newItems)
        // console.log("userLiveList")
        // console.log(userLiveList)
        // console.log(userLiveList[1].LiveID)
        
        // console.log(userLiveList.length)
        // setLiveContentList([]);
        const newItems2 = [];
        for (let a = 0; a < userLiveList.length; a++) {
            const qCollection = collection(db, "Q's", userLiveList[a].TagID, "live");
            const qSnapshot = await getDocs(qCollection);
            const idArray = qSnapshot.docs.map((doc) => doc.id);
            const dataArray = qSnapshot.docs.map((doc) => doc.data());
            for (let i = 0; i < idArray.length; i++) {
                newItems2.push({
                    uid: dataArray[i].uid,
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
                // console.log("dataArray[i]")
                // console.log(dataArray[i])
            }
        }    
        // setLiveContentList(...liveContentList, newItems2)
        console.log('liveContentList')
        setLiveContentList(...liveContentList, newItems2)
        // console.log(liveContentList)
    }; 

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
            <TouchableOpacity style={styles.setting} onPress={() => navigation.navigate("Setting", {uid: usersusers.uid})}>
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
            {a? (
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', borderBottomWidth: 1, borderBottomColor: 'lightgrey'}}>
                    <TouchableOpacity style={{margin: 4, backgroundColor: '#F2CAFF', borderRadius: 10}} onPress={() => video()}>
                        <Text>Video</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{margin: 4, borderRadius: 10}} onPress={() => question()}>
                        <Text>Questions</Text>
                    </TouchableOpacity>
                 </View>

            ):(
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', borderBottomWidth: 1, borderBottomColor: 'lightgrey'}}>
                    <TouchableOpacity style={{margin: 4,  borderRadius: 10}} onPress={() => video()}>
                        <Text>Video</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{margin: 4,backgroundColor: '#F2CAFF',  borderRadius: 10}} onPress={() => question()}>
                        <Text>Questions</Text>
                    </TouchableOpacity>
                 </View>
            )}
            
            {a ? (
                <FlatList
                    data={liveContentList}
                    // style={styles.postContainer}
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
                            <Text style={{fontSize: 13, padding: 5}}>{item.link}</Text>
                            <Text style={{fontSize: 13, padding: 4}}>Detail: {item.detail}</Text>
                            <View styles={ styles.buttonContainer}>
                                <OpenURLButton url={item.link} style={styles.buttonOutline3} style2={styles.setting} style3={styles.buttonText3} style4={styles.button33} > 
                                    Link to the meet!
                                </OpenURLButton>
                                <TouchableOpacity style={{alignItems: 'center', margin: 2}} onPress={() => navigation.navigate("Copy", {link: item.link})}>
                                    <Text>Copy Link</Text>
                                </TouchableOpacity>
                             </View>
                        </View>
                        </View>
                    }
                    keyExtractor={item => item.LiveID}
                />      
            ) : (
                <FlatList
                    data={questionContentList}
                    renderItem={({item}) => 
                        <View style={{margin: 4, borderWidth: 1, borderRadius: 4, borderColor: 'gray',}}>
                            <TouchableOpacity onPress={() => navigation.navigate("Other Profile", {uid: item.uid})}>
                                <Image source={{ uri: item.icon }} style={{borderRadius: 100,height: 60, width: 80, margin: 3}} />
                                <Text style={{padding: 5, fontSize: 18}}>{item.name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("QComment", {question: item})}>
                            <Text style={{padding: 5, fontSize: 15}}>{item.question}</Text>
                            <Text style={{padding: 5, fontSize: 15}}>{item.time}</Text>
                            <Text style={{padding: 5, fontSize: 15}}>{item.tag}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor={item => item.QID}
                />
                // <Text>Show this when variable is not equal to 1</Text>
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
    },
});