import { PermissionsAndroid, Platform, Alert } from 'react-native';

/**
 * Request Bluetooth permissions (Android 12+)
 */
export const requestBluetoothPermissions = async () => {
  if (Platform.OS !== 'android') return true;

  try {
    if (Platform.Version >= 31) {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);

      const granted =
        result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] ===
          PermissionsAndroid.RESULTS.GRANTED;

      if (!granted) {
        Alert.alert(
          'Permission Required',
          'Bluetooth permission is required to connect printer'
        );
      }

      return granted;
    }

    // Android < 12 → Bluetooth permissions not required
    return true;
  } catch (error) {
    console.log('Bluetooth permission error:', error);
    return false;
  }
};

/**
 * Request Camera permission
 */
export const requestCameraPermission = async () => {
  if (Platform.OS !== 'android') return true;

  try {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );

    const granted = result === PermissionsAndroid.RESULTS.GRANTED;

    if (!granted) {
      Alert.alert(
        'Permission Required',
        'Camera permission is required to scan barcode'
      );
    }

    return granted;
  } catch (error) {
    console.log('Camera permission error:', error);
    return false;
  }
};

/**
 * Request ALL required permissions together
 */
export const requestAllAppPermissions = async () => {
  const bluetoothGranted = await requestBluetoothPermissions();
  const cameraGranted = await requestCameraPermission();

  return bluetoothGranted && cameraGranted;
};
