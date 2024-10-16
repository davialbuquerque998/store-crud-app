import axios from 'axios';
import { Product } from '../types/Product';

const API_URL = process.env.REACT_APP_API_URL;

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
};

export const updateProduct = async (id: string, product: Product): Promise<Product> => {
  const response = await axios.put(`${API_URL}/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/products/${id}`);
};