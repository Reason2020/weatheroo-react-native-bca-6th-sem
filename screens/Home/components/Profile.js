import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Profile = ({ navigation }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("UserProfile")}>
        <Text style={styles.userLabel}>RS</Text>
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