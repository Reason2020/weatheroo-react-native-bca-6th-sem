import { StyleSheet, Text, View, ScrollView, StatusBar, Button } from 'react-native'
import React from 'react'

const UserProfile = ({ navigation }) => {
  return (
    <View>
      <Text>User Profile</Text>
      <Button title="Back to Home" onPress={() => navigation.pop()} />
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({})