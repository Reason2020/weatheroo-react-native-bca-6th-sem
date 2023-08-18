import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons";

const Iconify = ({ iconsFrom, iconName, color }) => {
  if (iconsFrom === "Entypo") {
    return <Entypo name={iconName} size={24} color={color} />
  } else if (iconsFrom === "Feather") {
    return <Feather name={iconName} size={24} color={color} />
  } else if (iconsFrom === "FontAwesome") {
    return <FontAwesome name={iconName} size={24} color={color} />
  } else {
    return <Ionicons name={iconName} size={24} color={color} />
  }
}

export default Iconify

const styles = StyleSheet.create({})