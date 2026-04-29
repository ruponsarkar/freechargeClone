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

import BarcodeScannerModal from '../components/BarcodeScannerModal';
import OrdersScreen from '../screens/orders';
import MenuScreen from '../components/MenuScreen';

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


const MenuNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{headerShown: false, gestureStart: true, title: 'Menu'}}
      />
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{headerShown: false, gestureStart: true, title: 'OrdersScreen'}}
      />


    </Stack.Navigator>
  );
};

function TabNav({ navigation }) {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);

  const gotoScanData = (code) => {
    navigation.navigate('ScanData', {
      code: code,
    });
  };

  return (
    <>
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
          component={View} // dummy
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="qrcode-scan"
                color="#fff"
                size={30}
                style={{ paddingTop: 10 }}
              />
            ),
            tabBarButton: props => (
              <CustomTabButton
                {...props}
                onPress={() => setShowScanner(true)} // 🔥 OPEN MODAL
              />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={MenuNav}
          options={{
            tabBarLabel: 'Menu',
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

      <BarcodeScannerModal
        visible={showScanner}
        onClose={() => setShowScanner(false)}
        onScan={code => {
          setScannedCode(code);
          setShowScanner(false);
          console.log('Scanned:', code);
          gotoScanData(code);

          // OPTIONAL: navigate somewhere
          // navigation.navigate('ScanData', { code });
        }}
      />
    </>
  );
}

export default TabNav;
