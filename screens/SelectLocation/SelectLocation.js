import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const SelectLocation = ({ navigation }) => {
  return (
    <View>
      <Text>SelectLocation</Text>
      <Button title="Back to Home" onPress={() => navigation.pop()} />
    </View>
  )
}

export default SelectLocation

const styles = StyleSheet.create({})