import AsyncStorage from '@react-native-async-storage/async-storage';
import {orderApi, getAllOrders} from '../api/services/product';

const OFFLINE_QUEUE_KEY = '@OFFLINE_QUEUE';
const ORDERS_CACHE_KEY = '@ORDERS_CACHE';
const LAST_FETCHED_KEY = '@OFFLINE_LAST_FETCHED';
const PRODUCTS_CACHE_KEY = '@PRODUCTS_CACHE';
const PRODUCTS_LAST_FETCHED_KEY = '@PRODUCTS_LAST_FETCHED';

const parseJson = value => {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

const storeJson = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getPendingOrders = async () => {
  const value = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
  const items = parseJson(value);
  return Array.isArray(items) ? items : [];
};

export const savePendingOrders = async orders => {
  await storeJson(OFFLINE_QUEUE_KEY, orders || []);
};

export const addPendingOrder = async payload => {
  const queue = await getPendingOrders();
  const item = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type: 'order',
    payload,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
  await savePendingOrders([...queue, item]);
  return item;
};

export const removePendingOrder = async id => {
  const queue = await getPendingOrders();
  const nextQueue = queue.filter(item => item.id !== id);
  await savePendingOrders(nextQueue);
  return nextQueue;
};

export const clearPendingOrders = async () => {
  await savePendingOrders([]);
};

export const getLastFetched = async () => {
  const value = await AsyncStorage.getItem(LAST_FETCHED_KEY);
  return value ? new Date(value) : null;
};

export const setLastFetched = async timestamp => {
  await AsyncStorage.setItem(LAST_FETCHED_KEY, timestamp?.toISOString() || '');
};

export const getCachedOrders = async () => {
  const value = await AsyncStorage.getItem(ORDERS_CACHE_KEY);
  const orders = parseJson(value);
  return Array.isArray(orders) ? orders : [];
};

export const saveOrdersCache = async orders => {
  await storeJson(ORDERS_CACHE_KEY, orders || []);
};

export const getCachedProducts = async () => {
  const value = await AsyncStorage.getItem(PRODUCTS_CACHE_KEY);
  const products = parseJson(value);
  return Array.isArray(products) ? products : [];
};

export const saveProductsCache = async products => {
  await storeJson(PRODUCTS_CACHE_KEY, products || []);
};

export const getProductsLastFetched = async () => {
  const value = await AsyncStorage.getItem(PRODUCTS_LAST_FETCHED_KEY);
  return value ? new Date(value) : null;
};

export const setProductsLastFetched = async timestamp => {
  await AsyncStorage.setItem(PRODUCTS_LAST_FETCHED_KEY, timestamp?.toISOString() || '');
};

export const refreshProducts = async params => {
  try {
    const response = await getProducts(params || {page: 1, limit: 20});
    const products = response?.data?.data || [];
    await saveProductsCache(products);
    await setProductsLastFetched(new Date());
    return {success: true, products};
  } catch (error) {
    const cached = await getCachedProducts();
    return {success: false, error, cachedProducts: cached};
  }
};

export const checkInternetConnection = async () => {
  try {
    const response = await fetch('https://www.google.com/generate_204', {
      method: 'GET',
      cache: 'no-store',
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const refreshOrders = async () => {
  try {
    const response = await getAllOrders();
    const orders = response.data || [];
    await saveOrdersCache(orders);
    await setLastFetched(new Date());
    return {success: true, orders};
  } catch (error) {
    const cached = await getCachedOrders();
    return {success: false, error, cachedOrders: cached};
  }
};

export const syncPendingOrders = async () => {
  const isOnline = await checkInternetConnection();
  if (!isOnline) {
    return {
      success: false,
      reason: 'offline',
      synced: 0,
      failed: 0,
    };
  }

  const queue = await getPendingOrders();
  if (queue.length === 0) {
    await refreshOrders();
    return {
      success: true,
      reason: 'no_pending_data',
      synced: 0,
      failed: 0,
    };
  }

  const syncedIds = [];
  const failedItems = [];

  for (const item of queue) {
    if (item.type !== 'order') {
      failedItems.push({item, error: 'unsupported_type'});
      continue;
    }

    try {
      await orderApi(item.payload);
      syncedIds.push(item.id);
    } catch (error) {
      failedItems.push({item, error});
    }
  }

  const nextQueue = queue.filter(item => !syncedIds.includes(item.id));
  await savePendingOrders(nextQueue);

  if (syncedIds.length > 0) {
    await refreshOrders();
  }

  return {
    success: true,
    reason: 'synced_some',
    synced: syncedIds.length,
    failed: failedItems.length,
    failedItems,
  };
};
