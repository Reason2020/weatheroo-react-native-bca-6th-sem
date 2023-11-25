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
import { FIREBASE_AUTH } from '../../firebaseConfig';


const Home = ({ navigation }) => {
  const [ errorMsg, setErrorMsg ] = useState(null);
  const [ currentWeatherData, setCurrentWeatherData ] = useState(null);
  const [ hourlyForecastData, setHourlyForecastData ] = useState(null);
  const [ weeklyForecastData, setWeeklyForecastData ] = useState(null);
  const [ shortHandName, setShortHandName ] = useState("");
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

      // const auth = FIREBASE_AUTH;
      // const user = auth.currentUser;
      // const { displayName } = user;
      // const nameArr = displayName.split(' ');
      setLoading(false);
    })();
  }, [])
  console.log(shortHandName);

  useEffect(() => {
    if (latitude && longitude) {
      setLoading(true);
      (async () => {
        try {
          console.log("Current Latitude and Longitude: ", latitude, longitude);
          const weeklyData = [];
          const [ currentData, hourlyData ] = await Promise.all([
            fetchCurrentWeatherByCoordinates(latitude, longitude),
            fetchWeatherForecastByCoordinates(latitude, longitude)
          ]);
          console.log("Current Latitude and Longitude: ", latitude, longitude);
          console.log("Current Weather Data: ", currentData);
          console.log("Hourly Data: ", hourlyData.list);
          hourlyData.list.forEach(data => {
            if (data.dt_txt.includes("06:00:00")) {
              weeklyData.push(data);
            }
          });
          console.log("Weekly Data: ", weeklyData);

          setCurrentWeatherData(currentData);
          setHourlyForecastData(hourlyData.list);
          setWeeklyForecastData(weeklyData);
          setShortHandName(FIREBASE_AUTH.currentUser.displayName.split(' ')[0][0] + FIREBASE_AUTH.currentUser.displayName.split(' ')[1][0])
        } catch (error) {
          console.log("Error fetching data: ", error);
          setLoading(false);
        } finally {
          setLoading(false)
        }
      })();      
    }
    console.log("Weekly Forecast Data at Home: ", weeklyForecastData);
  }, [latitude, longitude, locationTitle]);

  if (loading) return (
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator size="large" color="#7E4BD0" />
    </View>
  )

  return (
    <ScrollView style={styles.container}>
        <StatusBar />
        <Header navigation={navigation} locationTitle={locationTitle} shortHandName={shortHandName} />
        <MainWeather weatherData={currentWeatherData} />
        <HourlyWeatherInfo navigation={navigation} weatherData={hourlyForecastData} currentData={currentWeatherData} weeklyData={weeklyForecastData} />
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