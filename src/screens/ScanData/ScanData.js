import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {GlobalStyles} from '../../styles/GlobalStyles';
// import {checkWithCode} from '../../helper/product';
import { checkWithCode } from '../../api/services/product';

import {Linking} from 'react-native';
import BarcodeScannerModal from '../../components/BarcodeScannerModal';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { useSelector } from 'react-redux';
import {API_URL, FRONT_URL} from '@env';

// let frontendUrl = 'http://192.168.31.103:3000';
// let backndUrl = 'http://192.168.31.103:4000';

export default function ScanData({route, navigation}) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const {code} = route.params || {};

  const [showScanner, setShowScanner] = useState(false);
  const [product, setProduct] = useState(null);
  const [loadCode, setLoadCode] = useState(code);
  const [items, setItems] = useState([]);
  const [customerContact, setCustomerContact] = useState('');
  const [quantity, setQuantity] = useState(1);


  const onChangeCode = code => {
    console.log('code : ', code);
    setLoadCode(code);
  };

  const addMoreScan = (code) => {
    checkCode(code);
    setShowScanner(false);
  };

  const goToCheckout = () => {
    navigation.navigate('CartScreen');
  };

  const reloadData = () => {
    checkCode(loadCode);
  };

  useEffect(() => {
    checkCode(code);
  }, [code]);

  const checkCode = async newcode => {
    console.log('code here', newcode);
    if (!newcode) {
      return;
    }
    try {
      const response = await checkWithCode(newcode);
      // console.log('response : ', response);
      if (response.status === 200) {
        console.log('response.data : ', response.data.images[0]?.url);
        setProduct(response.data);
        // addItem(response.data);
        // dispatch(addToCart(response.data));
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.log('error : ', error);
      setProduct(null);
    }
  };

  const redirectToAdd = () => {
    // const url = `http://192.168.31.215:3000/addProduct?code=${loadCode}`;
    const url = `${FRONT_URL}/addProduct?code=${loadCode}`;

    Linking.openURL(url).catch(err =>
      console.error('Failed to open URL:', err),
    );
  };



  const addMore = () => {
    dispatch(addToCart(product));
    navigation.navigate('CartScreen');
    // setShowScanner(true);
  };


  const onChnageInput = (name, value) => {

  };

  return (
    <ScrollView style={styles.container}>
      {!product && (
        <View style={styles.notFoundBox}>
          <Text style={styles.profileName}>Product Not Found</Text>
          <Text style={styles.profileEmail}>
            Please add product with this code or change code and click reload
          </Text>
          <TouchableOpacity
            onPress={redirectToAdd}
            style={[styles.actionButton, GlobalStyles.primaryButton]}>
            <Text style={[styles.logoutText]}>Add new ?</Text>
          </TouchableOpacity>
        </View>
      )}

      {product && (
        <View style={styles.profileHeader}>
          <Image
            // source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
            source={{uri: `${API_URL}${product?.images[0]?.url}`}}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{product?.name}</Text>
          <Text style={styles.profileEmail}>
            {product?.category} * {product?.brand}
          </Text>
        </View>
      )}

      <View style={styles.profileOptions}>
        {product && (
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>
              Price: {product?.sellingPrice} 
            </Text>
          </TouchableOpacity>
        )}

        {product && (
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>MRP: {product?.mrp}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Barcode :</Text>
          <TextInput
            style={styles.input}
            defaultValue={product?.barcode || loadCode}
            onChangeText={onChangeCode}
          />
        </TouchableOpacity>

        {product && (
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>SKU :</Text>
            <TextInput
              style={styles.input}
              defaultValue={product?.sku || loadCode}
              onChangeText={onChangeCode}
            />
          </TouchableOpacity>
        )}

        {/* {product && (
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Qty :</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              value={"7"}
              onChangeText={text => setQuantity(text)}
            />
          </TouchableOpacity>
        )} */}

        {/* {product && (
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Customer Contact no :</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              value={customerContact}
              onChangeText={text => setCustomerContact(text)}
            />
          </TouchableOpacity>
        )} */}

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            // onPress={() => navigation.goBack()}
            onPress={() => navigation.navigate('CartScreen')}
            style={[styles.actionButton, GlobalStyles.dangerButton]}>
            <Text style={styles.logoutText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, GlobalStyles.secondaryButton]}
            onPress={reloadData}>
            <Text style={styles.logoutText}>Reload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => addMore()}
            disabled={!product}
            style={[
              styles.actionButton,
              GlobalStyles.primaryButton,
              !product && {backgroundColor: '#ccc'},
            ]}>
            <Text style={styles.logoutText}>Add </Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {/* <TouchableOpacity
            // onPress={() => navigation.goBack()}
            onPress={() => navigation.navigate('CartScreen')}
            style={[styles.actionButton, GlobalStyles.dangerButton]}>
            <Text style={styles.logoutText}>Cancel</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={[styles.actionButton, GlobalStyles.secondaryButton]}
            onPress={reloadData}>
            <Text style={styles.logoutText}>Reload</Text>
          </TouchableOpacity> */}
         
        </View>

        {/* <TouchableOpacity
          onPress={goToCheckout}
          disabled={!product}
          style={[
            styles.optionButton,
            GlobalStyles.primaryButton,
            !product && {backgroundColor: '#ccc'},
          ]}>
          <Text style={styles.logoutText}>Checkout</Text>
        </TouchableOpacity> */}
      </View>

      <BarcodeScannerModal
        visible={showScanner}
        onClose={() => setShowScanner(false)}
        onScan={(code) => addMoreScan(code)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 10,
  },

  notFoundBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  profileOptions: {
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  actionButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: '30%',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff6347',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontSize: 15,
    backgroundColor: '#fff',
  },
});
