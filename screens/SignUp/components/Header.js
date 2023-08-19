import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../../constants/colors'

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Sign up</Text>
      <Text style={styles.descText}>Enter information to create a new account.</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    },
    titleText: {
        fontSize: 35,
        fontWeight: 600,
        color: '#fff'
    },
    descText: {
        fontSize: 18,
        fontWeight: 400,
        color: '#fff'
    }
})