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
let isPrinting = false;

const PRINT_DELAY = 2500; // keep this
const MAX_RETRY = 1;

/**
 * Add job to print queue
 */
export const printReceipt = async text => {
  const mac = await AsyncStorage.getItem('PRINTER_MAC');
  if (!mac) {
    Alert.alert('No printer selected');
    throw 'NO_PRINTER';
  }

  return new Promise((resolve, reject) => {
    queue.push({
      mac,
      text,
      resolve,
      reject,
      retry: 0,
    });

    processQueue(); // 🔑 single entry point
  });
};

/**
 * Process queue sequentially
 */
const processQueue = async () => {
  if (isPrinting) return;
  if (queue.length === 0) return;

  isPrinting = true;
  const job = queue.shift();

  try {
    await MPTPrinter.print(job.mac, job.text);
    job.resolve(true);
  } catch (err) {
    console.log('Print failed:', err);

    if (job.retry < MAX_RETRY) {
      job.retry++;
      queue.unshift(job); // retry same job
    } else {
      job.reject(err);
    }
  }

  // 🟢 HARD DELAY — printer needs this
  await new Promise(res => setTimeout(res, PRINT_DELAY));

  isPrinting = false;

  // process next job
  processQueue();
};


/**
 * Optional helpers
 */
export const clearPrintQueue = () => {
  queue = [];
};

export const getQueueLength = () => queue.length;
