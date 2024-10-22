import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { formatDateWithoutTimezone } from '../utils/helpers';

type ProductDetailsProps = {
  product: {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
  } | null;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Producto no encontrado</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.title}>ID: {product.id}</Text>
      <Text style={styles.subtitle}>Información extra</Text>
      <View style={styles.info}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.value}>{product.name}</Text>

        <Text style={styles.label}>Descripcion</Text>
        <Text style={styles.value}>{product.description}</Text>

        <View style={styles.logoContainer}>
          {product.logo ? (
            <Image source={{ uri: product.logo }} style={styles.logo} />
          ) : (
            <View style={styles.logoPlaceholder} />
          )}
        </View>

        <Text style={styles.label}>Fecha de liberación</Text>
        <Text style={styles.value}>{formatDateWithoutTimezone(product.date_release)}</Text>

        <Text style={styles.label}>Fecha de revisión</Text>
        <Text style={styles.value}>{formatDateWithoutTimezone(product.date_revision)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 18, color: 'red' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 20 },
  info: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  value: { fontSize: 16, marginBottom: 15 },
  logoContainer: { justifyContent: 'center', alignItems: 'center', marginBottom: 30, marginTop: 12 },
  logo: { width: 180, height: 120 },
  logoPlaceholder: { width: 180, height: 120, backgroundColor: '#FFD700' },
});

export default ProductDetails;