import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export const fetchProducts = () =>
  axios.get(`${API_BASE}/products`).then(r => r.data);

export const createOrder = (payload) =>
  axios.post(`${API_BASE}/payment/create-order`, payload).then(r => r.data);

// Cart API functions
export const addToCart = (cartData) =>
  axios.post(`${API_BASE}/cart/add`, cartData)
    .then(r => r.data)
    .catch(err => {
      console.error('API Error:', err.response?.data || err.message);
      throw err;
    });

export const getCartItems = (userId) =>
  axios.get(`${API_BASE}/cart/${userId}`).then(r => r.data);

export const updateCartItem = (updateData) =>
  axios.put(`${API_BASE}/cart/update`, updateData).then(r => r.data);

export const removeFromCart = (removeData) =>
  axios.delete(`${API_BASE}/cart/remove`, { data: removeData }).then(r => r.data);

export const clearCart = (userId) =>
  axios.delete(`${API_BASE}/cart/clear/${userId}`).then(r => r.data);

// Order API functions
export const saveOrder = (orderData) =>
  axios.post(`${API_BASE}/orders/create`, orderData).then(r => r.data);
