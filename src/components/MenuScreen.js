import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  useColorScheme,
} from 'react-native';
import {GlobalStyles} from '../../styles/GlobalStyles';
import {checkInternetConnection, getPendingOrders} from '../utils/offlineSync';
import { AuthContext } from '../context/AuthContext';
import {Linking} from 'react-native';
import {FRONT_URL} from '@env';

const MenuScreen = ({navigation}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [isOnline, setIsOnline] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const {logout} = useContext(AuthContext);
  const MenuItem = ({label, onPress, danger}) => (
    <TouchableOpacity
      style={[
        styles.menuItem,
        danger && styles.dangerItem,
        isDarkMode && styles.menuItemDark,
        danger && isDarkMode && styles.dangerItemDark,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.menuText,
          danger && styles.dangerText,
          isDarkMode && styles.menuTextDark,
          danger && isDarkMode && styles.dangerTextDark,
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

  useEffect(() => {
    const loadStatus = async () => {
      const online = await checkInternetConnection();
      const pending = await getPendingOrders();
      setIsOnline(online);
      setPendingCount(pending.length);
    };
    loadStatus();
  }, []);

  const redirectToAdd = () => {
    // const url = `http://192.168.31.215:3000/addProduct?code=${loadCode}`;
    const url = `${FRONT_URL}/addProduct`;

    Linking.openURL(url).catch(err =>
      console.error('Failed to open URL:', err),
    );
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.header, isDarkMode && styles.textDark]}>Menu</Text>

      <View style={[styles.card, isDarkMode && styles.cardDark]}>
        <MenuItem
          label="Profile"
          onPress={() => navigation.navigate('Profile')}
        />

        
        <MenuItem
          label="All Orders"
          onPress={() => navigation.navigate('OrdersScreen')}
        />

        <MenuItem
          label={`Sync Status ${isOnline ? '🟢' : '🔴'} (${pendingCount} pending)`}
          onPress={() => navigation.navigate('SyncStatusScreen')}
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

      <View style={[styles.card, isDarkMode && styles.cardDark]}>
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
    containerDark: {
      backgroundColor: '#121212',
    },
    textDark: {
      color: '#e2e2e2',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 12,
      marginBottom: 16,
      overflow: 'hidden',
      elevation: 2,
    },
    cardDark: {
      backgroundColor: '#1f1f1f',
      shadowColor: '#000',
    },
    menuItem: {
      paddingVertical: 16,
      paddingHorizontal: 18,
      borderBottomWidth: 0.5,
      borderColor: '#eee',
    },
    menuItemDark: {
      borderColor: '#444',
    },
    menuText: {
      fontSize: 16,
      fontWeight: '500',
    },
    menuTextDark: {
      color: '#e2e2e2',
    },
    dangerItem: {
      backgroundColor: '#fff5f5',
    },
    dangerItemDark: {
      backgroundColor: '#331212',
    },
    dangerText: {
      color: '#D32F2F',
      fontWeight: '600',
    },
    dangerTextDark: {
      color: '#ff8a80',
    },
  });
  

export default MenuScreen;
