// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, Alert, ScrollView, VirtualizedList} from 'react-native';
// import { OpenAI } from "./node_modules/langchain/llms";
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { collection, getDoc, setDoc, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase'


export default function AIScreen() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState([
    { id: uuidv4(), who1: '', ask: '', text: 'Item 1', who2: 'AI'},
  ]);
  const [api, setAPI] = useState('')  

  const handler = async () => {
    getAPI()
    try {
      const response = await fetch(`https://api.openai.com/v1/completions`, {
        method: "POST",
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: question,
          temperature: 0.3,
          max_tokens: 2048,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            api
        },
      }).then((res) => res.json());
      const newAIDataItem = { id: uuidv4(), who1: 'user', ask: question,  who2: 'AI', text: response.choices[0].text };
      setAnswer([...answer, newAIDataItem]);
      setQuestion("");
    } catch (e) {
      console.error(e);
    }
  }; 

  async function getAPI() {
    try {
      const userRef = doc(collection(db, "API"), "openAPI");
      const userDoc = await getDoc(userRef);
      // return userDoc.data()
      if (userDoc.exists()) {
        console.log("User data:", userDoc.data().api);
        setAPI("Bearer " + userDoc.data().api)
        console.log(api)
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.error("Error getting user: ", e);
    }
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flex: 4}}>
        <VirtualizedList
          data={answer}
          getItemCount={(data) => data.length}
          getItem={(data, index) => data[index]}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View>
              <Text style={{color: 'blue', padding: 5, fontSize: 15}}>{item.who1}</Text>
              <Text style={{padding: 5, fontFamily: 'Menlo'}}>{item.ask}</Text>
              <Text style={{color: 'blue', padding: 5, fontSize: 15}}>{item.who2}</Text>
              <Text style={{padding: 5, fontFamily: 'Menlo'}}>{item.text}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          multiline
          placeholder="Ask question..."
          onChangeText={(text) => setQuestion(text)}
          style={{flex: 1, borderRadius: 10, marginBottom: 5, borderWidth: 1, borderColor: 'lightgray'}}
        />
        <TouchableOpacity onPress={handler} style={styles.button}> 
          <Text style={styles.buttonText}>ASK</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundcolor: "#fff",
    justifyContent: "center",
    padding: 10,
  },
  input: {
    fontSize: 16,
    borderColor: "#3553740",
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    marginTop: 6,
    marginButtom: 12,
  },
  label: {
    fontSize: 16,
    color: "gray",
  },
  selectorContainer: {
    flexDirection: "row",
  },
  selector: {
    flex:1,
    textAlign: "center",
    backgroundColor: "gainsboro",
    margin: 5,
    padding: 16,
    borderRadius: 5,
    overflow: "hidden",
  },
  button: {
    marginTop: "auto",
    backgroundColor: "#10a37f",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginVertical: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex:1,
    padding:10,
  },
  loading: {
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  }
})
