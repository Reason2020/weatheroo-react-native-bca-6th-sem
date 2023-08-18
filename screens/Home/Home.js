import { StyleSheet, Text, View, ScrollView, StatusBar, Pressable, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import Header from './components/Header';
import MainWeather from './components/MainWeather';
import HourlyWeatherInfo from './components/HourlyWeatherInfo';
import MoreInformation from './components/MoreInformation';

const Home = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
        <StatusBar />
        <Header navigation={navigation} />
        <MainWeather />
        <HourlyWeatherInfo navigation={navigation} />
        <MoreInformation />
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D2CED7',
        paddingHorizontal: 5,
        paddingVertical: 3
    }
})