import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../constants/colors';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = ({ navigation }) => {
    const [ email, setEmail ] = useState('');

    const auth = FIREBASE_AUTH;

    const handleResetPassword = () => {
        sendPasswordResetEmail(auth, email).then((data) => {
            Alert.alert('Check your email')
        }).catch(err => {
            alert(err.code);
        })
    }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Forgot Password?</Text>
      <TextInput 
            style={styles.inputField}
            value={email}
            placeholder='Your Email'
            placeholderTextColor="#888"
            onChangeText={(email) => setEmail(email)}
        />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.btn, styles.resetBtn]} onPress={handleResetPassword}>
            <Text style={[styles.btnText, styles.resetBtnText]}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.backBtn]} onPress={() => navigation.pop()}>
            <Text style={[styles.btnText, styles.backBtnText]}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        paddingVertical: 3,
        flex: 1,
        gap: 10,
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 35,
        fontWeight: 600,
        color: colors.primary
    },
    inputField: {
        borderColor: colors.primary,
        borderRadius: 10,
        borderWidth: 2,
        padding: 15
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    btn: {
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 18,
        fontWeight: 400,
    },
    resetBtn: {
        backgroundColor: colors.primary
    },
    backBtn: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: colors.primary
    },
    backBtnText: {
        color: colors.primary
    },
    resetBtnText: {
        color: '#fff'
    }
})