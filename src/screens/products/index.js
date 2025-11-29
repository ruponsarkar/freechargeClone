import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
  TextInput,
  Pressable,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const screenWidth = Dimensions.get('window').width;

export default function Products({navigation}) {
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: 'FORTUNE Premium kachi ghani pure Mustard Oil Pouch (Sorioh Tel)',
      rating: 4.3,
      deliveryTime: '25 mins',
      image:
        'https://rukminim2.flixcart.com/image/832/832/kqidx8w0/edible-oil/p/t/q/kachi-ghani-pouch-mustard-oil-fortune-original-imag4gb3sgbkhyyn.jpeg?q=70',
      details:
        'FORTUNE Premium kachi ghani pure Mustard Oil Pouch (Sorioh Tel)',
      brand: 'KRISHNA',
      price: '160',
      qty: '1 L',
      pricing: [
        {
          qty: '1 L',
          price: '160',
        },
        {
          qty: '500 g',
          price: '80',
        },
        {
          qty: '50 g',
          price: '20',
        },
      ],
    },
    {
      id: 2,
      name: 'Salt',
      rating: 4.3,
      deliveryTime: '25 mins',
      image:
        'https://rukminim2.flixcart.com/image/832/832/xif0q/salt/d/q/k/-original-imah576fymqgkj55.jpeg?q=70',
      details:
        'Tata Salt Himalayan Rock Pink Salt, With Natural Trace Minerals, Low Sodium, Premium Himalayan Pink Salt ',
      brand: 'KRISHNA',
      price: '81',
      qty: '1 kg',
      pricing: [
        {
          qty: '1 KG',
          price: '81',
        },
        {
          qty: '500 g',
          price: '44',
        },
      ],
    },
    {
      id: 3,
      name: 'FORTUNE Premium kachi ghani pure Mustard Oil Pouch (Sorioh Tel)',
      rating: 4.3,
      deliveryTime: '25 mins',
      image:
        'https://rukminim2.flixcart.com/image/832/832/kqidx8w0/edible-oil/p/t/q/kachi-ghani-pouch-mustard-oil-fortune-original-imag4gb3sgbkhyyn.jpeg?q=70',
      details:
        'FORTUNE Premium kachi ghani pure Mustard Oil Pouch (Sorioh Tel)',
      brand: 'KRISHNA',
      price: '160',
      qty: '1 L',
      pricing: [
        {
          qty: '1 L',
          price: '160',
        },
        {
          qty: '500 g',
          price: '80',
        },
      ],
    },
    {
      id: 4,
      name: 'Salt',
      rating: 4.3,
      deliveryTime: '25 mins',
      image:
        'https://rukminim2.flixcart.com/image/832/832/xif0q/salt/d/q/k/-original-imah576fymqgkj55.jpeg?q=70',
      details:
        'Tata Salt Himalayan Rock Pink Salt, With Natural Trace Minerals, Low Sodium, Premium Himalayan Pink Salt ',
      brand: 'KRISHNA',
      price: '81',
      qty: '1 kg',
      pricing: [
        {
          qty: '1 KG',
          price: '81',
        },
        {
          qty: '500 g',
          price: '44',
        },
      ],
    },
  ]);

  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState('1kg');
  const [cartItems, setCartItems] = useState([]);

  // const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = item => {
    // setQuantity(prev => (prev > 1 ? prev - 1 : 1))
    setRestaurants(prevRestaurants =>
      prevRestaurants.map(restaurant =>
        restaurant.id === item.id
          ? {
              ...restaurant,
              quantity: restaurant.quantity ? restaurant.quantity - 1 : 1,
              // price: restaurant.price ? restaurant.price* 1 : 1,
            }
          : restaurant,
      ),
    );
  };

  const increaseQuantity = item => {
    setRestaurants(prevRestaurants =>
      prevRestaurants.map(restaurant =>
        restaurant.id === item.id
          ? {
              ...restaurant,
              quantity: restaurant.quantity ? restaurant.quantity + 1 : 2,
            }
          : restaurant,
      ),
    );
    // console.log("find : ", find);

    // setQuantity(prev => prev + 1);
  };

  const changeWeight=()=>{

  }

  const addToCart = item => {
    console.log("add to cart : ", item);
    const newItem = {
      ...item,
      quantity: item.quantity || 1,
      weight: selectedWeight,
    };
    setCartItems([...cartItems, newItem]);
    console.log(`Added ${quantity} of ${selectedWeight} to cart`);
  };

  const renderRestaurants = () => (
    <View style={styles.section}>
      {/* <Text style={styles.sectionTitle}>Popular Restaurants</Text> */}
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity>
            <View style={styles.restaurantCard}>
              <Pressable onPress={() => navigation.navigate('Details')}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={{uri: item.image}}
                    style={styles.restaurantImage}
                  />
                  <View style={styles.restaurantInfo}>
                    <Text style={styles.restaurantName}>{item.name}</Text>
                    <Text style={styles.restaurantDetails}>{item.details}</Text>
                    <Text style={styles.restaurantDetails}>{item.brand}</Text>
                  </View>
                </View>
              </Pressable>

              <View style={styles.quantityWeightContainer}>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => decreaseQuantity(item)}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.quantityText}>{item.quantity || 1}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => increaseQuantity(item)}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>

                <Picker
                  // selectedValue={item.pricing[0].qty}
                  style={styles.weightPicker}
                  onValueChange={itemValue => setSelectedWeight(itemValue)}>
                  {/* <Picker.Item label="1kg" value="1kg" />
                  <Picker.Item label="500g" value="500g" />
                  <Picker.Item label="1L" value="1L" />
                  <Picker.Item label="500ml" value="500ml" /> */}

                  {item.pricing?.map((i, index)=>(
                  <Picker.Item key={index} label={i.qty} value={i.qty}  />
                  ))}
                </Picker>
                <View>
                  <Text style={styles.restaurantDetails}>
                    Price:{' '}
                    <Text style={styles.restaurantName}>{item.price}</Text> RS
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => addToCart(item)}
                // disabled={true}
              >
                <Text style={styles.addToCartButtonText}>Add to list</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {renderRestaurants()}

      {/* Cart button at the bottom */}
      {cartItems.length > 0 && (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart', {cartItems})}>
          <Text style={styles.cartButtonText}>
            Order Now ({cartItems.length}{' '}
            {cartItems.length === 1 ? 'item' : 'items'})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  restaurantCard: {
    flexDirection: 'column',
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    padding: 10,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  restaurantInfo: {
    flex: 1,
    justifyContent: 'space-between',
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
  quantityWeightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  weightPicker: {
    height: 50,
    width: 100,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addToCartButton: {
    marginTop: 2,
    backgroundColor: '#FF6347',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'green',
    padding: 15,
    alignItems: 'center',
    borderRadius: 0,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
