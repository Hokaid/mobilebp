import { useState } from 'react';
import { Alert } from 'react-native';
import { fetchProductById } from '../../services/apiService';
import { Item } from '../models/Item';

export const useProductData = (productId: string) => {
  const [productData, setProductData] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const data = await fetchProductById(productId);
      setProductData(data);
    } catch (error) {
      Alert.alert('Error', 'Fallo al cargar los datos del producto.');
    } finally {
      setLoading(false);
    }
  };

  return {
    productData,
    loading,
    loadProduct,
  };
};