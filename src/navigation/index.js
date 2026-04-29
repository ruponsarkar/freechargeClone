// navigation/MainTabNavigator.js
import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import HomeStackNavigator from './HomeStackNavigator';
// import SettingsStackNavigator from './SettingsStackNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For tab icons
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FreechargeProfile from '../screens/freecharge/profile';
import EditProfile from '../screens/freecharge/editProfile';
import Transactions from '../screens/freecharge/transactions';
import PaidTo from '../screens/freecharge/paidTo';
import QRcode from '../screens/freecharge/qrcode';

import TabNav from './tabs';
import Details from '../screens/details';
import ScanData from '../screens/ScanData/ScanData';
import CartScreen from '../screens/cart';
import CheckoutScreen from '../screens/checkout';
import LoginScreen from '../screens/login';
import OrderDetailsScreen from '../screens/orders/OrderDetailsScreen';
import ConnectionScreen from '../screens/connections/connections';

const Stack = createNativeStackNavigator();

export default function MainTabNavigator() {
  return (
    // <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main Screen"
          options={{headerShown: false}}
          component={TabNav}
        />
        {/* <Stack.Screen name="Details" options={{ headerShown: false,}} component={Details} /> */}
        <Stack.Screen
          name="FreechargeProfile"
          component={FreechargeProfile}
          options={{headerShown: false, gestureStart: true, title: 'Profile'}}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false, gestureStart: true, title: 'Profile'}}
        />
        <Stack.Screen
          name="Transactions"
          component={Transactions}
          options={{headerShown: false, gestureStart: true, title: 'Profile'}}
        />
        <Stack.Screen
          name="PaidTo"
          component={PaidTo}
          options={{headerShown: false, gestureStart: true, title: 'Profile'}}
        />
        <Stack.Screen
          name="QRcode"
          component={QRcode}
          options={{headerShown: false, gestureStart: true, title: 'Profile'}}
        />
        <Stack.Screen
          name="ScanData"
          component={ScanData}
          options={{headerShown: false, gestureStart: true, title: 'ScanData'}}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{headerShown: false, gestureStart: true, title: 'CartScreen'}}
        />
        <Stack.Screen
          name="CheckoutScreen"
          component={CheckoutScreen}
          options={{headerShown: false, gestureStart: true, title: 'CheckoutScreen'}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false, gestureStart: true, title: 'LoginScreen'}}
        />
        <Stack.Screen
          name="OrderDetailsScreen"
          component={OrderDetailsScreen}
          options={{headerShown: false, gestureStart: true, title: 'OrderDetailsScreen'}}
        />
        <Stack.Screen
          name="ConnectionScreen"
          component={ConnectionScreen}
          options={{headerShown: false, gestureStart: true, title: 'ConnectionScreen'}}
        />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}
