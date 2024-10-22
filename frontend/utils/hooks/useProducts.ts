import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { Item } from '../models/Item';
import { getAllProducts } from '../../services/apiService';

const useProducts = () => {
  const [data, setData] = useState<Item[]>([]);
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const products = await getAllProducts();
      setData(products);
      setFilteredData(products);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (text: string) => {
    const search = text.toLowerCase();
    if (search === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (item) => item.name.toLowerCase().includes(search) || item.id.toLowerCase().includes(search)
      );
      setFilteredData(filtered);
    }
  };

  return {
    filteredData,
    loading,
    fetchData,
    handleSearch,
  };
};

export default useProducts;