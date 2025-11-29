import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

export default function MyOrders() {
  const orders = [
    {
      id: 1,
      restaurantName: 'Pizza Hut',
      deliveryTime: '30 mins',
      status: 'Delivered',
      items: '2x Margherita, 1x Coke',
      image: 'https://thebestoflkn.com/wp-content/uploads/2022/07/the-best-of-lkn-big-bitez-grill-20-most-popular-restaurants-cornelius-nc-2.jpg',
    },
    {
      id: 2,
      restaurantName: 'KFC',
      deliveryTime: '25 mins',
      status: 'In Progress',
      items: '1x Zinger Burger, 1x Fries',
      image: 'https://www.foodandwine.com/thmb/C0hb8-nwKbvO_ZfWuIfVN3AH77g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Most-Popular-Chain-Restaurants-in-America-FT-BLOG0605-16385776bca1440880bf0e4140b9793b.jpg',
    },
    // Add more orders here
  ];

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <Image source={{ uri: item.image }} style={styles.orderImage} />
      <View style={styles.orderInfo}>
        <Text style={styles.restaurantName}>{item.restaurantName}</Text>
        <Text style={styles.orderDetails}>Items: {item.items}</Text>
        <Text style={styles.orderDetails}>Delivery Time: {item.deliveryTime}</Text>
        <Text style={[styles.orderStatus, item.status === 'Delivered' ? styles.delivered : styles.inProgress]}>
          Status: {item.status}
        </Text>
        <View style={styles.actionButtons}>
          {item.status !== 'Delivered' && (
            <TouchableOpacity style={styles.trackButton}>
              <Text style={styles.buttonText}>Track Order</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.reorderButton}>
            <Text style={styles.buttonText}>Reorder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.pageTitle}>My Orders</Text> */}
      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={renderOrderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black'
  },
  orderCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  orderInfo: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDetails: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  delivered: {
    color: 'green',
  },
  inProgress: {
    color: 'orange',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  trackButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  reorderButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
