import { StyleSheet, Text, View, ScrollView, StatusBar, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import * as Location from "expo-location";
import React, { useState, useEffect } from 'react'
import Header from './components/Header';
import MainWeather from './components/MainWeather';
import HourlyWeatherInfo from './components/HourlyWeatherInfo';
import MoreInformation from './components/MoreInformation';
import { fetchCurrentWeatherByCoordinates, fetchWeatherForecastByCoordinates } from '../../api/openWeatherMapApi';
import { useLocation } from '../../LocationContext';
import { fetchLocationFromGeocodes } from '../../api/geocodingApi';


const Home = ({ navigation }) => {
  const [ errorMsg, setErrorMsg ] = useState(null);
  const [ currentWeatherData, setCurrentWeatherData ] = useState(null);
  const [ hourlyForecastData, setHourlyForecastData ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const { latitude, longitude, locationTitle, updateLocation } = useLocation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      console.log(currentLocation);
      const currentLocationTitleResponse = await fetchLocationFromGeocodes(currentLocation.coords.latitude, currentLocation.coords.longitude);
      const currentLocationTitle = currentLocationTitleResponse?.sublocality;
      console.log("Location Title from Home: ", currentLocationTitle);
      updateLocation(currentLocation.coords.latitude, currentLocation.coords.longitude, currentLocationTitle);
      setLoading(false);
    })();
  }, [])

  useEffect(() => {
    if (latitude && longitude) {
      setLoading(true);
      (async () => {
        try {
          console.log("Current Latitude and Longitude: ", latitude, longitude);
          const [ currentData, hourlyData ] = await Promise.all([
            fetchCurrentWeatherByCoordinates(latitude, longitude),
            fetchWeatherForecastByCoordinates(latitude, longitude)
          ]);
          console.log("Current Latitude and Longitude: ", latitude, longitude);
          console.log("Current Weather Data: ", currentData);
          console.log("Hourly Data: ", hourlyData.list);

          setCurrentWeatherData(currentData);
          setHourlyForecastData(hourlyData.list);
        } catch (error) {
          console.log("Error fetching data: ", error);
          setLoading(false);
        } finally {
          setLoading(false)
        }
      })();      
    }
    
  }, [latitude, longitude, locationTitle]);

  if (loading) return (
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator size="large" color="#7E4BD0" />
    </View>
  )

  return (
    <ScrollView style={styles.container}>
        <StatusBar />
        <Header navigation={navigation} locationTitle={locationTitle} />
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