import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import Header from './components/Header'
import { colors } from '../../constants/colors'

const SignUp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Header />
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingTop: 20,
  }
})