import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

const PrimaryButton = ({ handlePress, title, isValid }) => {
    console.log("Is valid?", isValid);
    console.log("Handle press?", handlePress)
  return (
    <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => isValid && handlePress()}
    >
        <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
    primaryBtn: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: 400,
        color: "#fff"
    }
})