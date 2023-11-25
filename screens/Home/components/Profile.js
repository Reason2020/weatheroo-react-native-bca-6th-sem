import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
// import { FIREBASE_AUTH } from '../../../firebaseConfig'

const Profile = ({ navigation, shortHandName }) => {
  // const auth = FIREBASE_AUTH;
  // const user = auth?.currentUser;

  // const { displayName } = user;
  // const nameArr = displayName.split(' ');
  // const shortHandName = nameArr[0][0] + nameArr[1][0];

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("UserProfile")}>
        <Text style={styles.userLabel}>{shortHandName}</Text>
    </TouchableOpacity>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7E4BD0',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userLabel: {
        color: '#fff'
    }
})