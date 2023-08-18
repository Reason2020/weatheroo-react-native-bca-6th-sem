import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Iconify from '../../../components/Iconify';

const screenWidth = Dimensions.get('screen').height;

const MoreInfoCard = ({ title, iconsFrom, iconName, color, unit, weatherData }) => {
    let value = "";
    if (title === "Wind") {
        value = Math.round(weatherData?.wind?.speed);
    } else if (title === "Humidity") {
        value = weatherData?.main?.humidity;
    } else if (title === "Pressure") {
        value = weatherData?.main?.pressure;
    } else if (title === "Visibility") {
        value = Math.round((weatherData?.visibility) / 1000);
    } else if (title === "Sunrise") {
        const unixTimeStamp = weatherData?.sys?.sunrise;
        const date = new Date(unixTimeStamp * 1000);
        const sunriseTime = `${(date.getHours() % 12).toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
        value = sunriseTime;
    } else if (title === "Sunset") {
        const unixTimeStamp = weatherData?.sys?.sunset;
        const date = new Date(unixTimeStamp * 1000);
        const sunsetTIme = `${(date.getHours() % 12).toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
        value = sunsetTIme;
    }
  return (
    <View style={styles.container}>
      <Iconify iconsFrom={iconsFrom} iconName={iconName} color={color} />
      <View style={styles.moreInfoDesc}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.valueText}>{value} {unit}</Text>
      </View>
    </View>
  )
}

export default MoreInfoCard

const styles = StyleSheet.create({
    container: {
        width: screenWidth * 0.2,
        backgroundColor: "#7E4BD0",
        paddingHorizontal: 15,
        paddingVertical: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 15
    },
    titleText: {
        color: '#fff',
        fontSize: 16
    },
    valueText: {
        color: '#fff',
        fontSize: 18
    },
    moreInfoDesc: {
        alignItems: 'flex-end'
    }
})