import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useProductData } from '../utils/hooks/useProductData';
import { useDeleteProduct } from '../utils/hooks/useDeleteProduct';
import { useIsFocused } from '@react-navigation/native';
import Header from '../components/layout/Header';
import FixedFooter from '../components/layout/FixedFooter';
import ProductDetails from '../components/ProductDetails';
import CustomSkeleton from '../components/CustomSkeleton';
import ConfirmationModal from '../components/ConfirmationModal';
import { RootStackParamList } from '../App';
import PrimaryButton from '../components/buttons/PrimaryButton';
import DangerButton from '../components/buttons/DangerButton';

type ProductInfoScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ProductInfoScreen'>;
  route: { params: { id: string } };
};

const ProductInfoScreen: React.FC<ProductInfoScreenProps> = ({ route, navigation }) => {
  const { id } = route.params;
  const { productData, loading, loadProduct } = useProductData(id);
  const { setModalVisible, modalVisible, handleDelete } = useDeleteProduct(id, navigation);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) loadProduct();
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        {loading ? (
          <CustomSkeleton />
        ) : (
          <ProductDetails product={productData} />
        )}
        <FixedFooter>
          <PrimaryButton
            onPress={() => navigation.navigate('ProductFormScreen', { itemId: id })}
            buttonText='Editar'
          />
          <DangerButton onPress={() => setModalVisible(true)} buttonText='Eliminar' />
        </FixedFooter>
      </ScrollView>
      <ConfirmationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDelete}
        itemName={productData?.name || ""}
      />
    </SafeAreaView>
  );
};

export default ProductInfoScreen;