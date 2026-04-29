import api from '../axios';

export const loginAPI = (data) => {
  return api.post('/auth/login', data);
};

// for refreshtoken 
export const refreshTokenAPI = (data) => {
  console.log('data : ', data);
  return api.post('/auth/refresh-token', data);
};
