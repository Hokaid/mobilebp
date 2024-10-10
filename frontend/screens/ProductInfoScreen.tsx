import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert, SafeAreaView, ScrollView, Modal, Pressable } from 'react-native';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { X } from 'lucide-react-native';
import { RootStackParamList } from '../App';
import axios from 'axios';
import Header from '../components/Header';
import { format } from 'date-fns';
import { API_URL } from '@env';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import DangerButton from '../components/Buttons/DangerButton';

type ProductInfoScreenProps = {
  route: RouteProp<RootStackParamList, 'ProductInfoScreen'>;
  navigation: StackNavigationProp<RootStackParamList, 'ProductInfoScreen'>;
};

interface ProductData {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

const ProductInfoScreen: React.FC<ProductInfoScreenProps> = ({ route, navigation }) => {
  const { id } = route.params;
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchProductData();
    }
  }, [isFocused]);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setProductData(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
      Alert.alert('Error', 'Fallo al cargar los datos del producto.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      Alert.alert('Éxito', 'Producto eliminado con éxito.');
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error eliminando el producto:', error);
      Alert.alert('Error', 'Fallo al eliminar el producto');
    }
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  if (!productData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Producto no encontrado</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>ID: {productData.id}</Text>
        <Text style={styles.subtitle}>Información extra</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.value}>{productData.name}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Descripción</Text>
            <Text style={styles.value}>{productData.description}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Logo</Text>
            <View style={styles.centeredLogo}>
              {productData.logo ? (
                <Image source={{ uri: productData.logo }} style={styles.logoImage} />
              ) : (
                <View style={styles.logoPlaceholder} />
              )}
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Fecha liberación</Text>
            <Text style={styles.value}>
              {format(new Date(productData.date_release), 'dd/MM/yyyy')}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Fecha revisión</Text>
            <Text style={styles.value}>
              {format(new Date(productData.date_revision), 'dd/MM/yyyy')}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <PrimaryButton onPress={() => navigation.navigate('ProductFormScreen', { itemId: id })} buttonText={'Editar'} />
        <DangerButton onPress={() => setModalVisible(true)} buttonText={'Eliminar'} />
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <X color="#666" size={24} />
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>¿Estás seguro de eliminar el producto "{productData.name}"?</Text>
            
            <View style={styles.modalButtonsContainer}>
              <Pressable
                style={styles.confirmButton}
                onPress={handleDelete}
              >
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </Pressable>

              <Pressable
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 60,
    textAlign: 'left',
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  column: {
    flexDirection: 'column',
    marginBottom: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  logoPlaceholder: {
    width: 150,
    height: 100,
    backgroundColor: '#FFD700',
  },
  logoImage: {
    width: 150,
    height: 100,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginBottom: 10, 
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  centeredLogo: {
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 60,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 25,
    marginTop: 36,
    textAlign: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  confirmButtonText: {
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    borderRadius: 5,
  },
  cancelButtonText: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
});

export default ProductInfoScreen;