import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { auth } from '../firebase'
import { useDispatch, useSelector } from 'react-redux';
import { append, update } from '../redux/userSlice';
import { signOut, updateProfile } from 'firebase/auth';

export default function HomeScreen({route, navigation}) {  
  const user = auth.currentUser;

  const [usersusers, setUsersusers] = useState({
    email: user.email,
    name: route.params.username,
    uid: user.uid
  });

  const dispatch = useDispatch();

  const stateUsers = useSelector((state) => state.user);

  useEffect( () => {
    if (!route.params.user) {
      return;
    }
    if (!stateUsers) {
      return;
    }
    const foundUser = stateUsers.filter(
      ({email}) => email == route.params.user);
    if (foundUser.length > 0) {
      setUsersusers(foundUser[0]);
    }
    // const foundComments = stateComments.filter(
    //   ({Username}) => Username == foundFarmer.Username);
    // setComments(foundComments);
  // }, [stateFarmers, stateComments]);
    console.log(foundUser)
  }, [stateUsers]);

  const handleLogout = () => {
    signOut(auth).then( r => {;
      navigation.navigate("Login");
    });
  };

  const updateDetails = async() => {
    dispatch(
      update({
        email: usersusers.email,
        user: user
      })
    );
    console.log('???')
    console.log(usersusers)
  }

  return (
    <View style={styles.container}>

      <View style={styles.detailsContainer}>
        <View style={styles.detailsContent}>
          <View style={styles.detailInput}>
            <Text>Name: {usersusers.name} </Text>
            <Text>Email: {usersusers.email} </Text>
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
              onChangeText={text => setUsersusers({
                ...usersusers,
                name: text,
              })}
              style={styles.input}
              defaultValue={usersusers.name}
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