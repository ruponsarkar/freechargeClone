import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import CurrentLocation from '../../utils/currentLocation';

import { getVendors } from '../../api/shopsapi';

const categories = [
  {
    id: 1,
    name: 'Best Offers',
    image:
      'https://e7.pngegg.com/pngimages/771/344/png-clipart-red-offer-tag-red-offer-thumbnail.png',
  },
  {
    id: 2,
    name: 'Popular Restaurants',
    image:
      'https://www.foodandwine.com/thmb/C0hb8-nwKbvO_ZfWuIfVN3AH77g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Most-Popular-Chain-Restaurants-in-America-FT-BLOG0605-16385776bca1440880bf0e4140b9793b.jpg',
  },
  {
    id: 3,
    name: 'Best Offers',
    image:
      'https://e7.pngegg.com/pngimages/771/344/png-clipart-red-offer-tag-red-offer-thumbnail.png',
  },
  {
    id: 4,
    name: 'Popular Restaurants',
    image:
      'https://www.foodandwine.com/thmb/C0hb8-nwKbvO_ZfWuIfVN3AH77g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Most-Popular-Chain-Restaurants-in-America-FT-BLOG0605-16385776bca1440880bf0e4140b9793b.jpg',
  },
  {
    id: 5,
    name: 'Popular Restaurants',
    image:
      'https://www.foodandwine.com/thmb/C0hb8-nwKbvO_ZfWuIfVN3AH77g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Most-Popular-Chain-Restaurants-in-America-FT-BLOG0605-16385776bca1440880bf0e4140b9793b.jpg',
  },
  // Add more categories here
];

const restaurants = [
  {
    id: 1,
    name: 'Pizza Hut',
    rating: 4.5,
    deliveryTime: '30 mins',
    image:
      'https://thebestoflkn.com/wp-content/uploads/2022/07/the-best-of-lkn-big-bitez-grill-20-most-popular-restaurants-cornelius-nc-2.jpg',
  },
  {
    id: 2,
    name: 'KFC',
    rating: 4.3,
    deliveryTime: '25 mins',
    image:
      'https://www.foodandwine.com/thmb/C0hb8-nwKbvO_ZfWuIfVN3AH77g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Most-Popular-Chain-Restaurants-in-America-FT-BLOG0605-16385776bca1440880bf0e4140b9793b.jpg',
  },
  {
    id: 3,
    name: 'Pizza Hut',
    rating: 4.5,
    deliveryTime: '30 mins',
    image:
      'https://thebestoflkn.com/wp-content/uploads/2022/07/the-best-of-lkn-big-bitez-grill-20-most-popular-restaurants-cornelius-nc-2.jpg',
  },
  {
    id: 4,
    name: 'KFC',
    rating: 4.3,
    deliveryTime: '25 mins',
    image:
      'https://www.foodandwine.com/thmb/C0hb8-nwKbvO_ZfWuIfVN3AH77g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Most-Popular-Chain-Restaurants-in-America-FT-BLOG0605-16385776bca1440880bf0e4140b9793b.jpg',
  },
  // Add more restaurant data here
];

export default function HomePage({navigation}) {
  const myLocation = CurrentLocation();

  // console.log("address ==>> ", myLocation?.address);
  // console.log("position ==>> ", myLocation?.position);

  // console.log("longitude ==>> ", myLocation?.coords.longitude);



  const [vendors, setVendors] = useState();
  

  useEffect(()=>{
    let vendors = setVendors()
    
    getVendors(vendors);
  },[])

  const renderCategories = () => (
    <View>
      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.categoryItem}>
            <Image source={{uri: item.image}} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderRestaurants = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Shops near me</Text>
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('Products')}>
            <View style={styles.restaurantCard}>
              <Image
                source={{uri: item.image}}
                style={styles.restaurantImage}
              />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{item.name}</Text>
                <Text style={styles.restaurantDetails}>
                  {item.rating} ★ | {item.deliveryTime}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <View>
      {/* <CurrentLocation /> */}

      <FlatList
        data={[]} // Empty data as we're using the ListHeaderComponent
        ListHeaderComponent={() => (
          <View>
            {/* Header Section */}
            <View style={styles.header}>
              <Text style={styles.locationText}>Deliver to: {myLocation?.address}</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search for restaurants, food..."
                placeholderTextColor="#888"
              />
            </View>

            {/* Promotional Banner Section */}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[{id: 1}, {id: 2}]} // Fake data for promo images
              keyExtractor={item => item.id.toString()}
              renderItem={() => (
                <Image
                  source={{
                    uri: 'https://thebestoflkn.com/wp-content/uploads/2022/07/the-best-of-lkn-big-bitez-grill-20-most-popular-restaurants-cornelius-nc-2.jpg',
                  }}
                  style={styles.promoImage}
                />
              )}
              style={styles.carousel}
            />

            {/* Render Categories */}
            {renderCategories()}

            {/* Render Restaurants */}
            {renderRestaurants()}
          </View>
        )}
        renderItem={null} // We are using ListHeaderComponent, so no need for a renderItem here
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  locationText: {
    fontSize: 14,
    color: '#333',
  },
  searchInput: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  carousel: {
    paddingVertical: 10,
  },
  promoImage: {
    width: 300,
    height: 150,
    marginRight: 10,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginVertical: 10,
    color: '#333',
  },
  categoryItem: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  categoryText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  section: {
    paddingHorizontal: 20,
  },
  restaurantCard: {
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  restaurantInfo: {
    padding: 10,
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  restaurantDetails: {
    fontSize: 14,
    color: '#888',
  },
});
