import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PrimaryButton from '../../../components/PrimaryButton'
import { colors } from '../../../constants/colors'

const Bottom = ({ handleSubmit, isValid, navigation }) => {
  return (
    <View style={styles.container}>
        <PrimaryButton title="Sign in" isValid={isValid} handlePress={handleSubmit} />
        <View style={styles.footerContainer}>
            <Text style={styles.normalText}>Don't have an account?</Text>
            <TouchableOpacity 
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={[styles.navigatorText, styles.normalText]}>Sign up</Text>
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
        fontWeight: 400
    },
    navigatorText: {
        color: colors.primary
    }
})