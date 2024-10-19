import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useProductData } from '../utils/hooks/useProductData';
import { useDeleteProduct } from '../utils/hooks/useDeleteProduct';
import { formatDateWithoutTimezone } from '../utils/helpers';
import { RootStackParamList } from '../App';
import Header from '../components/layout/Header';
import PrimaryButton from '../components/buttons/PrimaryButton';
import DangerButton from '../components/buttons/DangerButton';
import ConfirmationModal from '../components/ConfirmationModal';

type ProductInfoScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ProductInfoScreen'>;
  route: { params: { id: string } };
};

const ProductInfoScreen: React.FC<ProductInfoScreenProps> = ({ route, navigation }) => {
  const { id } = route.params;
  const { productData, loading, loadProduct } = useProductData(id);
  const { setModalVisible, modalVisible, handleDelete } = useDeleteProduct(id, navigation);

  useEffect(() => {
    loadProduct();
  }, []);

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
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>ID: {productData.id}</Text>
        <Text style={styles.subtitle}>Información extra</Text>
        <View style={styles.info}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.value}>{productData.name}</Text>

          <View style={styles.logoContainer}>
            {productData.logo ? (
              <Image source={{ uri: productData.logo }} style={styles.logo} />
            ) : (
              <View style={styles.logoPlaceholder} />
            )}
          </View>

          <Text style={styles.label}>Fecha de liberación</Text>
          <Text style={styles.value}>{formatDateWithoutTimezone(productData.date_release)}</Text>

          <Text style={styles.label}>Fecha de revisión</Text>
          <Text style={styles.value}>{formatDateWithoutTimezone(productData.date_revision)}</Text>
        </View>
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <PrimaryButton onPress={() => navigation.navigate('ProductFormScreen', { itemId: id })} buttonText='Editar' />
        <DangerButton onPress={() => setModalVisible(true)} buttonText='Eliminar' />
      </View>

      <ConfirmationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDelete}
        itemName={productData.name}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  info: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 100,
  },
  logoPlaceholder: {
    width: 150,
    height: 100,
    backgroundColor: '#FFD700',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProductInfoScreen;