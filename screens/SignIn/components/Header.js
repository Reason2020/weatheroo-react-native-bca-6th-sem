import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../../constants/colors'

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Sign in</Text>
      <Text style={styles.descText}>Enter your account details to login.</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    titleText: {
        fontSize: 35,
        fontWeight: 600,
        color: colors.primary
    },
    descText: {
        fontSize: 18,
        fontWeight: 400,
        color: '#000'
    }
})