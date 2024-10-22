import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import HomeScreen from './screens/HomeScreen';
import ProductInfoScreen from './screens/ProductInfoScreen';
import ProductFormScreen from './screens/ProductFormScreen';

export type RootStackParamList = {
  HomeScreen: undefined;
  ProductInfoScreen: { id: string };
  ProductFormScreen: { itemId?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ProductInfoScreen" component={ProductInfoScreen} />
          <Stack.Screen name="ProductFormScreen" component={ProductFormScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}