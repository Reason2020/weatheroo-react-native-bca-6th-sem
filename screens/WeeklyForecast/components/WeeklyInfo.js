import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WeeklyWeatherCard from './WeeklyWeatherCard'

const WeeklyInfo = ({ weeklyData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Weekly Weather</Text>
      {weeklyData.map(data => <WeeklyWeatherCard weatherData={data} />)}
    </View>
  )
}

export default WeeklyInfo

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        marginTop: 35
    },
    titleText: {
        fontSize: 20,
        fontWeight: 500,
        marginBottom: 15
    }
})