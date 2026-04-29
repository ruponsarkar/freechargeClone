import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
// import RNPrint from 'react-native-print';
import {receiptHTML} from '../helper/receiptTemplate';
import {
  thermalReceiptTemplate,
  printBarcode,
} from '../helper/thermalReceiptTemplate';
// import {GlobalStyles} from '../styles/GlobalStyles';
import {GlobalStyles} from '../styles/GlobalStyles';

import {printReceipt} from '../utils/printer';

const OrderReceipt = ({order, showPrint = true}) => {
  const handlePrint = async () => {
    try {
      const orderData = {
        order_id: order.order_id,
        items: order.items.map(i => ({
          name: i.product?.name || 'Item',
          quantity: i.quantity,
          price: i.price,
        })),
        subtotal: order.subtotal,
        discount: order.discount,
        tax: order.tax,
        total: order.total,
        payment_type: order.payment_type,
      };

      // console.log('ORDER DATA =>', orderData);

      const text = thermalReceiptTemplate(orderData);
      // console.log(JSON.stringify(text));
      await printReceipt(text);

      // await MPTPrinter.print('66:32:86:E1:70:C6', text);

      // const barcode = printBarcode(order.order_id);
      // console.log('BARCODE =>', barcode);
      // await printReceipt(barcode);
    } catch (e) {
      console.log('Print error:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.orderId}>Order ID: {order.order_id}</Text>
      <Text style={styles.meta}>
        {new Date(order.createdAt).toLocaleString()}
      </Text>

      {/* ITEMS */}
      <FlatList
        data={order.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>
              {item.product?.name || 'Item'} x {item.quantity}
            </Text>
            <Text>₹{(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
      />

      <View style={styles.divider} />

      {/* SUMMARY */}
      <View style={styles.row}>
        <Text>Subtotal</Text>
        <Text>₹{order.subtotal.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text>Discount</Text>
        <Text>-₹{order.discount.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text>Tax</Text>
        <Text>₹{order.tax.toFixed(2)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.total}>Total</Text>
        <Text style={styles.total}>₹{order.total.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.total}>Paid</Text>
        <Text style={styles.total}>-₹{order.paidAmount.toFixed(2)}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.total}>To be paid</Text>
        <Text style={styles.total}>₹{order.credit.toFixed(2)}</Text>
      </View>

      <Text
        style={[
          styles.payment,
          order.payment_type === 'credit' && {color: 'red'},
        ]}>
        Payment: {order.payment_type.toUpperCase()}
      </Text>

      {showPrint && (
        <TouchableOpacity style={[styles.printBtn]} onPress={handlePrint}>
          <Text style={styles.printText}>Print Receipt</Text>
        </TouchableOpacity>
      )}
      {/* {showPrint && (
        <TouchableOpacity style={[styles.printBtn]} onPress={print}>
          <Text style={styles.printText}>Print Thermal</Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  orderId: {
    fontWeight: '600',
    fontSize: 16,
  },
  meta: {
    color: '#666',
    fontSize: 12,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  itemName: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  total: {
    fontSize: 16,
    fontWeight: '700',
  },
  payment: {
    marginTop: 10,
    fontWeight: '600',
  },
  printBtn: {
    marginTop: 16,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#2E7D32',
  },
  printText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default OrderReceipt;
