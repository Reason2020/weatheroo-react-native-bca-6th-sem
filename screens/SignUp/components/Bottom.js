import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PrimaryButton from '../../../components/PrimaryButton'
import { colors } from '../../../constants/colors'

const Bottom = ({ handleSubmit, isValid, navigation }) => {
  return (
    <View style={styles.container}>
        <PrimaryButton title="Create account" isValid={isValid} handlePress={handleSubmit} buttonColor="#fff" titleColor={colors.primary} />
        <View style={styles.footerContainer}>
            <Text style={styles.normalText}>Already have an account?</Text>
            <TouchableOpacity 
                onPress={() => navigation.navigate('SignIn')}
            >
                <Text style={[styles.navigatorText, styles.normalText]}>Sign in</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Bottom

const styles = StyleSheet.create({
    container: {
        gap: 10
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    normalText: {
        fontSize: 18,
        // fontWeight: 400,
        color: '#fff'
    },
    navigatorText: {
        fontWeight: 700
    }
})