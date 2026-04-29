import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import BarcodeScannerModal from '../../components/BarcodeScannerModal';
import ProductListView from '../home/ProductListView';
import HomeScanView from '../home/HomeScanView';

export default function ProductScreen({navigation}) {
  // const [showScanner, setShowScanner] = useState(false);
  const [barcode, setBarcode] = useState('');

  const [activeView, setActiveView] = useState('scan');
  // 'scan' | 'products'

  const gotoScanData = code => {
    if (!code) return;
    navigation.navigate('ScanData', {
      code: code,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleBtn,
            activeView === 'scan' && styles.toggleActive,
          ]}
          onPress={() => setActiveView('scan')}>
          <Text style={styles.toggleText}>Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleBtn,
            activeView === 'products' && styles.toggleActive,
          ]}
          onPress={() => setActiveView('products')}>
          <Text style={styles.toggleText}>Products</Text>
        </TouchableOpacity>
      </View>


      {activeView === 'scan' && (
        <HomeScanView 
        navigation={navigation}
        gotoScanData={gotoScanData}
        // showScanner={showScanner}
        // setShowScanner={setShowScanner}
        barcode={barcode}
        setBarcode={setBarcode}
        />
      )}
      {activeView === 'products' && (
        <ProductListView 
        navigation={navigation}
        onSelect={gotoScanData} 
        />
      )}
      {/* <HomeScanView />
      <ProductListView /> */}

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  primaryBtn: {
    backgroundColor: '#2E7D32',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryBtn: {
    backgroundColor: '#1565C0',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 14,
    color: '#666',
  },

  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  toggleBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#2E7D32',
  },
  toggleText: {
    color: '#fff',
    fontWeight: '600',
  },
  
});
