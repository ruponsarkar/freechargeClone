import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomePage from '../screens/home';
import Products from '../screens/products';
import GoogleMapsScreen from '../screens/googlemaps';
import Details from '../screens/details';
import Orders from '../screens/orders';
import Profile from '../screens/profile';
import Cart from '../screens/cart';

import FreechargeHome from '../screens/freecharge/home';
import CustomTabButton from './custom';
import FreechargeProfile from '../screens/freecharge/profile';
import EditProfile from '../screens/freecharge/editProfile';
import Transactions from '../screens/freecharge/transactions';
import PaidTo from '../screens/freecharge/paidTo';
import QRcode from '../screens/freecharge/qrcode';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={FreechargeHome}
        options={{headerShown: false, gestureStart: true, title: 'Home'}}
      />
      {/* <Stack.Screen
        name="FreechargeProfile"
        component={FreechargeProfile}
        options={{headerShown: false, gestureStart: true, title: 'Profile'}}
      /> */}
      {/* <Stack.Screen
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
      /> */}

      <Stack.Screen
        name="Products"
        component={Products}
        options={{headerShown: true, gestureStart: true, title: 'Products'}}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{headerShown: true, gestureStart: true, title: 'Details'}}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: true, gestureStart: true, title: 'Cart'}}
      />
    </Stack.Navigator>
  );
};

function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNav}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={'#FF6F00'} size={28} />
          ),
        }}
      />

      {/* Middle Floating Button */}
      <Tab.Screen
        name="ScanQR"
        component={Orders}
        options={{
          tabBarLabel: 'Scan QR',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              color="#fff"
              size={30}
              style={{
                marginTop: -2, // push icon downward
              }}
            />
          ),
          tabBarLabelStyle: {
            marginBottom: -20, // keep text close to icon
            fontSize: 12,
            color: '#000',
          },
          tabBarButton: props => <CustomTabButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Loans & Invest',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="check-decagram-outline"
              color={'gray'}
              size={28}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNav;
