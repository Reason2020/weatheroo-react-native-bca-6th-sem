import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { convertUnixTimeToReadableTime } from '../../../utils/convertUnixTimeToReadableTime'
import { app } from '../../../firebaseConfig'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

const HourlyWeatherCard = ({ weatherItem }) => {
  const [ imageUrl, setImageUrl ] = useState("");

  const hours = (convertUnixTimeToReadableTime(weatherItem?.dt).getHours());
  const minutes = (convertUnixTimeToReadableTime(weatherItem?.dt)).getMinutes();

  const storage = getStorage(app);

  useEffect(() => {
    if (weatherItem?.weather[0]) {
      const icon = weatherItem?.weather[0].icon;
      const imageRef = ref(storage, `${icon}.png`);

      getDownloadURL(imageRef)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          console.log("Error while fetching data...", error);
        });
    }
  }, [weatherItem])

  return (
    <View style={styles.container}>
      <View style={styles.weatherCard}>
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={styles.weatherIcon}
          />
        )}
        <Text style={styles.temperatureText}>{Math.round(weatherItem.main.temp)}°C</Text>
      </View>
      <Text style={styles.timeText}>{hours % 12}:{minutes} {hours > 12 ? "PM" : "AM"}</Text>
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