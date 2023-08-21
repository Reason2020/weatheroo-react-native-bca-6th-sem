import { Alert, KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Header from './components/Header'
import { colors } from '../../constants/colors'
import Bottom from './components/Bottom'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const ValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Required')
    .min(2, 'Must be 2 characters or more'),
  lastName: Yup.string()
    .required('Required')
    .min(2, 'Must be 2 characters or more'),
  email: Yup.string()
    .email('Invalid Email Address')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .required('Required')
})

const SignUp = ({ navigation }) => {
  const [ showPassword, setShowPassword ] = useState(true);
  const [ errorMessage, setErrorMessage ] = useState();

  const auth = FIREBASE_AUTH;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <StatusBar />
        <Header />
        <Formik 
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: ''
          }}
          validationSchema={ValidationSchema}  
          onSubmit={(values) => (async () => {
            try {
              const response = await createUserWithEmailAndPassword(auth, values.email, values.password);
              await updateProfile(response.user, {
                displayName: `${values.firstName} ${values.lastName}`
              });
              navigation.navigate('SignIn');
            } catch (error) {
              if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                setErrorMessage("The email address is already in use!");
              }
              console.log("Sign up failed: ", error.message)
            }
          })()}
        >
          {({
            values,
            handleChange,
            handleBlur,
            touched,
            errors,
            isValid,
            handleSubmit
          }) => (
            <KeyboardAvoidingView style={styles.formContainer}>
              <View style={styles.formElementContainer}>
                <TextInput 
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  placeholder='First Name'
                  placeholderTextColor='#ccc'
                  style={styles.inputField}
                />
                {touched.firstName && errors.firstName && (
                  <Text style={styles.errorText}>*{errors.firstName}</Text>
                )}
              </View>
              <View style={styles.formElementContainer}>
                <TextInput 
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  placeholder='Last Name'
                  placeholderTextColor='#ccc'
                  style={styles.inputField}
                />
                {touched.lastName && errors.lastName && (
                  <Text style={styles.errorText}>*{errors.lastName}</Text>
                )}
              </View>
              <View style={styles.formElementContainer}>
                <TextInput 
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder='Email Address'
                  placeholderTextColor='#ccc'
                  style={styles.inputField}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>*{errors.email}</Text>
                )}
              </View>
              <View style={styles.formElementContainer}>
                <TextInput 
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder='Password'
                  placeholderTextColor='#ccc'
                  style={styles.inputField}
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
                  unfillColor={colors.primary}
                  innerIconStyle={{ borderColor: "#fff", borderWidth: 2, borderRadius: 4, color: colors.primary }}
                  onPress={(showPassword) => setShowPassword(!showPassword)}
                />
                <Text style={styles.showPasswordText}>Show Password</Text>
              </View>
              <Bottom handleSubmit={handleSubmit} isValid={isValid} navigation={navigation} />
              {errorMessage && (
              <View style={styles.screenErrorContainer}>
                <Text style={styles.screenErrorText}>{errorMessage}</Text>
              </View>
            )}
            </KeyboardAvoidingView>
          )} 
        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  container: {
    flexGrow: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  formContainer: {
    marginTop: Dimensions.get('window').height * 0.05,
    gap: 15
  },
  formElementContainer: {
    gap: 10
  },
  inputField: {
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    padding: 15,
    color: '#fff'
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
    color: '#fff',
    fontSize: 16,
    fontWeight: 400
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