import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {GlobalStyles} from '../../styles/GlobalStyles';
// import {clearCart} from '../../redux/slices/cartSlice'; // optional
// import { orderApi } from '../../helper/product';
import {orderApi} from '../../api/services/product';
import {clearCart} from '../../redux/slices/cartSlice';

import {printReceipt} from '../../utils/printer';
import {thermalReceiptTemplate} from '../../helper/thermalReceiptTemplate';

const CheckoutScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  // Cart data
  const cartItems = useSelector(state => state.cart.items);

  // Billing data (passed from BillingScreen)
  const {subtotal, tax, discount, total} = route.params;

  // Local states
  const [phone, setPhone] = useState('');
  const [paymentType, setPaymentType] = useState('cash'); // default cash
  const [loading, setLoading] = useState(false);
  const [credit, setCredit] = useState(0);
  const [paidAmount, setPaidAmount] = useState(total);

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart is empty');
      return;
    }

    const payload = {
      customer_phone: phone || null,
      payment_type: paymentType, // cash | online
      //   items: cartItems,
      items: cartItems.map(item => ({
        product: item._id, // ✅ REQUIRED
        quantity: item.qty, // ✅ REQUIRED
        price: item.sellingPrice, // ✅ REQUIRED
      })),
      subtotal,
      tax,
      discount,
      total,
      paidAmount,
      credit: total - paidAmount,
      created_at: new Date(),
    };

    try {
      setLoading(true);

      // 🔴 Replace with your API call
      console.log('ORDER PAYLOAD =>', payload);

      const res = await orderApi(payload);
      console.log('ORDER RESPONSE =>', res.data.order.items);

      let order = res.data.order;
      const orderData = {
        order_id: order.order_id,
        // items: order.items.map(i => ({
        //   name: i.product?.name || 'Item',
        //   quantity: i.quantity,
        //   price: i.price,
        // })),
        items: cartItems.map(item => ({
          product: item._id, // ✅ REQUIRED
          name: item.name, // ✅ REQUIRED
          quantity: item.qty, // ✅ REQUIRED
          price: item.sellingPrice, // ✅ REQUIRED
        })),
        subtotal: order.subtotal,
        discount: order.discount,
        tax: order.tax,
        total: order.total,
        payment_type: order.payment_type,
      };

// console.log('ORDER DATA =>', orderData);
//       return;
      /*
      await api.post('/orders', payload);
      dispatch(clearCart());
      */

      const text = thermalReceiptTemplate(orderData);
      console.log(JSON.stringify(text));
      const result = await printReceipt(text);
      console.log('PRINT RESULT =>', result);

      dispatch(clearCart());

      Alert.alert('Success', 'Order placed successfully');

      // navigation.popToTop(); // or navigate to Orders screen

      navigation.navigate('OrderDetailsScreen', {order: res.data.order})


    } catch (err) {
      console.log('ORDER ERROR =>', err);
      if (err.status === 401) {
        Alert.alert(
          'Error',
          'Failed to place order, auth issue, re login and try again',
        );

        return;
      }
      Alert.alert('Error', 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const handleCredit = amount => {
    if (credit > total) {
      Alert.alert('Error', 'Credit amount should be less than total amount');
      return;
    }
    setCredit(amount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      {/* Phone Number */}
      <View style={styles.section}>
        <Text style={styles.label}>Customer Contact (Optional)</Text>
        <TextInput
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />
      </View>

      {/* Payment Type */}
      <View style={styles.section}>
        <Text style={styles.label}>Payment Method</Text>

        <View style={styles.paymentRow}>
          <TouchableOpacity
            style={[
              styles.paymentBtn,
              paymentType === 'cash' && styles.paymentActive,
            ]}
            onPress={() => setPaymentType('cash')}>
            <Text
              style={[
                styles.paymentText,
                paymentType === 'cash' && styles.paymentTextActive,
              ]}>
              Cash
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentBtn,
              paymentType === 'online' && styles.paymentActive,
            ]}
            onPress={() => setPaymentType('online')}>
            <Text
              style={[
                styles.paymentText,
                paymentType === 'online' && styles.paymentTextActive,
              ]}>
              Online
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentBtn,
              paymentType === 'credit' && styles.paymentActive,
            ]}
            onPress={() => setPaymentType('credit')}>
            <Text
              style={[
                styles.paymentText,
                paymentType === 'credit' && styles.paymentTextActive,
              ]}>
              Credit
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.summaryBox}>
        <View style={styles.row}>
          <Text>Subtotal</Text>
          <Text>₹{subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text>Discount</Text>
          <Text>₹{discount.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text>Tax</Text>
          <Text>₹{tax.toFixed(2)}</Text>
        </View>

        {paymentType === 'credit' && (
          <View style={styles.row}>
            <Text style={styles.total}>Paid now</Text>
            <TextInput
              placeholder="amount"
              keyboardType="phone-pad"
              value={paidAmount}
              onChangeText={setPaidAmount}
              style={styles.input}
            />
          </View>
        )}

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.total}>Total {total}</Text>
          <Text style={styles.total}>₹{total.toFixed(2)}</Text>
        </View>

        {paymentType === 'credit' && (
          <View style={styles.row}>
            <Text style={styles.credit}>Credit</Text>
            <Text style={styles.credit}>-₹{total.toFixed(2) - paidAmount}</Text>
          </View>
        )}
      </View>

      {/* Place Order */}
      <TouchableOpacity
        disabled={loading}
        style={[
          styles.placeBtn,
          GlobalStyles.primaryButton,
          loading && styles.disabledBtn,
        ]}
        onPress={placeOrder}>
        <Text style={styles.placeText}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </Text>
      </TouchableOpacity>
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
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  paymentRow: {
    flexDirection: 'row',
    gap: 10,
  },
  paymentBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  paymentActive: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  paymentText: {
    fontWeight: '600',
  },
  paymentTextActive: {
    color: '#fff',
  },
  summaryBox: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
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
  total: {
    color: '#2E7D32',
    fontSize: 16,
    fontWeight: '700',
  },
  placeBtn: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  placeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  credit: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledBtn: {
    backgroundColor: '#ccc',
  },
});

export default CheckoutScreen;
