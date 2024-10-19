import { useState } from 'react';
import { Alert } from 'react-native';
import { deleteProductById } from '../../services/apiService';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

export const useDeleteProduct = (
  productId: string,
  navigation: StackNavigationProp<RootStackParamList, 'ProductInfoScreen'>
) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteProductById(productId);
      Alert.alert('Éxito', 'Producto eliminado con éxito.');
      navigation.navigate('HomeScreen');
    } catch (error) {
      Alert.alert('Error', 'Fallo al eliminar el producto');
    }
    setModalVisible(false);
  };

  return {
    modalVisible,
    setModalVisible,
    handleDelete,
  };
};