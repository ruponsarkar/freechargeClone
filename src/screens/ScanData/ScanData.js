import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {GlobalStyles} from '../../styles/GlobalStyles';
// import {checkWithCode} from '../../helper/product';
import { checkWithCode } from '../../api/services/product';
import { getCachedProducts } from '../../utils/offlineSync';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const {code, item} = route.params || {};

  const [showScanner, setShowScanner] = useState(false);
  const [product, setProduct] = useState(item || null);
  const [loadCode, setLoadCode] = useState(item?.barcode || item?.sku || code);
  const [items, setItems] = useState([]);
  const [customerContact, setCustomerContact] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);


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
    if (item) {
      setProduct(item);
      setLoadCode(item.barcode || item.sku || code);
      setHasSearched(true);
      return;
    }
    checkCode(code);
  }, [code, item]);

  const checkCode = async newcode => {
    const codeToCheck = newcode?.toString().trim();
    console.log('code here', codeToCheck);
    if (!codeToCheck) {
      setProduct(null);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(false);

    try {
      const cachedProducts = await getCachedProducts();
      const cachedProduct = cachedProducts.find(
        item =>
          item.barcode?.toString().trim() === codeToCheck ||
          item.sku?.toString().trim() === codeToCheck ||
          item.code?.toString().trim() === codeToCheck,
      );

      if (cachedProduct) {
        setProduct(cachedProduct);
      } else {
        const response = await checkWithCode(codeToCheck);
        if (response.status === 200) {
          setProduct(response.data);
        } else {
          setProduct(null);
        }
      }
    } catch (error) {
      console.log('error : ', error);
      setProduct(null);
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  };

  const redirectToAdd = async () => {
    const token = await AsyncStorage.getItem('token');
    const params = new URLSearchParams();

    if (loadCode) {
      params.append('code', loadCode);
    }
    if (token) {
      params.append('token', token);
    }

    console.log("params ", params.toString());
    console.log("token ", token);
    
    const url = `${FRONT_URL}/addProduct?${params.toString()}`;

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
      {loading && (
        <View style={styles.loaderOverlay}>
          <View style={styles.loaderCard}>
            <ActivityIndicator size="large" color="#2E7D32" />
            <Text style={styles.loaderTitle}>Checking product</Text>
            <Text style={styles.loaderSubtitle}>
              We&apos;re fetching barcode details now.
            </Text>
          </View>
        </View>
      )}

      {!loading && hasSearched && !product && (
        <View style={styles.notFoundBox}>
          <View style={styles.notFoundBadge}>
            <Text style={styles.notFoundBadgeText}>Scan Result</Text>
          </View>
          <Text style={styles.notFoundTitle}>Product Not Found</Text>
          <Text style={styles.notFoundDescription}>
            We couldn&apos;t match this barcode with an existing item. You can
            add it as a new product or update the code and reload.
          </Text>
          <View style={styles.notFoundCodeCard}>
            <Text style={styles.notFoundCodeLabel}>Current barcode</Text>
            <Text style={styles.notFoundCodeValue}>{loadCode || 'N/A'}</Text>
          </View>
          <TouchableOpacity
            onPress={redirectToAdd}
            style={[
              styles.notFoundActionButton,
              GlobalStyles.primaryButton,
            ]}>
            <Text style={styles.notFoundActionText}>Add New Product</Text>
          </TouchableOpacity>
        </View>
      )}

      {product && (
        <View style={styles.productCard}>
          <View style={styles.productImageWrap}>
            <Image
              source={{uri: `${API_URL}${product?.images[0]?.url}`}}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.productStatusBadge}>
            <Text style={styles.productStatusBadgeText}>Product Found</Text>
          </View>
          <Text style={styles.profileName}>{product?.name}</Text>
          <Text style={styles.profileEmail}>
            {product?.category} * {product?.brand}
          </Text>

          <View style={styles.priceSummaryRow}>
            <View style={styles.priceSummaryCard}>
              <Text style={styles.priceSummaryLabel}>Selling Price</Text>
              <Text style={styles.priceSummaryValue}>
                Rs {product?.sellingPrice}
              </Text>
            </View>
            <View style={styles.priceSummaryCard}>
              <Text style={styles.priceSummaryLabel}>MRP</Text>
              <Text style={styles.priceSummaryValue}>Rs {product?.mrp}</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.profileOptions}>
        <View style={styles.optionButton}>
          <Text style={styles.optionLabel}>Barcode</Text>
          <TextInput
            style={styles.input}
            defaultValue={product?.barcode || loadCode}
            onChangeText={onChangeCode}
          />
        </View>

        {product && (
          <View style={styles.optionButton}>
            <Text style={styles.optionLabel}>SKU</Text>
            <TextInput
              style={styles.input}
              defaultValue={product?.sku || loadCode}
              onChangeText={onChangeCode}
            />
          </View>
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

        <View style={styles.actionsRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CartScreen')}
            style={[
              styles.actionButton,
              styles.actionButtonCompact,
              GlobalStyles.dangerButton,
            ]}>
            <Text style={styles.logoutText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.actionButtonCompact,
              GlobalStyles.secondaryButton,
            ]}
            disabled={loading}
            onPress={reloadData}>
            <Text style={styles.logoutText}>Reload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => addMore()}
            disabled={!product || loading}
            style={[
              styles.actionButton,
              styles.actionButtonPrimary,
              GlobalStyles.primaryButton,
              (!product || loading) && styles.actionButtonDisabled,
            ]}>
            <Text style={styles.logoutText}>Add</Text>
          </TouchableOpacity>
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
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#d1fae5',
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
    alignItems: 'center',
  },
  productImageWrap: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  productStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#dcfce7',
    marginBottom: 12,
  },
  productStatusBadgeText: {
    color: '#166534',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(245, 245, 245, 0.82)',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loaderCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  loaderTitle: {
    marginTop: 14,
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  loaderSubtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#6b7280',
    textAlign: 'center',
  },
  notFoundBox: {
    backgroundColor: '#fff',
    paddingVertical: 28,
    paddingHorizontal: 22,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
    marginTop: 34,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  notFoundBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#fee2e2',
    marginBottom: 14,
  },
  notFoundBadgeText: {
    color: '#b91c1c',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  notFoundTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  notFoundDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6b7280',
    marginTop: 10,
    textAlign: 'center',
  },
  notFoundCodeCard: {
    width: '100%',
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#fff5f5',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  notFoundCodeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  notFoundCodeValue: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  notFoundActionButton: {
    width: '100%',
    marginTop: 20,
    borderRadius: 14,
    paddingVertical: 14,
  },
  notFoundActionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  profileEmail: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 6,
    textAlign: 'center',
  },
  priceSummaryRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  priceSummaryCard: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  priceSummaryLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    color: '#64748b',
  },
  priceSummaryValue: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  profileOptions: {
    marginTop: 18,
    marginBottom: 24,
  },
  optionButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  optionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 6,
  },
  actionButtonCompact: {
    flex: 1,
  },
  actionButtonPrimary: {
    flex: 1.2,
  },
  actionButtonDisabled: {
    backgroundColor: '#9ca3af',
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
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#f9fafb',
    color: '#111827',
  },
});
