import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Iconify from '../../../components/Iconify';

const screenWidth = Dimensions.get('screen').height;

const MoreInfoCard = ({ title, iconsFrom, iconName, color, value, unit }) => {
  return (
    <View style={styles.container}>
      <Iconify iconsFrom={iconsFrom} iconName={iconName} color={color} />
      <View style={styles.moreInfoDesc}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.valueText}>{value} {unit}</Text>
      </View>
    </View>
  )
}

export default MoreInfoCard

const styles = StyleSheet.create({
    container: {
        width: screenWidth * 0.2,
        backgroundColor: "#7E4BD0",
        paddingHorizontal: 15,
        paddingVertical: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 15
    },
    titleText: {
        color: '#fff',
        fontSize: 16
    },
    valueText: {
        color: '#fff',
        fontSize: 18
    }
})