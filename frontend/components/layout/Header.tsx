import React, { useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

const Header: React.FC = React.memo(() => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const navigateHome = useCallback(() => {
    navigation.navigate('HomeScreen');
  }, [navigation]);

  return (
    <TouchableOpacity style={styles.headerContainer} onPress={navigateHome}>
      <Image
        source={require('../../assets/banco-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    marginBottom: 10,
  },
  logo: {
    width: 96,
    height: 48,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002D72',
  },
});

export default Header;