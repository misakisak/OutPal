import React,  { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, SafeAreaView, TouchableOpacity, VirtualizedList, FlatList } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { collection, getDoc, setDoc, addDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { db, auth } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux';


export default function QuestionScreen({navigation}) {
  const user = auth.currentUser;
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  const [value, setValue] = useState("v8F1N37ud3vnUQ2KsCE3")


  const [items, setItems] = useState([])
  const stateUsers = useSelector((state) => state.user);
  const [questionslist, setQuestionslist] = useState([
    {question: 'why?', uid: '', name: '', time: Date(), tag: '', TagID: '', QID: ''}
  ])
  const sortedData = questionslist.sort((a, b) => new Date(a.time) - new Date(b.time)).reverse();
  // console.log(questionslist)

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
      setUsersusers(foundUser[0]);
      readCollection()
      // console.log('usersusers')
      // console.log(usersusers)
      setList()
      // setQuestions({...questions, name: foundUser[0].name});
    }
  }, [stateUsers]);



  useEffect(() => {
    setList()
  },[value]);

  const [usersusers, setUsersusers] = useState({
    name: '',
    uid: '',
  });

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

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: "white"}}>
      <View style={{flex:2, flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.navigate("AI")} style={styles.button}> 
          <Text style={styles.buttonText}>AI</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => navigation.navigate("NewQuestion")} style={styles.button}> 
          <Text style={styles.buttonText}>New Question</Text>
        </TouchableOpacity>  
      </View>
      <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{flex: 1, margin: 4, width: '50%', flexDirection: 'row'}}
      />
      
      {/* <View style={{flex: 1, margin: 4, width: '95%'}}> */}
        
      {/* </View> */}
        <View style={{flex: 20,  marginLeft: 4, }}>
        {/* <View style={{flex: 1, margin: 4, width: '95%'}}> */}
        {/* style={{borderBottomWidth: 1, borderBottomColor: 'gray',}} */}
          <FlatList
            data={questionslist}
            renderItem={({item}) => 
              <View style={{borderBottomWidth: 1, borderBottomColor: 'gray',}}>
                <TouchableOpacity onPress={() => navigation.navigate("QComment", {question: item})}  >
                  <Text style={{padding: 5, fontSize: 18}}>{item.name}</Text>
                  <Text style={{padding: 5, fontSize: 15}}>{item.question}</Text>
                  <Text style={{padding: 5, fontSize: 15}}>{item.time}</Text>
                  <Text style={{padding: 5, fontSize: 15}}>{item.tag}</Text>
                </TouchableOpacity>
              </View>
            }
            keyExtractor={item => item.id}
          />
        {/* </View> */}
      </View>
      
         
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 4,
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
  // button: {
  //      width: '50%',
  //      margin: 8,
  // },
  button: {
  //  marginTop: "auto",
    backgroundColor: "#10a37f",
    padding: 14,
    borderRadius: 4,
  //  alignItems: 'flex-strt',
    marginVertical: 6,
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12
  },
});