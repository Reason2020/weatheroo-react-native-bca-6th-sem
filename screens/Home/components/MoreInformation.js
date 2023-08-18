import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MoreInfoCard from './MoreInfoCard'

const MoreInformation = () => {
    const moreInformationTitleRequirements = [
        {title: 'Wind', iconsFrom: 'Feather', iconName: 'wind', color: '#A0C8F4', value: '4', unit: 'km/h'},
        {title: 'Humidity', iconsFrom: 'Ionicons', iconName: 'water', color: '#A0C8F4', value: '56', unit: '%'},
        {title: 'Precipitation', iconsFrom: 'Entypo', iconName: 'water', color: '#A0C8F4', value: '20', unit: 'mm'},
        {title: 'Pressure', iconsFrom: 'FontAwesome', iconName: 'thermometer-2', color: '#F35E4D', value: '800', unit: 'hcpa'},
        {title: 'Air Quality', iconsFrom: 'Entypo', iconName: 'air', color: '#F8F5FC', value: '34', unit: ''},
        {title: 'VIsibility', iconsFrom: 'Feather', iconName: 'cloud-off', color: '#F8F5FC', value: '11', unit: 'km'}
    ]

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>More Information</Text>
      </View>
      <View style={styles.cardsContainer}>
        {moreInformationTitleRequirements.map((information, index) => <MoreInfoCard {...information} key={index} />)}
      </View>
    </View>
  )
}

export default MoreInformation

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 35,
    marginBottom: 20
  },
  titleContainer: {
    marginBottom: 15,
    justifyContent: 'flex-end'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 500
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 30,
  }
})