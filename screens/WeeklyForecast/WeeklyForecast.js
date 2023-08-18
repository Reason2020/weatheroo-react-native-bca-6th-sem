import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const WeeklyForecast = ({ navigation }) => {
  return (
    <View>
      <Text>WeeklyForecast</Text>
      <Button title="Back to Home" onPress={() => navigation.pop()} />
    </View>
  )
}

export default WeeklyForecast

const styles = StyleSheet.create({})