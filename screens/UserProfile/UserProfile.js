import { StyleSheet, Text, View, ScrollView, StatusBar, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import Header from './components/Header';
import { colors } from '../../constants/colors';

const UserProfile = ({ navigation }) => {
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;

  const { displayName } = user;
  const nameArr = displayName.split(' ');
  const shortHandName = nameArr[0][0] + nameArr[1][0];

  console.log("User: ", user);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      {/* <Text>User Profile</Text>
      <Text>Username: {user.displayName}</Text>
      <Text>Email: {user.email}</Text>
      <Button title="Logout" onPress={() => {
        FIREBASE_AUTH.signOut()
      }} /> */}

      <View style={styles.mainContainer}>
        <View style={styles.profileSection}>
            <View style={styles.profilePic}>
              <Text style={styles.userShortHandText}>{shortHandName}</Text>
            </View>
            <View style={styles.otherDetails}>
              <Text style={styles.usernameText}>{user.displayName}</Text>
              <Text>UID: {user.uid}</Text>
              <Text>Email: {user.email}</Text>
              <TouchableOpacity style={styles.btn} onPress={() => FIREBASE_AUTH.signOut()}>
                <Text style={styles.btnText}>Logout</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 3,
    flex: 1
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    gap: 10,
    alignItems: 'center'
  },
  profilePic: {
    backgroundColor: colors.primary,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userShortHandText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '500'
  },
  usernameText: {
    fontSize: 20,
    fontWeight: '800'
  },
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 8,
    width: 80
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400'
  }
})