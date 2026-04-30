import AsyncStorage from '@react-native-async-storage/async-storage';
import {isTokenExpired} from '../utils/jwt';

const AUTH_STORAGE_KEYS = ['token', 'refreshToken', 'user'];

let authStateListener = null;

export const setAuthStateListener = listener => {
  authStateListener = listener;

  return () => {
    if (authStateListener === listener) {
      authStateListener = null;
    }
  };
};

export const notifyAuthTokenUpdated = token => {
  authStateListener?.({type: 'token', token});
};

export const notifyAuthLoggedOut = () => {
  authStateListener?.({type: 'logout'});
};

export const clearStoredAuth = async () => {
  await AsyncStorage.multiRemove(AUTH_STORAGE_KEYS);
};

export const getValidStoredToken = async () => {
  const token = await AsyncStorage.getItem('token');

  if (!token || isTokenExpired(token)) {
    await clearStoredAuth();
    return null;
  }

  return token;
};
