import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FreechargeProfile({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <StatusBar backgroundColor="#fff" barStyle="dark-content" /> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FF5A36',
          paddingTop: 10,
          paddingLeft: 10,
        }}>
        <TouchableOpacity
          style={{marginBottom: 15}}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Icon name="chevron-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account</Text>
      </View>
      {/* --------- SCROLL CONTENT --------- */}
      <ScrollView style={{marginTop: 0}}>
        {/* --------- ORANGE HEADER --------- */}
        <View style={styles.header}>
          {/* USER SECTION */}
          <View style={styles.userRow}>
            <View style={styles.userCircle}>
              <Text style={styles.userInitials}>MA</Text>
            </View>

            <View style={{marginLeft: 12}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.userName}>Mujaddid Md Akbar</Text>
                <Icon
                  name="checkmark-circle"
                  size={18}
                  color="#fff"
                  style={{marginLeft: 5}}
                />
              </View>

              <Text style={styles.userPhone}>+91 6000892709</Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.userUpi}>
                  UPI ID : 6000892709@freecharge
                </Text>
                <Icon name="copy-outline" color="#fff" size={16} />
              </View>
            </View>
          </View>
        </View>

        {/* --------- FLOATING MENU --------- */}
        <View style={styles.floatingCard}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('EditProfile')}>
            <MaterialCommunityIcons
              name="account-outline"
              size={30}
              color="#E53E29"
            />
            <Text style={styles.menuLabel}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('QRcode')}>
            <MaterialCommunityIcons name="qrcode" size={30} color="#E53E29" />
            <Text style={styles.menuLabel}>My QR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons
              name="credit-card-outline"
              size={30}
              color="#E53E29"
            />
            <Text style={styles.menuLabel}>Manage UPI</Text>
          </TouchableOpacity>
        </View>
        {profileRow(
          'My Transactions',
          'View all your payments with details',
          'Transactions',
          navigation,
          require('../../assets/icons/transaction.png'),
        )}
        {profileRow(
          'UPI Payment Requests',
          'View all your pending requests',
          'Transactions',
          navigation,
          require('../../assets/icons/upi_payment.png'),
        )}
        {profileRow(
          'Payment Settings',
          'Add bank accounts, save cards and KYC',
          'Transactions',
          navigation,
          require('../../assets/icons/payment_setting.png'),
        )}
        {profileRow(
          'Wallet',
          'Use for recharges and bill payments',
          'Transactions',
          navigation,
          require('../../assets/icons/wallet.png'),
        )}
        {profileRow(
          'Cashback & Rewards',
          'Get cashbacks and vouchers',
          'Transactions',
          navigation,
          require('../../assets/icons/cashback.png'),
        )}
        {profileRow(
          'Privacy & Security',
          'Set reminders, app lock & more',
          'Transactions',
          navigation,
          require('../../assets/icons/privacy.png'),
        )}
        {profileRow(
          'Help and Support',
          'Connect with us for any query',
          'Transactions',
          navigation,
          require('../../assets/icons/support.png'),
        )}
        {profileRow(
          'Fraud Awareness',
          'Stay safe from scams',
          'Transactions',
          navigation,
          require('../../assets/icons/awarness.png'),
        )}

        <View>
          <View style={styles.logoutRow}>
            <TouchableOpacity
              style={styles.logoutButton}
              //   onPress={() => navigation.navigate('Login')}
            >
              <Image
                source={require('../../assets/icons/logout.png')}
                style={{width: 20, height: 20, marginRight: 5}}
              />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            <View>
                <Text style={{fontSize: 12}}>Version 20.18.0</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

/* --------- REUSABLE ROW --------- */
const profileRow = (title, subtitle, route, navigation, icon) => (
  <TouchableOpacity
    style={styles.listRow}
    onPress={() => navigation.navigate(route)}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image source={icon} style={{width: 25, height: 25, marginRight: 10}} />
      <View>
        <Text style={styles.listTitle}>{title}</Text>
        <Text style={styles.listSubtitle}>{subtitle}</Text>
      </View>
    </View>
    <Icon name="chevron-forward" size={20} color="#888" />
  </TouchableOpacity>
);

/* --------- STYLES --------- */
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FF5A36',
    paddingTop: 10,
    paddingBottom: 95,
    paddingHorizontal: 16,
    marginBottom: 50,
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    fontWeight: '700',
    marginLeft: 10,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FF9A76',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInitials: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  userName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  userPhone: {
    fontSize: 13,
    color: '#fff',
    marginTop: 2,
  },
  userUpi: {
    fontSize: 13,
    color: '#fff',
    marginRight: 6,
  },

  floatingCard: {
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '85%',
    alignSelf: 'center',
    top: 120,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 12,
    marginTop: 4,
  },

  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  listTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  listSubtitle: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },
  logoutRow: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  logoutButton: {
    // backgroundColor: '#FF5A36',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 15,
    color: '#FF5A36',
    // fontWeight: '700',
  },
});
