import api from '../axios';

export const checkWithCode = code => {
  return api.get(`/products/code/${code}`);
};

export const orderApi = payload => {
  return api.post('/orders', payload);
};
export const getAllOrders = () => {
  return api.get('/orders/my');
};

// export const getProducts = () => {
//   return api.get('/products');
// };

export const getProducts = (data) => api.get(`products?page=${data.page || 1}&limit=${data.limit || 20}&search=${data.search || ""}&sortBy=${data.sortBy || "createdAt"}&sortOrder=${data.sortOrder || "desc"}`);
