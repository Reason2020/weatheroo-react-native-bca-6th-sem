import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import React from 'react'
import MainWeather from '../Home/components/MainWeather'
import Header from './components/Header';
import WeeklyInfo from './components/WeeklyInfo';

const WeeklyForecast = ({ navigation, route }) => {
  const { weatherData, weeklyData } = route.params;
  console.log("Current Weather Data: ", weatherData);
  console.log("Weekly Forecast Data at WeeklyForecastScreen: ", weeklyData);

  return (
    <ScrollView style={styles.container}>
      <Header navigation={navigation} />
      <MainWeather weatherData={weatherData} />
      <WeeklyInfo weeklyData={weeklyData} />
    </ScrollView>
  )
}

export default WeeklyForecast

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 3
},
})