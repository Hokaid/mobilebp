import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductItem from '../components/ProductItem';

describe('ProductItem', () => {
  const mockItem = {
    id: '123',
    name: 'Test Product',
    description: 'This Test Product',
    logo: 'logo.png',
    date_revision: '2024-01-01',
    date_release: '2025-01-01'
  };

  const mockOnPress = jest.fn();

  it('renders product information correctly', () => {
    const { getByText } = render(<ProductItem item={mockItem} onPress={mockOnPress} />);

    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('ID: 123')).toBeTruthy();
  });

  it('triggers onPress callback with the correct ID when pressed', () => {
    const { getByText } = render(<ProductItem item={mockItem} onPress={mockOnPress} />);

    fireEvent.press(getByText('Test Product'));
    expect(mockOnPress).toHaveBeenCalledWith('123');
  });
});