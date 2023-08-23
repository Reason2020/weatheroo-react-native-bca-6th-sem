import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Iconify from '../../../components/Iconify'
import { colors } from '../../../constants/colors'

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Iconify iconName="arrow-left" iconsFrom="Feather" color={colors.primary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Favourite Locations</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 25,
        marginBottom: 25
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 500,
        color: colors.primary
    }
})