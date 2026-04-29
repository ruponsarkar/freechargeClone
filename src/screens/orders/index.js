import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {GlobalStyles} from '../../styles/GlobalStyles';
import { getAllOrders } from '../../api/services/product';


const OrdersScreen = ({navigation}) => {



  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchOrders();
  }, []);


  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
      console.log('response : ', response.data);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // const handleOrderDetails = (orderId) => {
  //   navigation.navigate('OrderDetails', {orderId});
  // };




  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        // later: navigation.navigate('OrderDetailsScreen', {orderId: item._id})
        onPress={() => navigation.navigate('OrderDetailsScreen', {order: item})}
      >
        <View style={styles.row}>
          <Text style={styles.orderId}>{item.order_id}</Text>
          <Text style={styles.amount}>₹{item.total}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.meta}>
            {new Date(item.createdAt).toLocaleString()}
          </Text>

          <Text
            // style={[
            //   styles.badge,
            //   item.payment_type === 'cash' ? styles.cash : styles.online,
            // ]}
            style={[
              styles.badge,
              item.payment_type === 'cash'
                ? styles.cash
                : item.payment_type === 'credit'
                ? styles.credit
                : styles.online,
            ]}
            >
            {item.payment_type.toUpperCase()}
              &nbsp;
              {item.payment_type === 'credit' && '-₹' + item.credit} 
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.status, item.status === 'paid' && styles.paid]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 20}}
        ListEmptyComponent={<Text style={styles.empty}>No orders found</Text>}
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
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  },
  orderId: {
    fontWeight: '600',
    fontSize: 15,
  },
  amount: {
    fontWeight: '700',
    fontSize: 15,
  },
  meta: {
    color: '#666',
    fontSize: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  cash: {
    backgroundColor: '#6D4C41',
  },
  online: {
    backgroundColor: '#1565C0',
  },
  credit: {
    backgroundColor: 'red',
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  paid: {
    color: '#2E7D32',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },
});

export default OrdersScreen;
