import React from 'react';
import { render } from '@testing-library/react-native';
import ProductDetails from '../components/ProductDetails';

jest.mock('../utils/helpers', () => ({
  formatDateWithoutTimezone: jest.fn((date) => `Formatted: ${date}`),
}));

describe('ProductDetails', () => {
  const mockProduct = {
    id: '12345',
    name: 'Sample Product',
    description: 'This is a description of the sample product.',
    logo: 'https://via.placeholder.com/180x120.png',
    date_release: '2022-01-01',
    date_revision: '2022-06-01',
  };

  it('renders product details correctly', () => {
    const { getByText } = render(<ProductDetails product={mockProduct} />);

    expect(getByText('ID: 12345')).toBeTruthy();
    expect(getByText('Información extra')).toBeTruthy();
    expect(getByText('Nombre')).toBeTruthy();
    expect(getByText('Sample Product')).toBeTruthy();
    expect(getByText('Descripcion')).toBeTruthy();
    expect(getByText('This is a description of the sample product.')).toBeTruthy();
    expect(getByText('Formatted: 2022-01-01')).toBeTruthy();
    expect(getByText('Formatted: 2022-06-01')).toBeTruthy();
  });

  it('renders error message when product is null', () => {
    const { getByText } = render(<ProductDetails product={null} />);
    expect(getByText('Producto no encontrado')).toBeTruthy();
  });
});