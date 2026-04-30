import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';
import {GlobalStyles} from '../../styles/GlobalStyles';
import BarcodeScannerModal from '../../components/BarcodeScannerModal';
import {useDispatch} from 'react-redux';
import {updateQty, removeFromCart, clearCart} from '../../redux/slices/cartSlice';

const BillingScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [showScanner, setShowScanner] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [tempQty, setTempQty] = useState('');
  const [discount, setDiscount] = useState(0);
  const [taxPercentage, setTaxPercentage] = useState(0);

  const cartItems = useSelector(state => state.cart.items);
  const [showRemoveFor, setShowRemoveFor] = useState(null);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.sellingPrice * item.qty,
    0,
  );

  const tax = subtotal * (taxPercentage / 100);
  const total = Math.max(subtotal - discount + tax, 0);

  const gotoScanData = code => {
    console.log('scan code here ==>> ', code);
    navigation.navigate('ScanData', {
      code: code,
    });
  };


  const renderItem = ({item}) => (
    <View style={styles.itemRow}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.itemName}
        onPress={() =>
          setShowRemoveFor(prev => (prev === item._id ? null : item._id))
        }>
        <Text style={styles.itemName}>
          {item.name} / {item.sellingPrice}{' '}
        </Text>
      </TouchableOpacity>

      {/* Quantity Control */}
      <View style={styles.qtyBox}>
        {/* Minus */}
        <TouchableOpacity
          disabled={item.qty === 1}
          style={styles.qtyBtn}
          onPress={() => {
            if (item.qty === 1) {
              dispatch(removeFromCart(item._id));
            } else {
              dispatch(updateQty({_id: item._id, qty: item.qty - 1}));
            }
          }}>
          <Text style={styles.qtyText}>−</Text>
        </TouchableOpacity>

        {/* Qty Display / Input */}
        {editingId === item._id ? (
          <TextInput
            value={tempQty}
            autoFocus
            keyboardType="number-pad"
            style={styles.qtyInput}
            onChangeText={setTempQty}
            onBlur={() => {
              const newQty = parseInt(tempQty, 10);
              if (newQty > 0) {
                dispatch(updateQty({_id: item._id, qty: newQty}));
              }
              setEditingId(null);
            }}
            onSubmitEditing={() => {
              const newQty = parseInt(tempQty, 10);
              if (newQty > 0) {
                dispatch(updateQty({_id: item._id, qty: newQty}));
              }
              setEditingId(null);
            }}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              setEditingId(item._id);
              setTempQty(String(item.qty));
            }}>
            <Text style={styles.qtyValue}>{item.qty}</Text>
          </TouchableOpacity>
        )}

        {/* Plus */}
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() =>
            dispatch(updateQty({_id: item._id, qty: item.qty + 1}))
          }>
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.itemPrice}>
        ₹{(item.sellingPrice * item.qty).toFixed(2)}
      </Text>

      {showRemoveFor === item._id && (
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => {
            dispatch(removeFromCart(item._id));
            setShowRemoveFor(null);
          }}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      )}
    </View>
    // </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.header}>Billing Summary</Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(clearCart());
            navigation.navigate('Home');
          }}>
          <Text style={{color: '#f70a0a', fontWeight: '600'}}>
           X Cancel Order
          </Text>
        </TouchableOpacity>
      </View>
      {/* <Text style={styles.header}>Billing Summary</Text>
      <Text style={styles.header}>Billing Summary</Text> */}

      {/* Items */}
      <FlatList
        data={cartItems}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items in cart</Text>
        }
      />

      {/* Summary */}
      <View style={styles.summaryBox}>
        <View style={styles.row}>
          <Text>Subtotal</Text>
          <Text>₹{subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.row}>
          <Text>Tax</Text>

          <View style={styles.taxRow}>
            <TextInput
              value={String(taxPercentage)}
              keyboardType="number-pad"
              placeholder="0"
              style={styles.taxInput}
              onChangeText={val => {
                const percent = parseFloat(val) || 0;
                setTaxPercentage(percent);
              }}
            />
            <Text style={styles.taxPercent}>%</Text>
            <Text style={styles.taxAmount}>₹{tax.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text>Discount</Text>

          <TextInput
            value={String(discount)}
            keyboardType="number-pad"
            placeholder="0"
            style={styles.discountInput}
            onChangeText={val => {
              const d = parseFloat(val) || 0;
              setDiscount(d);
            }}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>₹{total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => setShowScanner(true)}
        style={[
          styles.checkoutBtn,
          cartItems.length === 0
            ? styles.disabledBtn
            : GlobalStyles.secondaryButton,
        ]}>
        <Text style={styles.checkoutText}>+ Add More</Text>
      </TouchableOpacity>

      {/* Checkout */}
      <TouchableOpacity
        disabled={cartItems.length === 0}
        onPress={() =>
          navigation.navigate('CheckoutScreen', {
            subtotal,
            tax,
            discount,
            total,
          })
        }
        style={[
          styles.checkoutBtn,
          cartItems.length === 0
            ? styles.disabledBtn
            : GlobalStyles.primaryButton,
        ]}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>

      <BarcodeScannerModal
        visible={showScanner}
        onClose={() => setShowScanner(false)}
        onScan={code => gotoScanData(code)}
        navigation={navigation}
        homeBtn={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  itemName: {
    flex: 1,
  },
  itemQty: {
    width: 40,
    textAlign: 'center',
  },
  itemPrice: {
    width: 80,
    textAlign: 'right',
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },
  summaryBox: {
    marginTop: 20,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
  },
  checkoutBtn: {
    marginTop: 20,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: '#ccc',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyText: {
    fontSize: 18,
    fontWeight: '600',
  },

  qtyValue: {
    marginHorizontal: 8,
    minWidth: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyText: {
    fontSize: 18,
    fontWeight: '600',
  },

  qtyValue: {
    marginHorizontal: 8,
    minWidth: 24,
    textAlign: 'center',
    fontWeight: '600',
  },

  qtyInput: {
    marginHorizontal: 6,
    width: 40,
    height: 32,
    padding: 0,
    borderBottomWidth: 1,
    borderColor: '#2E7D32',
    textAlign: 'center',
    fontWeight: '600',
  },
  removeBtn: {
    position: 'absolute',
    right: 0,
    top: '100%',
    marginTop: 6,
    backgroundColor: '#D32F2F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    zIndex: 10,
  },

  removeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },

  discountInput: {
    width: 80,
    height: 32,
    borderBottomWidth: 1,
    borderColor: '#888',
    textAlign: 'right',
    padding: 0,
    fontWeight: '500',
  },
  taxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  taxInput: {
    width: 50,
    height: 32,
    borderBottomWidth: 1,
    borderColor: '#888',
    textAlign: 'right',
    padding: 0,
    fontWeight: '500',
    marginRight: 6,
  },
  taxPercent: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 12,
  },
  taxAmount: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default BillingScreen;
