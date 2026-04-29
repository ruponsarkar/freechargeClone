import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    // console.log('decoded ==>>', decoded);

    const currentTime = Date.now() / 1000; // seconds
    return decoded.exp < currentTime;
  } catch (e) {
    console.log('Invalid token', e);
    return true;
  }
};
