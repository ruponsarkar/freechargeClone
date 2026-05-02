import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {AppState} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {
  clearStoredAuth,
  getValidStoredToken,
  setAuthStateListener,
} from './authSession';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const logoutTimerRef = useRef(null);

  const clearLogoutTimer = useCallback(() => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  }, []);

  const logout = useCallback(async () => {
    await clearStoredAuth();
    clearLogoutTimer();
    setUserToken(null);
    setUser(null);
    setTenant(null);
  }, [clearLogoutTimer]);

  const setAuthToken = useCallback(
    token => {
    clearLogoutTimer();
    setUserToken(token);

    if (!token) {
      return;
    }

    try {
      const {exp} = jwtDecode(token);
      const expiresInMs = exp * 1000 - Date.now();

      if (expiresInMs <= 0) {
        logout();
        return;
      }

      logoutTimerRef.current = setTimeout(() => {
        logout();
      }, expiresInMs);
    } catch {
      logout();
    }
    },
    [clearLogoutTimer, logout],
  );

  const checkToken = useCallback(async () => {
    try {
      const token = await getValidStoredToken();

      if (token) {
        const storedUser = await AsyncStorage.getItem('user');
        const storedTenant = await AsyncStorage.getItem('tenant');

        setUser(storedUser ? JSON.parse(storedUser) : null);
        setTenant(storedTenant ? JSON.parse(storedTenant) : null);
      }

      setAuthToken(token);
    } catch {
      await clearStoredAuth();
      setAuthToken(null);
      setUser(null);
      setTenant(null);
    } finally {
      setLoading(false);
    }
  }, [setAuthToken]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  useEffect(() => {
    const removeListener = setAuthStateListener(async event => {
      if (event.type === 'logout') {
        await clearStoredAuth();
        setAuthToken(null);
        return;
      }

      setAuthToken(event.token);
    });

    return () => {
      clearLogoutTimer();
      removeListener();
    };
  }, [clearLogoutTimer, setAuthToken]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextState => {
      if (nextState === 'active') {
        checkToken();
      }
    });

    return () => subscription.remove();
  }, [checkToken]);

  const login = async (token, refreshToken, user, tenant) => {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    await AsyncStorage.setItem('tenant', JSON.stringify(tenant));

    setUser(user);
    setTenant(tenant);
    setAuthToken(token);
  };

  return (
    <AuthContext.Provider
      value={{userToken, user, tenant, login, logout, loading}}>
      {children}
    </AuthContext.Provider>
  );
};
