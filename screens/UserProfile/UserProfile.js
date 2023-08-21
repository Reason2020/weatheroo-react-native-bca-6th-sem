import { StyleSheet, Text, View, ScrollView, StatusBar, Button } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig'

const UserProfile = ({ navigation }) => {
  return (
    <View>
      <Text>User Profile</Text>
      <Button title="Logout" onPress={() => FIREBASE_AUTH.signOut()} />
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({})