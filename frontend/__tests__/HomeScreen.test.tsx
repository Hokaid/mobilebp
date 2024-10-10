import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

jest.mock('axios');
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(() => true),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));
jest.mock('../components/Header', () => 'Header');

describe('HomeScreen', () => {
  it('renders initial elements', async () => {
    const { getByPlaceholderText, getByText } = render(<HomeScreen />);
    await waitFor(() => {
      expect(getByPlaceholderText('Buscar...')).toBeTruthy();
      expect(getByText('Agregar')).toBeTruthy();
    });
  });
});
