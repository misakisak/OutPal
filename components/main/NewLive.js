//this screen is for user to start new live peer tutoring

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView, Dimensions, TextInput, SafeAreaView} from 'react-native';

export default function NewLive({navigation}) {
    return (
        
        <SafeAreaView style={[{ flex: 1, backgroundColor: "white"}]}>
            {/* <Text style={{margin:30}}>NewLive</Text> */}
            <SafeAreaView style={{padding: 10,flex: 1}}>
                <View style={styles.buttonContainer}>
                    <View style={{width: '100%', margin: 5, alignItems: 'flex-start', flexDirection:'row'}}>
                        <Image source={{ uri: 'https://cdn.icon-icons.com/icons2/2248/PNG/512/face_icon_137648.png' }} style={{height: 50, width: 50}} />
                        <Text style={styles.paragraph}>@Username</Text>
                    </View>
                    <TextInput style={styles.textInput} placeholder="Title" />
                    <TextInput style={styles.textInput} placeholder="Time" />
                    <TextInput style={styles.textInput} placeholder="Password" />
                    <Text style={styles.paragraph}>Details</Text>
                    <TextInput style={styles.textInput2} multiline placeholder="#" />
                </View>

                <Text style={styles.paragraph}>Live Schedule</Text>

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
            {/* <View style={styles.container}>
            {image && <Image source={{uri: image}} style={styles.image}/>}
            </View> */}
            {/* <View style={{flex:1}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Live")}
                    style={styles.button}
                >
                    <Text style={styles.text}>Go Live</Text>
                </TouchableOpacity>
            </View> */}
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
        alignSelf: 'center'
    },
    textInput: {
        height: 28,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 0,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#F0FAF7',
        marginBottom: 20
    },
    textInput2: {
        height: '20%',
        width: '90%',
        borderColor: 'gray',
        borderWidth: 0,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#F0FAF7',
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
    paragraph: {
        textAlign: 'left',
        padding: 5
    },
    button:{
        height:'50%',
        borderRadius:5,
        backgroundColor: '#F63B3B',
        margin: 1
    }
});