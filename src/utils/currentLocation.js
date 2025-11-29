import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { GOOGLE_MAP_API_KEY } from '../config/constant';

// Function to request location permission
const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to provide better services.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission denied');
      }
    }
  } catch (err) {
    console.warn(err);
  }
};

// Function to get the address from coordinates using Google Maps Geocoding API
const getAddressFromCoordinates = async (latitude, longitude) => {
  const apiKey = GOOGLE_MAP_API_KEY; // Replace with your Google Maps API key
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
      return data.results[0].formatted_address; // Return the formatted address
    } else {
      return 'Address not found';
    }
  } catch (error) {
    console.error('Error fetching address: ', error);
    return 'Error fetching address';
  }
};

const MyComponent = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Request location permission when the component mounts
    requestLocationPermission();

    // Get the user's current location
    Geolocation.getCurrentPosition(
      async (position) => {
        // console.log('Position: ', position);
        setPosition(position);  // Save the position to state

        const { latitude, longitude } = position.coords;
        const fetchedAddress = await getAddressFromCoordinates(latitude, longitude);
        setAddress(fetchedAddress);  // Save the address to state
      },
      (error) => {
        Alert.alert('Error', 'Failed to get location: ' + error.message);
        console.error('Error: ', error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  // Return both the position and address
  return {
    position,
    address,
  };
};

export default MyComponent;
