import { StyleSheet, Text, View, ScrollView, StatusBar, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import * as Location from "expo-location";
import React, { useState, useEffect } from 'react'
import Header from './components/Header';
import MainWeather from './components/MainWeather';
import HourlyWeatherInfo from './components/HourlyWeatherInfo';
import MoreInformation from './components/MoreInformation';
import { fetchCurrentWeatherByCoordinates, fetchWeatherForecastByCoordinates } from '../../api/openWeatherMapApi';


const Home = ({ navigation }) => {
  const [ location, setLocation ] = useState(null);
  const [ errorMsg, setErrorMsg ] = useState(null);
  const [ latitude, setLatitude ] = useState(null);
  const [ longitude, setLongitude ] = useState(null);
  const [ currentWeatherData, setCurrentWeatherData ] = useState(null);
  const [ hourlyForecastData, setHourlyForecastData ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setLatitude(currentLocation.coords.latitude);
      setLongitude(currentLocation.coords.longitude);
    })();
  }, [])

  useEffect(() => {
    // getCurrentWeatherData();
    // getHourlyWeatherForecast();
    // setLoading(false);
    if (latitude && longitude) {
      (async () => {
        try {
          console.log("Loading: ", loading);
          await Promise.all([
            getCurrentWeatherData(),
            getHourlyWeatherForecast()
          ]);
          setLoading(false);
        } catch (error) {
          console.log("Error fetching data: ", error);
          setLoading(false);
        }
      })();      
    }
    
  }, [latitude, longitude])

  // let text = ""
  // if (latitude && longitude) {
  //   text = `Latitude = ${latitude} and Longitude = ${longitude}`;
  // } else if (errorMsg) {
  //   text = errorMsg;
  // }

  const getCurrentWeatherData = async () => {
    if (latitude && longitude) {
      const data = await fetchCurrentWeatherByCoordinates(latitude, longitude);
      if (data) setCurrentWeatherData(data);
    }
  }

  const getHourlyWeatherForecast = async () => {
    if (latitude && longitude) {
      const data = await fetchWeatherForecastByCoordinates(latitude, longitude);
      if (data) setHourlyForecastData(data.list);
    }
  }

  if (loading) return (
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator size="large" color="#7E4BD0" />
    </View>
  )

  return (
    <ScrollView style={styles.container}>
        <StatusBar />
        {/* <Text>{text}</Text> */}
        <Header navigation={navigation} />
        <MainWeather weatherData={currentWeatherData} />
        <HourlyWeatherInfo navigation={navigation} weatherData={hourlyForecastData} />
        <MoreInformation weatherData={currentWeatherData} />
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D2CED7',
        paddingHorizontal: 5,
        paddingVertical: 3
    },
    activityIndicatorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
})