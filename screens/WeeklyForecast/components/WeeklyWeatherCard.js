import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../../../constants/colors';
import { app } from '../../../firebaseConfig'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

const WeeklyWeatherCard = ({ weatherData }) => {
    const [ imageUrl, setImageUrl ] = useState("");

    const storage = getStorage(app);

    useEffect(() => {
        if (weatherData?.weather[0]) {
        const icon = weatherData?.weather[0].icon;
        const imageRef = ref(storage, `${icon}.png`);

        getDownloadURL(imageRef)
            .then((url) => {
            setImageUrl(url);
            })
            .catch((error) => {
            console.log("Error while fetching data...", error);
            });
        }
    }, [weatherData])

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const unixTimeStamp = weatherData?.dt;
    const date = new Date(unixTimeStamp * 1000);
    const dayOfWeek = date.getDay();
    const dayOfWeekString = daysOfWeek[dayOfWeek];

  return (
    <View style={styles.container}>
      <Text style={styles.text} >{dayOfWeekString}</Text>
      <View style={styles.imageContainer}>
        {imageUrl && (
            <Image 
                source={{uri: imageUrl}}
                style={styles.imageStyles}
            />
        )}
      </View>
      <Text style={styles.text}>{Math.round(weatherData?.main?.temp)}°</Text>
    </View>
  )
}

export default WeeklyWeatherCard

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imageStyles: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    text: {
        fontSize: 18,
        fontWeight: 500,
        color: "#fff"
    }
})