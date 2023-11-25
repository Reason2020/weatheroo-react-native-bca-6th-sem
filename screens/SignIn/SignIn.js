import { Alert, Dimensions, KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Formik, resetForm, formik } from 'formik'
import * as Yup from 'yup'
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { colors } from '../../constants/colors'
import Header from './components/Header'
import Bottom from './components/Bottom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useFocusEffect } from '@react-navigation/native'

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address.')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Must be 8 characters or more.')
    .required('Required')
})

const SignIn = ({ navigation }) => {
  const [ showPassword, setShowPassword ] = useState(true);
  const [ errorMessage, setErrorMessage ] = useState("");

  const auth = FIREBASE_AUTH;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Header />
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values) => (async () => {
          try {
            const response = await signInWithEmailAndPassword(auth, values.email, values.password);
          } catch (error) {
            if (error.message === "Firebase: Error (auth/user-not-found)." || error.message === "Firebase: Error (auth/wrong-password).") {
              setErrorMessage("Invalid Email Address or Password!");
            }
            console.log("Sign In Failed: ", error.message);
          }
        })()}
      >
        {({ 
            values, 
            handleSubmit, 
            touched, 
            handleBlur, 
            errors, 
            isValid, 
            handleChange 
        }) => (
          <KeyboardAvoidingView style={styles.formContainer}>
            <View style={styles.formElementContainer}>
              <TextInput 
                value={values.email}
                style={styles.inputField}
                onChangeText={handleChange('email')}
                placeholder='Email Address'
                placeholderTextColor="#888"
                onBlur={handleBlur('email')}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>*{errors.email}</Text>
              )}
            </View>
            <View style={styles.formElementContainer}>
              <TextInput 
                value={values.password}
                style={styles.inputField}
                onChangeText={handleChange('password')}
                placeholder='Password'
                placeholderTextColor="#888"
                onBlur={handleBlur('password')}
                secureTextEntry={showPassword}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>*{errors.password}</Text>
              )}
            </View>
            <View style={styles.showPasswordContainer}>
              <BouncyCheckbox 
                size={25}
                fillColor={colors.primary}
                unfillColor="#fff"
                iconStyle={{ borderColor: colors.primary }}
                innerIconStyle={{ borderWidth: 2, borderRadius: 4 }}
                onPress={(showPassword) => setShowPassword(!showPassword)}
              />
              <Text style={styles.showPasswordText}>Show Password</Text>
            </View>
            <TouchableOpacity 
              style={styles.forgotPasswordContainer} 
              onPress={
                () => navigation.navigate('ForgotPassword')
              }>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <Bottom handleSubmit={handleSubmit} isValid={isValid} navigation={navigation} setErrorMessage={setErrorMessage} />
            {errorMessage && (
              <View style={styles.screenErrorContainer}>
                <Text style={styles.screenErrorText}>{errorMessage}</Text>
              </View>
            )}
          </KeyboardAvoidingView>  
        )}
      </Formik>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
    flex: 1
  },
  formContainer: {
    marginTop: Dimensions.get('window').height * 0.1,
    gap: 15
  },
  formElementContainer: {
    gap: 10
  },
  inputField: {
    borderColor: colors.primary,
    borderRadius: 10,
    borderWidth: 2,
    padding: 15
  },
  errorText: {
    color: colors.failed,
    fontSize: 11,
    fontWeight: '900'
  },
  showPasswordContainer: {
    flexDirection: 'row',
    gap: 1,
    alignItems: 'center'
  },
  showPasswordText: {
    color: '#888',
    fontSize: 16,
    fontWeight: 400
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  forgotPasswordText: {
    fontSize: 18,
    fontWeight: 400,
    color: colors.primary
  },
  screenErrorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.failed,
    borderRadius: 10
  },
  screenErrorText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: '500'
  }
})