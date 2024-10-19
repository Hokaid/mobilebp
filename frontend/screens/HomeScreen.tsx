import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import Header from '../components/layout/Header';
import PrimaryButton from '../components/buttons/PrimaryButton';
import FixedFooter from '../components/layout/FixedFooter';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import useProducts from '../utils/hooks/useProducts';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { filteredData, loading, handleSearch, fetchData } = useProducts();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) fetchData();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.subcontainer}>
        <SearchBar handleSearch={handleSearch} />
        <ProductList data={filteredData} loading={loading} onEndReached={fetchData} onPressItem={(id) => navigation.navigate('ProductInfoScreen', { id })} />
        <FixedFooter>
          <PrimaryButton onPress={() => navigation.navigate('ProductFormScreen', {})} buttonText={'Agregar'} />
        </FixedFooter>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subcontainer: {
    paddingTop: 20,
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;