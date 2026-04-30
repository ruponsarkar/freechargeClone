import React from 'react';
import {View, StyleSheet} from 'react-native';
import OrderReceipt from '../../components/OrderReceipt';

const OrderDetailsScreen = ({route, navigation}) => {
  const {order} = route.params;

  return (
    <View style={styles.container}>
      <OrderReceipt order={order} showPrint navigation={navigation} />
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
});
