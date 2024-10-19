import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Header from '../components/layout/Header';
import DatePicker from '../components/DatePicker';
import useProductForm from '../utils/hooks/useProductForm';
import TextInputField from '../components/TextInputField';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';

type ProductFormScreenProps = NativeStackScreenProps<RootStackParamList, 'ProductFormScreen'>;

const ProductFormScreen: React.FC<ProductFormScreenProps> = ({ route, navigation }) => {
  const { itemId } = route.params || {};
  const {
    formData,
    errors,
    isEditing,
    handleChange,
    handleDateChange,
    handleSubmit,
    handleReset,
  } = useProductForm(itemId);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.subcontainer}>
        <Text style={styles.title}>{isEditing ? 'Formulario de Edición' : 'Formulario de Registro'}</Text>

        <TextInputField
          label="ID"
          value={formData.id}
          onChange={(value) => handleChange('id', value)}
          error={errors.id}
          editable={!isEditing}
        />

        <TextInputField
          label="Nombre"
          value={formData.name}
          onChange={(value) => handleChange('name', value)}
          error={errors.name}
        />

        <TextInputField
          label="Descripción"
          value={formData.description}
          onChange={(value) => handleChange('description', value)}
          multiline
          error={errors.description}
        />

        <TextInputField
          label="Logo"
          value={formData.logo}
          onChange={(value) => handleChange('logo', value)}
          error={errors.logo}
        />

        <DatePicker
          label="Fecha de Liberación"
          value={formData.date_release}
          onChangeDate={handleDateChange('date_release')}
          error={errors.date_release}
        />

        <DatePicker
          label="Fecha de Revisión"
          value={formData.date_revision}
          onChangeDate={handleDateChange('date_revision')}
          error={errors.date_revision}
        />

        <PrimaryButton onPress={handleSubmit} buttonText='Enviar' />
        <SecondaryButton onPress={handleReset} buttonText='Reiniciar' />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  subcontainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProductFormScreen;