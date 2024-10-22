import axios from 'axios';
import { API_URL } from '@env';
import { Item } from '../utils/models/Item';

export const getAllProducts = async (): Promise<Item[]> => {
  try {
    const response = await axios.get<{ data: Item[] }>(`${API_URL}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw new Error('Unable to fetch products.');
  }
};

export const fetchProductById = async (id: string): Promise<Item> => {
  try {
    const response = await axios.get<Item>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw new Error('Unable to fetch product.');
  }
};

export const createProduct = async (data: Partial<Item>): Promise<void> => {
  try {
    await axios.post(`${API_URL}`, data);
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Unable to create product.');
  }
};

export const updateProduct = async (id: string, data: Partial<Item>): Promise<void> => {
  try {
    await axios.put(`${API_URL}/${id}`, data);
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Unable to update product.');
  }
};

export const deleteProductById = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Unable to delete product.');
  }
};