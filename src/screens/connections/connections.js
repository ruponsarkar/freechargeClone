import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getPrinters,
  isPrinterReachable,
} from '../../utils/printer';
import {NativeModules} from 'react-native';

export default function ConnectionScreen() {

  const {MPTPrinter} = NativeModules;

  const [printers, setPrinters] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [loadingPrinters, setLoadingPrinters] = useState(false);
  const [connectingMac, setConnectingMac] = useState(null);

  // -------------------------------
  // Load paired printers
  // -------------------------------
  const loadPrinters = async () => {
    try {
      setLoadingPrinters(true);
      const list = await getPrinters();
      setPrinters(list);
    } catch (e) {
      console.log('Failed to load printers', e);
    } finally {
      setLoadingPrinters(false);
    }
  };

  // -------------------------------
  // Try connect to printer
  // -------------------------------
  const connectPrinter = async printer => {
    try {
      setConnectingMac(printer.mac);

      const reachable = await isPrinterReachable(printer.mac);

      if (!reachable) {
        Alert.alert(
          'Connection Failed',
          'Printer is not available or powered off'
        );
        return;
      }

      // ✅ Save printer
      await AsyncStorage.setItem('PRINTER_MAC', printer.mac);
      console.log('Printer connected', printer.mac);
      // await MPTPrinter.connect(printer.mac);

      setSelectedPrinter(printer);

      Alert.alert(
        'Printer Connected',
        `${printer.name || 'Printer'} connected successfully`
      );
    } catch (e) {
      console.log('Failed to connect printer', e);
      Alert.alert('Error', 'Unable to connect printers');
    } finally {
      setConnectingMac(null);
    }
  };

  // -------------------------------
  // Auto connect saved printer
  // -------------------------------
  const autoConnectSavedPrinter = async () => {
    try {
      const savedMac = await AsyncStorage.getItem('PRINTER_MAC');
      if (!savedMac) return;

      const list = await getPrinters();
      const found = list.find(p => p.mac === savedMac);

      if (!found) return;

      const reachable = await isPrinterReachable(found.mac);
      if (reachable) {
        setSelectedPrinter(found);
      }
    } catch (e) {
      console.log('Auto connect failed');
    }
  };

  // -------------------------------
  // Init
  // -------------------------------
  useEffect(() => {
    loadPrinters();
    autoConnectSavedPrinter();
  }, []);

  // -------------------------------
  // UI
  // -------------------------------
  return (
    <View style={{padding: 16}}>
      <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 12}}>
        Printer Connection
      </Text>

      {loadingPrinters && <ActivityIndicator />}

      {printers.map(p => {
        const isSelected = selectedPrinter?.mac === p.mac;
        const isConnecting = connectingMac === p.mac;

        return (
          <TouchableOpacity
            key={p.mac}
            disabled={isConnecting}
            onPress={() => connectPrinter(p)}
            style={{
              padding: 12,
              borderRadius: 8,
              marginBottom: 8,
              borderWidth: 1,
              borderColor: isSelected ? '#2E7D32' : '#ccc',
              backgroundColor: isSelected ? '#E8F5E9' : '#fff',
            }}>
            <Text style={{fontWeight: '600'}}>
              {p.name || 'Printer'}
            </Text>
            <Text style={{fontSize: 12, color: '#666'}}>
              {p.mac}
            </Text>

            {isConnecting && (
              <Text style={{marginTop: 4, color: '#999'}}>
                Connecting...
              </Text>
            )}

            {isSelected && !isConnecting && (
              <Text style={{marginTop: 4, color: '#2E7D32'}}>
                ✓ Connected
              </Text>
            )}
          </TouchableOpacity>
        );
      })}

      {!printers.length && !loadingPrinters && (
        <Text style={{color: '#999'}}>
          No paired printers found
        </Text>
      )}
    </View>
  );
}
