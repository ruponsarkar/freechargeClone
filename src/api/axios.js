import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isTokenExpired} from '../utils/jwt';
import {API_URL} from '@env';
import {
  clearStoredAuth,
  notifyAuthLoggedOut,
  notifyAuthTokenUpdated,
} from '../context/authSession';

let isRefreshing = false;
let refreshQueue = [];

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
});

const refreshAxios = axios.create({
  baseURL: `${API_URL}/api/v1`,
});

const processQueue = (error, token = null) => {
  refreshQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  refreshQueue = [];
};

api.interceptors.request.use(async config => {
  let token = await AsyncStorage.getItem('token');
  console.log('API_URL ', API_URL);

  // 🔁 Token expired → refresh
  if (token && isTokenExpired(token)) {
    if (isRefreshing) {
      // wait for ongoing refresh
      return new Promise((resolve, reject) => {
        refreshQueue.push({
          resolve: newToken => {
            config.headers.Authorization = `Bearer ${newToken}`;
            resolve(config);
          },
          reject: err => reject(err),
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token');
      }

      const res = await refreshAxios.post('/auth/refresh-token', {
        refreshToken,
      });

      token = res.data.token;
      await AsyncStorage.setItem('token', token);
      notifyAuthTokenUpdated(token);

      processQueue(null, token);
      config.headers.Authorization = `Bearer ${token}`;
    } catch (err) {
      processQueue(err, null);
      await clearStoredAuth();
      notifyAuthLoggedOut();
      throw err;
    } finally {
      isRefreshing = false;
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error?.response?.status === 401) {
      await clearStoredAuth();
      notifyAuthLoggedOut();
    }

    return Promise.reject(error);
  },
);

export default api;
