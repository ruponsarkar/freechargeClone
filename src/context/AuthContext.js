import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setUserToken(token); // ✅ don’t check expiry here
    } catch {
      setUserToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const login = async (token, refreshToken, user) => {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setUserToken(token);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{userToken, login, logout, loading}}>
      {children}
    </AuthContext.Provider>
  );
};
