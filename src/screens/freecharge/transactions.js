import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Transactions({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <ScrollView style={{paddingHorizontal: 16}}>
        {/* ---------- HEADER ---------- */}
        <TouchableOpacity
          style={styles.headerRow}
          onPress={() => navigation.navigate('FreechargeProfile')}>
          <Icon name="chevron-back" size={26} color="#000" />
          <Text style={styles.headerTitle}>Transactions & Balances</Text>
        </TouchableOpacity>

        {/* ---------- UPI ID BOX ---------- */}
        <View style={styles.upiBox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/icons/upi.png')}
              style={{width: 12, height: 12, marginRight: 4}}
            />
            <Text style={styles.upiLabel}>UPI ID :</Text>
          </View>
          <Text style={styles.upiValue}>6000892709@freecharge</Text>
        </View>

        {/* ---------- WALLET BALANCE ---------- */}
        <View style={styles.sectionRow}>
          <View style={styles.sectionLeft}>
            <Image
              source={require('../../assets/icons/wallet_rounded.png')}
              style={{width: 32, height: 32, marginRight: 12}}
            />
            <Text style={styles.sectionTitle}>Wallet Balance</Text>
            <Icon
              name="chevron-down"
              size={18}
              color="#555"
              style={{marginLeft: 4}}
            />
          </View>

          <Text style={styles.amount}>₹0</Text>
        </View>

        <View style={styles.divider} />

        {/* ---------- UPI LITE ---------- */}
        <View style={styles.sectionRow}>
          <View style={styles.sectionLeft}>
            <Image
              source={require('../../assets/icons/upi_rounded.png')}
              style={{width: 38, height: 18, marginRight: 12}}
            />
            <View>
              <Text style={styles.sectionTitle}>UPI Lite</Text>
              <Text style={styles.sectionSubtitle}>
                Pay without PIN superfast
              </Text>
            </View>
          </View>

          <Text style={styles.actionText}>ACTIVATE</Text>
        </View>

        <View style={styles.divider} />

        {/* ---------- BANK ACCOUNT ---------- */}
        <View style={styles.sectionRow}>
          <View style={styles.sectionLeft}>
            <Image
              source={require('../../assets/icons/bank_rounded.png')}
              style={{width: 32, height: 32, marginRight: 12}}
            />
            <Text style={styles.sectionTitle}>Bank Account</Text>
          </View>

          <Text style={styles.actionText}>CHECK BALANCE</Text>
        </View>

        {/* ---------- PAYMENT HISTORY TITLE ---------- */}
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Payments History</Text>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="search-outline"
              size={22}
              color="#333"
              style={{marginRight: 16}}
            />
            <Icon name="filter-outline" size={22} color="#333" />
          </View>
        </View>

        {/* ---------- MONTH SEPARATOR ---------- */}
        <Text style={styles.monthText}>November 2025</Text>

        {/* ---------- TRANSACTION LIST ---------- */}
        {transactionItem(
          'Moksodul Islam Laskar',
          'Today, 12:41 PM',
          '- ₹500',
          'store',
          'PaidTo',
          navigation,
        )}
        {transactionItem(
          'Kamal Uddin',
          'Today, 11:37 AM',
          '- ₹50',
          'store',
          'PaidTo',
          navigation,
        )}
        {transactionItem(
          'Blue Dart Express Ltd',
          'Yesterday, 12:16 PM',
          '- ₹344',
          'store',
          'PaidTo',
          navigation,
        )}
      </ScrollView>
    </View>
  );
}

/* ---------- REUSABLE TRANSACTION ROW ---------- */
const transactionItem = (name, time, amount, icon, route, navigation) => (
  <TouchableOpacity
    style={styles.transRow}
    onPress={() => navigation.navigate(route)}>
    {/* Left Icon */}
    <View style={styles.transIcon}>
      <MaterialCommunityIcons
        name={icon === 'store' ? 'store-outline' : 'account-outline'}
        size={26}
        // color="#FF5A36"
      />
    </View>

    {/* Middle Info */}
    <View style={{flex: 1}}>
      <Text style={styles.transName}>Paid To {name}</Text>
      <Text style={styles.transTime}>{time}</Text>

      {/* <View style={{flexDirection: 'row', marginTop: 4}}>
        <Text style={styles.paidFrom}>Paid from </Text>
        <Image
          source={require('../../assets/icons/paid_from.png')}
          style={{width: 18, height: 10, marginTop: 3}}
        />
      </View> */}
    </View>

    {/* Amount */}
    <View>
      <Text style={styles.transAmount}>{amount}</Text>
      <View style={{flexDirection: 'row', marginTop: 4}}>
        <Text style={styles.paidFrom}>Paid from </Text>
        <Image
          source={require('../../assets/icons/paid_from.png')}
          style={{width: 18, height: 10, marginTop: 3}}
        />
      </View>
    </View>
  </TouchableOpacity>
);

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 6,
  },

  upiBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 4,
  },
  upiLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  upiValue: {
    fontSize: 14,
    fontWeight: '500',
  },

  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FF5A36',
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
  },

  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
    alignItems: 'center',
  },
  historyTitle: {
    fontSize: 17,
    fontWeight: '700',
  },

  monthText: {
    marginTop: 20,
    fontSize: 12,
    color: '#999',
    fontWeight: '700',
  },

  /* ------- Transaction Rows ------- */
  transRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  transIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF3ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  transName: {
    fontSize: 15,
    fontWeight: '600',
  },
  transTime: {
    marginTop: 4,
    color: '#555',
    fontSize: 12,
  },
  paidFrom: {
    fontSize: 12,
    color: '#777',
  },
  transAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    textAlign: 'right',
  },
});
