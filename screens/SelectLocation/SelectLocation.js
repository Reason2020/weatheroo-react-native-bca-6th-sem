import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, StatusBar, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'
import Iconify from '../../components/Iconify'
import { colors } from '../../constants/colors'
import Header from './components/Header'
import { useLocation } from '../../LocationContext'
import { fetchGeocodesFromLocation } from '../../api/geocodingApi'

const SelectLocation = ({ navigation, route }) => {
  const [ usersFavouriteLocations, setUsersFavouriteLocations ] = useState([]);
  const [ searchText, setSearchText ] = useState("");
  const [ showSearchBar, setShowSearchBar ] = useState(false);

  const getGeocodesFromCityName = async () => {
    try {
      const data = await fetchGeocodesFromLocation("Kathmandu");
      console.log("Function Definition part: ", data?.location);
      if (data) return data?.location;
    } catch (err) {
      console.log("Error from Select Location: ", err);
    }
  }

  useEffect(() => {
    // getGeocodesFromCityName();
  }, [])

  const { updateLocation } = useLocation();

  const locationsRef = collection(FIREBASE_DB, "locations");

  const getLocationList = async () => {
    try {
      const data = await getDocs(locationsRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), 
        id: doc.id
      }))
      setUsersFavouriteLocations(filteredData);
    } catch (err) {
      console.log("Error while fetching locations: ", err);
    }
  }

  useEffect(() => {
    getLocationList();
  }, []);

  //need to add user id later
  const onAddFavouriteCity = async () => {
    try {
      const locationData = await getGeocodesFromCityName();
      console.log("Location Data: ", locationData);
      await addDoc(locationsRef, {
        locationTitle: searchText,
        latitude: locationData.lat,
        longitude: locationData.lng,
      })
    } catch (err) {
      console.log("Error while adding city: ", err);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <Header navigation={navigation} />
      {showSearchBar && (
        <View style={styles.inputFieldContainer}>
          <TextInput 
            value={searchText}
            onChangeText={searchString => setSearchText(searchString)}
            placeholder='Add city to favourites list'
            style={styles.inputField}
          />
          <TouchableOpacity
            onPress={onAddFavouriteCity}
          >
            <Iconify 
              iconName="check"
              iconsFrom="Feather"
              color={colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowSearchBar(false)}
          >
            <Iconify 
              iconName="cross"
              iconsFrom="Entypo"
              color={colors.failed}
            />
          </TouchableOpacity>
        </View>
      )}
      {usersFavouriteLocations ? (
        <View style={styles.listContainer}>
          <ScrollView>
            {usersFavouriteLocations.map((favouriteLocation, index) => (
              <TouchableOpacity onPress={() => {
                updateLocation(favouriteLocation.latitude, favouriteLocation.longitude)
                navigation.navigate("Home")
              }} 
              style={styles.locationContainer}
              key={index}
              >
                <Iconify iconsFrom="FontAwesome" iconName="location-arrow" color="#fff" />
                <Text style={styles.locationTitle}>{favouriteLocation.locationTitle}</Text>
                <TouchableOpacity>
                  <Iconify iconsFrom="Entypo" iconName="cross" color="#fff" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null}
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => setShowSearchBar(true)}
      >
        <Iconify 
          iconName="plus"
          iconsFrom="Feather"
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  )
}

export default SelectLocation

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 15,
    flex: 1 
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  inputField: {
    flexGrow: 2,
    padding: 5,
    borderRadius: 5,
    borderColor: colors.primary,
    borderWidth: 2
  },
  listContainer: {
  },
  locationContainer: {
    marginBottom: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 500,
    color: "#fff"
  },
  floatingButton: {
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30
  }
})