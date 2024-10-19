import { useState, useEffect } from 'react';
import { fetchProductById, updateProduct, createProduct } from '../../services/apiService';
import { Item } from '../models/Item';

const useProductForm = (itemId?: string) => {
  const [formData, setItem] = useState<Item>({
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: '',
  });
  
  const [errors, setErrors] = useState<{ [K in keyof Item]?: string }>({});
  const [originalData, setOriginalData] = useState<Item>();

  const isEditing = !!itemId;

  useEffect(() => {
    if (isEditing) {
      fetchProductData();
    }
  }, [isEditing]);

  const fetchProductData = async () => {
    const data = await fetchProductById(itemId!);
    if (data) {
      setItem(data);
      setOriginalData(data);
    }
  };

  const handleChange = (field: keyof Item, value: string) => {
    setItem({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors((prevErrors) => {
        const { [field]: _, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleDateChange = (field: 'date_release' | 'date_revision') => (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setItem({ ...formData, [field]: formattedDate });
  };

  const validate = () => {
    const newErrors: { [K in keyof Item]?: string } = {};
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (validate()) {
      if (isEditing) {
        await updateProduct(itemId!, formData);
      } else {
        await createProduct(formData);
      }
    }
  };

  const handleReset = () => {
    if (isEditing && originalData) {
      setItem(originalData);
    } else {
      setItem({
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: '',
        date_revision: '',
      });
      setErrors({});
    }
  };

  return {
    formData, errors, isEditing, handleChange, handleDateChange, handleSubmit, handleReset
  };
};

export default useProductForm;