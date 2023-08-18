import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

const MainWeather = () => {
    const [ currentDateAndTime, setCurrentDateAndTime ] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentDateAndTime(now);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const weeksOfDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <Image 
                source={require('../../../assets/weather.png')}
                style={styles.weatherIcon}
            />
            <View style={styles.weatherDetails}>
                <Text style={styles.temperatureText}>21°</Text>
                <Text style={styles.weatherDescriptionText}>Cloudy</Text>
            </View>
        </View>
        <Text style={styles.dateAndTimeText}>{weeksOfDay[currentDateAndTime.getDay()].slice(0, 3)}, {currentDateAndTime.getDate()} {monthsOfYear[currentDateAndTime.getMonth()].slice(0, 3)} | {currentDateAndTime.getHours()} : {currentDateAndTime.getMinutes() > 9 ? currentDateAndTime.getMinutes() : `0${currentDateAndTime.getMinutes()}`} {currentDateAndTime.getHours > 12 ? "PM" : "AM"}</Text>
    </View>
  )
}

export default MainWeather

const styles = StyleSheet.create({
    container: {
        marginTop: 35
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    weatherIcon: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    weatherDetails: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    temperatureText: {
        fontSize: 60,
        fontWeight: 400,
        color: '#000'
    },
    weatherDescriptionText: {
        fontSize: 30,
        fontWeight: 300
    },
    dateAndTimeText: {
        fontSize: 20
    }
})