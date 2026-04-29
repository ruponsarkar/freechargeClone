import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {GlobalStyles} from '../../styles/GlobalStyles';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import {Linking} from 'react-native';
import {API_URL, FRONT_URL} from '@env';

const MenuScreen = ({navigation}) => {

  const {logout} = useContext(AuthContext);
  const MenuItem = ({label, onPress, danger}) => (
    <TouchableOpacity
      style={[
        styles.menuItem,
        danger && styles.dangerItem,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.menuText,
          danger && styles.dangerText,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            // await AsyncStorage.clear();
            // navigation.replace('LoginScreen');
            logout();
          },
        },
      ],
    );
  };

  const redirectToAdd = () => {
    // const url = `http://192.168.31.215:3000/addProduct?code=${loadCode}`;
    const url = `${FRONT_URL}/addProduct`;

    Linking.openURL(url).catch(err =>
      console.error('Failed to open URL:', err),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu</Text>

      <View style={styles.card}>
        <MenuItem
          label="Profile"
          onPress={() => navigation.navigate('Profile')}
        />

        
        <MenuItem
          label="All Orders"
          onPress={() => navigation.navigate('OrdersScreen')}
        />

        <MenuItem
          label="Add Product"
          onPress={redirectToAdd}
        />

        <MenuItem
          label="Connections"
          onPress={() => navigation.navigate('ConnectionScreen')}
        />

        <MenuItem
          label="Terms & Conditions"
          onPress={() => navigation.navigate('Terms')}
        />
        <MenuItem
          label="Cart"
          onPress={() => navigation.navigate('CartScreen')}
        />
      </View>

      <View style={styles.card}>
        <MenuItem
          label="Logout"
          danger
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      padding: 16,
    },
    header: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 16,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 12,
      marginBottom: 16,
      overflow: 'hidden',
      elevation: 2,
    },
    menuItem: {
      paddingVertical: 16,
      paddingHorizontal: 18,
      borderBottomWidth: 0.5,
      borderColor: '#eee',
    },
    menuText: {
      fontSize: 16,
      fontWeight: '500',
    },
    dangerItem: {
      backgroundColor: '#fff5f5',
    },
    dangerText: {
      color: '#D32F2F',
      fontWeight: '600',
    },
  });
  

export default MenuScreen;
