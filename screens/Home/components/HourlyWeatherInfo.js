import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import HourlyWeatherCard from './HourlyWeatherCard'

const HourlyWeatherInfo = ({ navigation, weatherData, currentData, weeklyData }) => {
    const [ currentTime, setCurrentTime ] = useState(Math.floor(Date.now() / 1000));
    const [ filteredWeatherData, setFilteredWeatherData ] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => {
            const timeNow = Date.now();
            const unixTimeNow = Math.floor(timeNow / 1000);
            setCurrentTime(unixTimeNow);
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const newWeatherData = weatherData?.filter(item => item?.dt >= currentTime);
        setFilteredWeatherData(newWeatherData);
    }, [currentTime])

    const hourlyWeatherInfo = [
        { id: 1, temperature: 24, time: 1 },
        { id: 2, temperature: 21, time: 2 },
        { id: 3, temperature: 27, time: 3 },
        { id: 4, temperature: 22, time: 4 },
        { id: 5, temperature: 26, time: 5 },
        { id: 6, temperature: 25, time: 6 },
        { id: 7, temperature: 23, time: 7 },
        { id: 8, temperature: 20, time: 8 },
        { id: 9, temperature: 28, time: 9 },
        { id: 10, temperature: 23, time: 10 }
    ]

    console.log("Weekly Forecast Data at HourlyWeatherInfo: ", weeklyData);

  if (filteredWeatherData) {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Hourly Weather</Text>
                <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('WeeklyForecast', { weatherData: currentData, weeklyData: weeklyData })}>
                    <Text style={styles.btnText}>Weekly Weather</Text>
                    <Ionicons name="chevron-forward" size={18} color="black" />
                </TouchableOpacity>
            </View>
        <FlatList 
            data={filteredWeatherData && filteredWeatherData.slice(0, 10)}
            renderItem={({item}) => <HourlyWeatherCard weatherItem={item} />}
            keyExtractor={item => item.dt}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
        </View>
    )
  } else {
    return null;
  }
}

export default HourlyWeatherInfo

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 35
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 15
    },
    titleText: {
        fontSize: 20,
        fontWeight: 500
    },
    secondaryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0
    }
})