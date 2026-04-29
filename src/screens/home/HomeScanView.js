import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BarcodeScannerModal from '../../components/BarcodeScannerModal';

export default function HomeScanView({
  navigation,
  gotoScanData,
  barcode,
  setBarcode,
}) {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <View style={styles.container}>
      {/* LOGO */}
      <View style={styles.logoWrapper}>
        <Image
          source={require('../../assets/logo.jpg')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Scan or Enter Barcode</Text>
      <Text style={styles.subtitle}>
        Quickly scan products or enter barcode manually
      </Text>

      {/* INPUT */}
      <View style={styles.inputWrapper}>
        <Icon name="barcode-scan" size={22} color="#777" />
        <TextInput
          placeholder="Enter barcode manually"
          value={barcode}
          onChangeText={setBarcode}
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      {/* SUBMIT */}
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => gotoScanData(barcode)}>
        <Icon name="check-circle-outline" size={20} color="#fff" />
        <Text style={styles.btnText}>Submit Barcode</Text>
      </TouchableOpacity>

      {/* OR */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* SCAN BUTTON */}
      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => setShowScanner(true)}>
        <Icon name="camera-outline" size={22} color="#fff" />
        <Text style={styles.btnText}>Scan Barcode</Text>
      </TouchableOpacity>

      {/* SCANNER MODAL */}
      <BarcodeScannerModal
        visible={showScanner}
        onClose={() => setShowScanner(false)}
        onScan={code => gotoScanData(code)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },

  /* LOGO */
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },

  /* TITLES */
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#222',
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    marginBottom: 24,
    marginTop: 6,
  },

  /* INPUT */
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#222',
  },

  /* BUTTONS */
  primaryBtn: {
    flexDirection: 'row',
    backgroundColor: '#2E7D32',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 3,
  },
  secondaryBtn: {
    flexDirection: 'row',
    backgroundColor: '#1565C0',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 3,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  /* OR */
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 12,
    color: '#888',
    fontWeight: '600',
  },
});
