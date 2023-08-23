import { StyleSheet, Text, View, ScrollView, StatusBar, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import * as Location from "expo-location";
import React, { useState, useEffect } from 'react'
import Header from './components/Header';
import MainWeather from './components/MainWeather';
import HourlyWeatherInfo from './components/HourlyWeatherInfo';
import MoreInformation from './components/MoreInformation';
import { fetchCurrentWeatherByCoordinates, fetchWeatherForecastByCoordinates } from '../../api/openWeatherMapApi';
import { useLocation } from '../../LocationContext';


const Home = ({ navigation }) => {
  const [ location, setLocation ] = useState(null);
  const [ errorMsg, setErrorMsg ] = useState(null);
  const [ currentWeatherData, setCurrentWeatherData ] = useState(null);
  const [ hourlyForecastData, setHourlyForecastData ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const { latitude, longitude, updateLocation } = useLocation();

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
      // setLatitude(currentLocation.coords.latitude);
      // setLongitude(currentLocation.coords.longitude);
      updateLocation(currentLocation.coords.latitude, currentLocation.coords.longitude);
    })();
  }, [])

  useEffect(() => {
    if (latitude && longitude) {
      setLoading(true);
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
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        paddingVertical: 3
    },
    activityIndicatorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
})