import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

const PrimaryButton = ({ handlePress, title, isValid, buttonColor, titleColor }) => {
  return (
    <TouchableOpacity
        style={[styles.primaryBtn, { backgroundColor: buttonColor }]}
        onPress={() => isValid && handlePress()}
    >
        <Text style={[styles.titleText, { color: titleColor }]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
    primaryBtn: {
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: 400,
    }
})