import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { convertUnixTimeToReadableTime } from '../../../utils/convertUnixTimeToReadableTime'

const HourlyWeatherCard = ({ weatherItem }) => {
  const hours = (convertUnixTimeToReadableTime(weatherItem?.dt).getHours());
  const minutes = (convertUnixTimeToReadableTime(weatherItem?.dt)).getMinutes();

  return (
    <View style={styles.container}>
      <View style={styles.weatherCard}>
        <Image
            source={require('../../../assets/weather.png')}
            style={styles.weatherIcon}
        />
        <Text style={styles.temperatureText}>{Math.round(weatherItem.main.temp)}°C</Text>
      </View>
      <Text style={styles.timeText}>{((hours + 1) % 12) === 0 ? "12" : (hours + 1) % 12} {hours > 12 ? "PM" : "AM"}</Text>
    </View>
  )
}

export default HourlyWeatherCard

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 2,
        marginRight: 30,
    },
    weatherCard: {
        backgroundColor: '#7E4BD0',
        padding: 10,
        borderRadius: 20,
        width: 100,
        height: 100,
        alignItems: 'center',
        gap: 4,
    },
    weatherIcon: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    temperatureText: {
        color: "#fff",
        fontWeight: 500
    },
    timeText: {
        color: "#000",
        fontWeight: 500
    }
})