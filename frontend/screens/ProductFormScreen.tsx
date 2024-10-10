import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, ScrollView, Alert, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { format, addYears, isEqual } from 'date-fns';
import { RootStackParamList } from '../App';
import Header from '../components/Header';
import DatePicker from '../components/DatePicker';
import axios from 'axios';
import { API_URL } from '@env';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import SecondaryButton from '../components/Buttons/SecondaryButton';

type ProductFormScreenProps = NativeStackScreenProps<RootStackParamList, 'ProductFormScreen'>;

interface FormData {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

const ProductFormScreen: React.FC<ProductFormScreenProps> = ({ route, navigation }) => {
  const { itemId } = route.params || {};
  const isEditing = !!itemId;

  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: '',
  });

  const [errors, setErrors] = useState<{ [K in keyof FormData]?: string }>({});
  const [originalData, setOriginalData] = useState<FormData>();

  useEffect(() => {
    if (isEditing) {
      fetchProductData();
    }
  }, [isEditing]);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`${API_URL}/${itemId}`);
      setFormData(response.data);
      setOriginalData(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
      Alert.alert('Error', 'Fallo al cargar los datos del producto');
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors((prevErrors) => {
        const { [field]: _, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleDateChange = (field: 'date_release' | 'date_revision') => (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setFormData({ ...formData, [field]: formattedDate });
  };

  const validate = () => {
    const newErrors: { [K in keyof FormData]?: string } = {};

    if (!formData.id || formData.id.length < 3 || formData.id.length > 10) {
      newErrors.id = 'ID no válido. (Min: 3, Max: 10 caracteres)';
    }

    if (!formData.name || formData.name.length < 5 || formData.name.length > 100) {
      newErrors.name = 'Nombre no válido. (Min: 5, Max: 100 caracteres)';
    }

    if (!formData.description || formData.description.length < 10 || formData.description.length > 200) {
      newErrors.description = 'Descripción no válida. (Min: 10, Max: 200 caracteres)';
    }

    if (!formData.logo) {
      newErrors.logo = 'El Logo es requerido.';
    }

    if (!formData.date_release) {
      newErrors.date_release = 'La Fecha de Liberación es requerida.';
    } else if (new Date(formData.date_release) < new Date()) {
      newErrors.date_release = 'La Fecha de Liberación no puede ser anterior a la fecha actual.';
    }

    if (!formData.date_revision) {
      newErrors.date_revision = 'La Fecha de Revisión es requerida.';
    } else {
      const releaseDate = new Date(formData.date_release);
      const expectedRevisionDate = addYears(releaseDate, 1);
      const actualRevisionDate = new Date(formData.date_revision);

      if (!isEqual(expectedRevisionDate, actualRevisionDate)) {
        newErrors.date_revision = 'La Fecha de Revisión debe ser exactamente un año después de la Fecha de Liberación.';
      } else if (actualRevisionDate <= releaseDate) {
        newErrors.date_revision = 'La Fecha de Revisión debe ser después de la Fecha de Liberación.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        if (isEditing) {
          await axios.put(`${API_URL}/${itemId}`, formData);
          Alert.alert('Éxito', 'Producto actualizado exitosamente');
        } else {
          await axios.post(API_URL, formData);
          Alert.alert('Éxito', 'Producto creado exitosamente');
        }
        navigation.goBack();
      } catch (error) {
        console.error('Error en el envío del formulario:', error);
        Alert.alert('Error', 'Fallo en el envío del formulario');
      }
    }
  };

  const handleReset = () => {
    if (isEditing && originalData) {
      setFormData(originalData);
    } else {
      setFormData({
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

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.subcontainer}>
        <Text style={styles.title}>{isEditing ? 'Formulario de Edición' : 'Formulario de Registro'}</Text>

        <Text style={styles.label}>ID</Text>
        <TextInput
          style={[styles.input, errors.id ? styles.inputError : {}]}
          value={formData.id}
          onChangeText={(value) => handleChange('id', value)}
          editable={!isEditing}
        />
        {errors.id ? <Text style={styles.errorText}>{errors.id}</Text> : null}

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={[styles.input, errors.name ? styles.inputError : {}]}
          value={formData.name}
          onChangeText={(value) => handleChange('name', value)}
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, errors.description ? styles.inputError : {}]}
          value={formData.description}
          onChangeText={(value) => handleChange('description', value)}
          multiline
        />
        {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}

        <Text style={styles.label}>Logo</Text>
        <TextInput
          style={[styles.input, errors.logo ? styles.inputError : {}]}
          value={formData.logo}
          onChangeText={(value) => handleChange('logo', value)}
        />
        {errors.logo ? <Text style={styles.errorText}>{errors.logo}</Text> : null}

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

        <PrimaryButton onPress={handleSubmit} buttonText={'Enviar'} />
        <SecondaryButton onPress={handleReset} buttonText={'Reiniciar'} />
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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductFormScreen;
