import api from '../axios';

export const checkWithCode = code => {
  return api.get(`/products/code/${code}`);
};

export const orderApi = payload => {
  return api.post('/orders', payload);
};
export const getAllOrders = (params = {}) => {
  const page = params.page || 1;
  const limit = params.limit || 20;
  return api.get(`/orders/my?page=${page}&limit=${limit}`);
};

// export const getProducts = () => {
//   return api.get('/products');
// };

export const getProducts = (data) => api.get(`products?page=${data.page || 1}&limit=${data.limit || 20}&search=${data.search || ""}&sortBy=${data.sortBy || "createdAt"}&sortOrder=${data.sortOrder || "desc"}`);
