//this screen is for user to start new live peer tutoring

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

export default function NewLive({navigation}) {
    return (
        <View style={[{ flex: 1 }]}>
            <Text style={{margin:30}}>NewLive</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Live")}
                    style={styles.button}
                >
                    <Text style={styles.text}>Go Live</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={styles.container}>
            {image && <Image source={{uri: image}} style={styles.image}/>}
            </View> */}
        </View>
    );
}
const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        alignSelf: 'center'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1.5
    },
    image: {
        flex: 1,
        aspectRatio: 1.5,
        alignSelf: 'center'
    },
    container: {
        aspectRatio: 1.5,
        flex: 1
    },
    buttonContainer: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#F38181',
        width: '85%',
        padding: 8,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:2,
        marginRight:2,
        marginTop:10,
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexWrap: "wrap",
        alignContent: "space-around"
    },
    button1: {
        backgroundColor: '#F38181',
        width: '85%',
        padding: 8,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:180,
        marginRight:2,
        marginTop:2,
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexWrap: "wrap",
        alignContent: "space-around"
    },
    text: {
        color: 'white',
    }
})