import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StatusBar} from 'react-native';

export default function FreechargeHome({navigation}) {
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate('FreechargeProfile')}>
          {/* <Icon name="person-circle-outline" size={32} color="#000" /> */}
          <Image
            source={require('../../assets/icons/user-rounded.png')}
            style={{width: 30, height: 30, marginRight: 5}}
          />
        </TouchableOpacity>

        <View style={styles.topIcons}>
          <Icon
            name="search-outline"
            size={26}
            color="#000"
            style={{marginRight: 20}}
          />
          <Icon name="notifications-outline" size={26} color="#000" />
        </View>
      </View>

      <ScrollView
        style={[styles.container, {paddingTop: 60}]}
        showsVerticalScrollIndicator={false}>
        {/* ---------- TOP BAR ---------- */}
        {/* <View style={styles.topBar}>
        <TouchableOpacity>
          <Icon name="person-circle-outline" size={32} color="#000" />
        </TouchableOpacity>

        <View style={styles.topIcons}>
          <Icon
            name="search-outline"
            size={26}
            color="#000"
            style={{marginRight: 20}}
          />
          <Icon name="notifications-outline" size={26} color="#000" />
        </View>
      </View> */}

        {/* ---------- MAIN BANNER ---------- */}
        <Image source={require('../../assets/2.png')} style={styles.banner} />

        {/* ---------- MONEY TRANSFER CARD ---------- */}
        <View style={styles.whiteCard}>
          {/* Title */}
          <View style={styles.moneyHeader}>
            <Text style={styles.moneyTitle}>Money Transfer</Text>
            <Image
              source={require('../../assets/icons/powered_by_upi.png')}
              style={{width: 40, height: 20, marginLeft: 6}}
            />
            <Icon
              name="ellipsis-vertical"
              size={18}
              color="#9a9a9a"
              style={{marginLeft: 'auto'}}
            />
          </View>

          {/* Top Icons Row */}
          <View style={styles.moneyRow}>
            {/* <MoneyItem icon="qr-code-outline" label="Scan QR" /> */}
            {/* <MoneyItem icon="send-outline" label="UPI ID/Mobile" /> */}
            <MoneyItem icon="qrcode-scan" label="Scan QR" />
            <MoneyItem
              icon={require('../../assets/icons/upi.png')}
              type="img"
              label="UPI ID/Mobile"
            />
            <MoneyItem
              icon={require('../../assets/icons/balance.png')}
              type="img"
              label="UPI ID/Mobile"
            />
            {/* <MoneyItem icon="wallet-outline" label="Check Balance" /> */}
            <MoneyItem icon="home-outline" label="To Bank/Self" />
          </View>

          {/* Input Box */}
          <View style={styles.searchBox}>
            <Icon name="person-outline" size={16} color="#999" />
            <TextInput
              placeholder="Pay to Contacts, Phone No or UPI ID"
              placeholderTextColor="#777"
              style={{marginLeft: 6, flex: 1, paddingVertical: 1, fontSize: 12}}
            />
          </View>

          {/* UPI Activation */}
          {/* <Text style={styles.activateText}>
          Start making payments:{' '}
          <Text style={styles.linkText}>Activate UPI</Text>
        </Text> */}

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.activateText}>6000892709@freecharge:</Text>
            <Text style={[styles.linkText, {marginLeft: 4, marginTop: 12}]}>
              <Icon name="copy-outline" size={18} />
            </Text>
          </View>

          {/* RuPay Card Strip */}
          {/* <View style={styles.rupayStrip}>
          <Text style={{fontSize: 13}}>
            Rupay Credit Card - Pay with UPI PIN
          </Text>
          <Text style={styles.linkText}>LINK</Text>
        </View> */}
          <View style={styles.rupayStrip}>
            <Image
              source={require('../../assets/icons/upi_lite.png')}
              style={{width: 20, height: 12, marginLeft: 6, marginTop: 4}}
            />
            <Text style={{fontSize: 13}}>PIN free payments</Text>
            <Text style={styles.linkText}>ACTIVE UPI LITE</Text>
          </View>
        </View>

        {/* ---------- KYC CARD ---------- */}
        {/* <View style={styles.kycCard}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="id-card-outline" size={32} color="#1977F3" />
          <View style={{marginLeft: 10}}>
            <Text style={styles.kycTitle}>Update your KYC</Text>
            <Text style={styles.kycSubtitle}>Takes less than 1 min</Text>
          </View>
        </View>
        <Icon name="chevron-forward-outline" size={22} color="#aaa" />
      </View> */}

        {/* ---------- BILL PAYMENTS ---------- */}
        <View style={styles.sectionHeader}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          
          <Text style={styles.sectionTitle}>Recharges & Bill Payments</Text>
          <Image source={require('../../assets/icons/pay_bill.png')} style={{width: 25, height: 25, marginLeft: 4}} />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
           <Image source={require('../../assets/icons/my_bill.png')} style={{width: 20, height: 20, marginRight: 4}} />
            <Text style={styles.sectionLink}>MY BILLS</Text>
          </View>
        </View>

        {/* Bill Items Grid */}
        <View style={styles.whiteCard}>
          <View style={styles.grid}>
            <BillItem label="Mobile Recharge" icon="phone-portrait-outline" />
            <BillItem label="Mobile Postpaid" icon="call-outline" />
            <BillItem label="Electricity" icon="bulb-outline" />
            <BillItem label="Pay Credit Card Bill" icon="card-outline" />
            <BillItem label="DTH" icon="tv-outline" />
            <BillItem label="Water" icon="water-outline" />
            <BillItem label="Broadband" icon="wifi-outline" />
            <BillItem label="Gas" icon="flame-outline" />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Credit Score & More</Text>
          {/* <Text style={styles.sectionLink}>MY BILLS</Text> */}
        </View>

        {/* Bill Items Grid */}
        <View style={styles.creditCard}>
          {/* Left Icon */}
          <View style={styles.iconWrapper}>
            <Image
              source={require('../../assets/icons/credit.png')}
              style={styles.creditIcon}
            />
          </View>

          {/* Middle Text */}
          <View style={styles.textWrapper}>
            <Text style={styles.title}>Free Credit Score</Text>
            <Text style={styles.subtitle}>Get insights to improve</Text>
            <Text style={styles.subtitle}>Credit score!</Text>
          </View>

          {/* Right Button */}
          <TouchableOpacity style={styles.checkBtn}>
            <Text style={styles.checkBtnText}>Check Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Credit Score & More</Text>
          {/* <Text style={styles.sectionLink}>MY BILLS</Text> */}
        </View>
        <View style={styles.spotlight}>
          <Image
            source={require('../../assets/spotlight.png')}
            style={{width: 160, height: 200}}
          />
          <Image
            source={require('../../assets/spotlight.png')}
            style={{width: 160, height: 200}}
          />
          <Image
            source={require('../../assets/spotlight.png')}
            style={{width: 160, height: 200}}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured</Text>
          {/* <Text style={styles.sectionLink}>MY BILLS</Text> */}
        </View>
        <View style={styles.spotlight}>
          <Image
            source={require('../../assets/featured.png')}
            style={{width: '100%', height: 200}}
          />
        </View>

        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text style={styles.heading}>Quick Links</Text>

          <View style={styles.card}>
            {/* Row 1 */}
            <TouchableOpacity
              style={styles.row}
              onPress={() => navigation.navigate('Transactions')}>
              <Image
                source={require('../../assets/icons/transaction.png')}
                style={{width: 20, height: 20, marginRight: 10}}
              />
              <Text style={styles.rowText}>My Transactions</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Row 2 */}
            <TouchableOpacity style={styles.row}>
              <Image
                source={require('../../assets/icons/help.png')}
                style={{width: 20, height: 20, marginRight: 10}}
              />
              <Text style={styles.rowText}>Need Help?</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Row 3 */}
            <TouchableOpacity style={styles.row}>
              <Image
                source={require('../../assets/icons/upi_small.png')}
                style={{width: 30, height: 10, marginRight: 10}}
              />
              <Text style={styles.rowText}>How to Use UPI Safely?</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={{textAlign: 'center', marginTop: 20, fontSize: 9}}>
            Freecharge balance account prepaid payment instrument
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 9}}>issued by</Text>
            <Image
              source={require('../../assets/axis.png')}
              style={{width: 80, height: 15}}
            />
          </View>
        </View>

        <View style={{height: 120}} />
      </ScrollView>
    </>
  );
}

