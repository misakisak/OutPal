import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { auth } from '../firebase'
import { useDispatch, useSelector } from 'react-redux';
// import firebase from 'firebase';
// require('firebase/firestore')
import { append, update } from '../redux/userSlice';
import { signOut, updateProfile } from 'firebase/auth';

export default function HomeScreen({route, navigation}) {  
    // const loggedInUser = firebase.auth().currentUser
    const user = auth.currentUser;
    // const data = route.params.a;
    // const user = auth
    // console.log(loggedInUser)
    console.log("user2323")
    console.log(user)
    // console.log("route")
    // console.log(route.params.user)

    const [users, setUsers] = useState({
      // email: user.providerData[0].email,
      // name: '',
      email: '',
      name: ''
    });

    const dispatch = useDispatch();

    const stateUsers = useSelector((state) => state.users);
    const [isNewUser, setIsNewUser] = useState(true)

    useEffect( () => {
      if (!route.params.user) {
        return;
      }
      const foundUser = stateUsers.filter(
        ({Username}) => Username == route.params.user);
      if (foundUser.length > 0) {
        setIsNewUser(false);
        setUsers(foundUser[0]);
      }
      // const foundComments = stateComments.filter(
      //   ({Username}) => Username == foundFarmer.Username);
      // setComments(foundComments);
    // }, [stateFarmers, stateComments]);
      console.log(users)
    }, [stateUsers]);

    const handleLogout = () => {
      signOut(auth).then( r => {;
        navigation.navigate("Login");
      });
    };

    const updateDetails = async() => {
      await updateProfile(users, {
        displayName: users.name
      });
      if (isNewUser) {
        dispatch(append(users));
        setIsNewUser(false);
      } else {
        dispatch(
          update({
            name: users.name,
            user: users
          })
        );
      }
    }

    return (
      <View style={styles.container}>

        <View style={styles.detailsContainer}>
          {/* <View>
            {farmer.Image.uri !== ''
              ? <Image style={styles.image} source={farmer.Image} />
              : <View style={styles.image} />
            }
            <TextButton
              onPress={onImagePress}
              title="Pick a photo"
            />
          </View> */}

          <View style={styles.detailsContent}>
            <View style={styles.detailInput}>
              <Text>Name: {users.name} </Text>
              <Text>Email: {users.email} </Text>
              {/* <TextInput
                autoCapitalize='none'
                placeholder="new username"
                onChangeText={text => setFarmer({
                  ...farmer,
                  Username: text,
                })}
                style={styles.input}
                defaultValue={farmer.Username}
              /> */}
            </View>

            <View style={styles.detailInput}>
              <Text>Name: </Text>
              <TextInput
                placeholder="new name"
                onChangeText={text => setUsers({
                  ...user,
                  name: text,
                })}
                style={styles.input}
                defaultValue={users.name}
              />
            </View>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <Button
            onPress={updateDetails}
            title={"Update Details"}
          />
          <Button
            onPress={handleLogout}
            style={styles.button}
            title="Logout"
          />
        </View>

        {/* <View style={styles.commentsContainer}>
          <Text>Comments:</Text>
          <FlatList
              keyExtractor={item => item.uuid}
              data={comments}
              renderItem={({item}) => (
            <View>
              <Text>{item.Content}</Text>
            </View>
              )}
          />
        </View> */}
     </View>

      // <View>
      //   <Text style={styles.input}>Home: Logged in!! {data}</Text>
      // </View>
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
    width: '50%',
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