import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { fetchProductById, updateProduct, createProduct } from '../../services/apiService';
import { RootState, AppDispatch } from '../../redux/store';
import { 
  setFormData, 
  setEditing, 
  setFieldError, 
  clearFieldError,
  resetForm 
} from '../../redux/slices/productFormSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { addYears, isEqual } from 'date-fns';
import { Item } from '../models/Item';
import { formatDateToLocalISOString } from '../helpers';

const useProductForm = (navigation: NativeStackNavigationProp<RootStackParamList, 'ProductFormScreen', undefined>, itemId?: string) => {
  const dispatch: AppDispatch = useDispatch();
  const { formData, errors, isEditing } = useSelector((state: RootState) => state.productForm);
  
  useEffect(() => {
    if (itemId) {
      dispatch(setEditing(true));
      
      const fetchProductData = async () => {
        const data = await fetchProductById(itemId!);
        dispatch(setFormData(data));
      };

      fetchProductData();
    } else {
      dispatch(resetForm());
      dispatch(setEditing(false));
      dispatch(setFormData(formData));
    }
  }, [dispatch, itemId]);

  const handleChange = (field: keyof Item, value: string) => {
    dispatch(setFormData({ [field]: value }));
    
    if (errors[field]) {
      dispatch(clearFieldError(field));
    }
  };

  const handleDateChange = (field: 'date_release' | 'date_revision') => (date: Date) => {
    const formattedDate = formatDateToLocalISOString(date);
    dispatch(setFormData({ [field]: formattedDate }));
  };

  const validate = () => {
    const newErrors: { [K in keyof Item]?: string } = {};

    if (!formData.id || formData.id.length < 3 || formData.id.length > 10) {
      dispatch(setFieldError({ field: 'id', error: 'ID no válido. (Min: 3, Max: 10 caracteres)' }));
      newErrors.id = "ID no válido. (Min: 3, Max: 10 caracteres)";
    }
    
    if (!formData.name || formData.name.length < 5 || formData.name.length > 100) {
      dispatch(setFieldError({ field: 'name', error: 'Nombre no válido. (Min: 5, Max: 100 caracteres)' }));
      newErrors.name = "Nombre no válido. (Min: 5, Max: 100 caracteres)";
    }

    if (!formData.description || formData.description.length < 10 || formData.description.length > 200) {
        dispatch(setFieldError({ field: 'description', error: 'Descripción no válida. (Min: 10, Max: 200 caracteres)' }));
        newErrors.description = 'Descripción no válida. (Min: 10, Max: 200 caracteres)';
    }
      
    if (!formData.logo) {
        dispatch(setFieldError({ field: 'logo', error: 'El Logo es requerido.' }));
        newErrors.logo = 'El Logo es requerido.';
    }
      
    if (!formData.date_release) {
        dispatch(setFieldError({ field: 'date_release', error: 'La Fecha de Liberación es requerida.' }));
        newErrors.date_release = 'La Fecha de Liberación es requerida.';
    } else if (new Date(formData.date_release) < new Date()) {
        dispatch(setFieldError({ field: 'date_release', error: 'La Fecha de Liberación no puede ser anterior a la fecha actual.' }));
        newErrors.date_release = 'La Fecha de Liberación no puede ser anterior a la fecha actual.';
    }
      
    if (!formData.date_revision) {
        dispatch(setFieldError({ field: 'date_revision', error: 'La Fecha de Revisión es requerida.' }));
        newErrors.date_revision = 'La Fecha de Revisión es requerida.';
    } else {
        const releaseDate = new Date(formData.date_release);
        const expectedRevisionDate = addYears(releaseDate, 1);
        const actualRevisionDate = new Date(formData.date_revision);
      
        if (!isEqual(expectedRevisionDate, actualRevisionDate)) {
          dispatch(setFieldError({ field: 'date_revision', error: 'La Fecha de Revisión debe ser exactamente un año después de la Fecha de Liberación.' }));
          newErrors.date_revision = 'La Fecha de Revisión debe ser exactamente un año después de la Fecha de Liberación.';
        } else if (actualRevisionDate <= releaseDate) {
          dispatch(setFieldError({ field: 'date_revision', error: 'La Fecha de Revisión debe ser después de la Fecha de Liberación.' }));
          newErrors.date_revision = 'La Fecha de Revisión debe ser después de la Fecha de Liberación.';
        }
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        if (isEditing) {
          await updateProduct(itemId!, formData);
          Alert.alert('Éxito', 'Producto actualizado exitosamente');
        } else {
          await createProduct(formData);
          Alert.alert('Éxito', 'Producto creado exitosamente');
        }
        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', 'Fallo en el envío del formulario');
      }
    }
  };

  const handleReset = () => {
    dispatch(resetForm());
  };

  return {
    formData,
    errors,
    isEditing,
    handleChange,
    handleDateChange,
    handleSubmit,
    handleReset,
  };
};

export default useProductForm;