/* --------------------------------
        COMPONENTS
---------------------------------- */

// const MoneyItem = ({icon, label}) => (
//   <TouchableOpacity style={styles.moneyItem}>
//     <Icon name={icon} size={26} color="#E53E29" />
//     <Text style={styles.moneyLabel}>{label}</Text>
//   </TouchableOpacity>
// );

const MoneyItem = ({icon, label, type}) => (
  <TouchableOpacity style={styles.moneyItem}>
    <View style={styles.iconShadow}>
      {/* <Icon name={icon} size={26} color="#E53E29" /> */}

      {type === 'img' ? (
        <Image
          source={icon}
          style={{
            width: 32,
            height: 32,
            // marginTop: 0, // push icon downward
          }}
        />
      ) : (
        <MaterialCommunityIcons
          name={icon}
          color="#E53E29"
          size={32}
          style={{
            marginTop: 0, // push icon downward
          }}
        />
      )}
    </View>
    <Text style={styles.moneyLabel}>{label}</Text>
  </TouchableOpacity>
);

const BillItem = ({icon, label}) => (
  <TouchableOpacity style={styles.billItem}>
    <Icon name={icon} size={30} color="#FF5A36" />
    <Text style={styles.billLabel}>{label}</Text>
  </TouchableOpacity>
);

