import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getStorage, ref, getDownloadURL } from "firebase/storage"; 
import { app } from '../../../firebaseConfig';

const MainWeather = ({ weatherData }) => {
    const [ currentDateAndTime, setCurrentDateAndTime ] = useState(new Date());
    const [ imageUrl, setImageUrl ] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentDateAndTime(now);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const storage = getStorage(app);
    

    useEffect(() => {
        if (weatherData?.weather[0]) {
            const icon = weatherData?.weather[0].icon;
            const iconRef = ref(storage, `${icon}.png`);

            getDownloadURL(iconRef)
                .then((url) => {
                    setImageUrl(url);
                })
                .catch((error) => {
                    console.log("Error while fetching image: ", error);
                });
        }
    }, [weatherData])

    const weeksOfDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            {imageUrl ? (
                <Image 
                source={{ uri: imageUrl }}
                style={styles.weatherIcon}
            />
            ) : null}
            <View style={styles.weatherDetails}>
                <Text style={styles.temperatureText}>{Math.round(weatherData?.main?.temp)}°</Text>
                <Text style={styles.weatherDescriptionText}>{weatherData?.weather[0]?.main}</Text>
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