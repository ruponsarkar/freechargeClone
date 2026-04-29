import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Modal,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

export default function BarcodeScannerModal({visible, onClose, onScan}) {
  const [hasPermission, setHasPermission] = useState(false);
  const [focusPoint, setFocusPoint] = useState(null);

  const device = useCameraDevice('back');
  const cameraRef = useRef(null);
  const scannedRef = useRef(false);

  useEffect(() => {
    if (!visible) return;

    (async () => {
      let status = await Camera.getCameraPermissionStatus();
      if (status !== 'authorized' && status !== 'granted') {
        status = await Camera.requestCameraPermission();
      }
      setHasPermission(status === 'authorized' || status === 'granted');
      scannedRef.current = false;
    })();
  }, [visible]);

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13', 'ean-8', 'upc-a', 'code-128', 'qr'],
    onCodeScanned: codes => {
      if (scannedRef.current) return;

      scannedRef.current = true;
      const value = codes[0]?.value || '';

      onScan?.(value);
      onClose?.();
    },
  });

  const onFocusTap = async event => {
    if (!cameraRef.current) return;

    const {locationX, locationY} = event.nativeEvent;
    setFocusPoint({x: locationX, y: locationY});

    await cameraRef.current.focus({x: locationX, y: locationY});
    setTimeout(() => setFocusPoint(null), 1000);
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        {hasPermission && device && (
          <Pressable style={StyleSheet.absoluteFill} onPress={onFocusTap}>
            <Camera
              ref={cameraRef}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              codeScanner={codeScanner}
              zoom={device.maxZoom * 0.4}
            />

            {/* 🔙 Close Button */}
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>

            {/* 🔲 Scan Box */}
            <View style={styles.scanBox} />

            {/* 🎯 Focus Indicator */}
            {focusPoint && (
              <View
                style={[
                  styles.focusRing,
                  {
                    left: focusPoint.x - 25,
                    top: focusPoint.y - 25,
                  },
                ]}
              />
            )}
          </Pressable>
        )}

        {!hasPermission && (
          <Text style={{color: '#fff'}}>Camera permission required</Text>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  scanBox: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    width: '80%',
    height: 200,
    borderWidth: 2,
    borderColor: '#00ff88',
    borderRadius: 10,
  },
  focusRing: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 25,
  },
});
