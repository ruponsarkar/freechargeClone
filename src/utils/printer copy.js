import {NativeModules} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {MPTPrinter} = NativeModules;

export const getPrinters = async () => {
  return await MPTPrinter.getPairedDevices();
};

export const isBluetoothOn = async () => {
  return await MPTPrinter.isBluetoothEnabled();
};

export const isPrinterReachable = async mac => {
  return await MPTPrinter.testConnection(mac);
};

// export const printReceipt = async (text) => {
//   const mac = await AsyncStorage.getItem('PRINTER_MAC');
//   if (!mac) {
//     Alert.alert('No printer selected');
//     return;
//   }
//   return await MPTPrinter.print(mac, text);
// };


let queue = [];
let processingPromise = Promise.resolve(); // 🔴 mutex
let isPrinting = false;

const PRINT_DELAY = 1500; // safer for MPT-II
const MAX_RETRY = 1;

/**
 * Add job to print queue
 */
export const printReceipt = async (text) => {
  const mac = await AsyncStorage.getItem('PRINTER_MAC');
  if (!mac) {
    Alert.alert('No printer selected');
    return Promise.reject('NO_PRINTER');
  }

  console.log("queue ", queue.length);

  return new Promise((resolve, reject) => {
    queue.push({
      mac,
      text,
      resolve,
      reject,
      retry: 0,
    });

    // 🔒 serialize all processing
    processingPromise = processingPromise.then(processQueue);
  });
};

/**
 * Process queue sequentially
 */
const processQueue = async () => {
  if (isPrinting) return;
  if (queue.length === 0) return;

  const job = queue.shift();
  isPrinting = true;

  try {
    await MPTPrinter.print(job.mac, job.text);
    job.resolve(true);
  } catch (err) {
    console.log('Print failed:', err);

    if (job.retry < MAX_RETRY) {
      job.retry++;
      console.log('Retrying print...');
      queue.unshift(job); // retry first
    } else {
      job.reject(err);
    }
  } finally {
    setTimeout(() => {
      isPrinting = false;
      if (queue.length > 0) {
        processingPromise = processingPromise.then(processQueue);
      }
    }, PRINT_DELAY);
  }
};

/**
 * Optional helpers
 */
export const clearPrintQueue = () => {
  queue = [];
};

export const getQueueLength = () => queue.length;