/* --------------------------------
         STYLES
---------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },

  heading: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {height: 3, width: 0},
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
  },

  icon: {
    width: 36,
    height: 16,
    marginRight: 12,
    // tintColor: '#E91E63', // same pink as FreeCharge (for first 2 icons)
  },

  rowText: {
    flex: 1,
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },

  arrow: {
    fontSize: 22,
    color: '#444',
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 54,
  },

  // ---- Top bar ----
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // Shadow
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {height: 2, width: 0},
  },

  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // ---- Banner ----
  banner: {
    width: '94%',
    height: 150,
    borderRadius: 14,
    alignSelf: 'center',
    marginTop: 15,
  },

  // ---- Money Transfer ----
  whiteCard: {
    backgroundColor: '#fff',
    marginTop: 12,
    marginHorizontal: 14,
    padding: 16,
    borderRadius: 18,
    elevation: 1,
  },
  moneyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  moneyTitle: {
    fontSize: 11,
    fontWeight: '700',
  },
  moneyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  moneyItem: {
    alignItems: 'center',
    width: '25%',
    // backgroundColor: 'gray',
  },
  moneyLabel: {
    fontSize: 10,
    marginTop: 6,
  },

  searchBox: {
    // backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 0,
    borderRadius: 26,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0033',
  },

  activateText: {
    marginTop: 10,
    fontSize: 13,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  linkText: {
    color: '#E53E29',
    fontWeight: '700',
  },

  rupayStrip: {
    // backgroundColor: '#EEF3FF',
    paddingTop: 10,
    marginTop: 12,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
    // justifyContent: 'space-between',
  },

  // ---- KYC ----
  kycCard: {
    backgroundColor: '#fff',
    marginHorizontal: 14,
    marginTop: 14,
    padding: 16,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kycTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  kycSubtitle: {
    fontSize: 12,
    color: '#666',
  },

  // ---- Section Header ----
  sectionHeader: {
    marginTop: 18,
    marginHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  sectionLink: {
    fontSize: 13,
    color: '#FF5A36',
    fontWeight: '700',
  },

  // ---- Grid ----
  grid: {
    // marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  billItem: {
    width: '25%',
    alignItems: 'center',
    marginVertical: 18,
  },
  billLabel: {
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
  iconShadow: {
    padding: 10,
    borderRadius: 10,
    // backgroundColor: '#F5F5F5',

    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 3,

    // Android Shadow
    // elevation: 4,

    backgroundColor: '#F5F5F5', // required for Android shadow to appear
  },

  creditCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
    elevation: 3, // shadow for Android
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    marginHorizontal: 16,
    marginTop: 10,
  },

  iconWrapper: {
    backgroundColor: '#FFF2E4',
    padding: 12,
    borderRadius: 12,
    marginRight: 14,
  },

  creditIcon: {
    width: 40,
    height: 40,
    // tintColor: '#FF8552', // matches FreeCharge soft orange
  },

  textWrapper: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  subtitle: {
    fontSize: 13,
    color: '#555',
    marginTop: 1,
  },

  checkBtn: {
    borderWidth: 1,
    borderColor: '#FF8552',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  checkBtnText: {
    color: '#FF8552',
    fontWeight: '600',
  },

  spotlight: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#fff',
    padding: 5,
    borderRadius: 16,
    // elevation: 3, // shadow for Android
    // shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    marginHorizontal: 6,
    marginTop: 10,
  },
});
