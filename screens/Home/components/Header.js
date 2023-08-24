import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Profile from './Profile';
// import { useLocation } from '../../../LocationContext';

const Header = ({ navigation, locationTitle }) => {

  console.log("Location Title: ", locationTitle);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log("Refresh the page")}>
        <Ionicons name="reload" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.locationBtn} onPress={() => navigation.navigate("SelectLocation")}>
        <Ionicons name="location-outline" size={24} color="black" />
        <Text style={styles.locationText}>{locationTitle}</Text>
        <Ionicons name="chevron-down" size={24} color="black" />
      </TouchableOpacity>
      <Profile navigation={navigation} />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    locationBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3
    },
    locationText: {
        fontSize: 18
    }
})