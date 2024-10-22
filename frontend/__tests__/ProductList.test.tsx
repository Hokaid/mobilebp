import React from 'react';
import { render } from '@testing-library/react-native';
import ProductList from '../components/ProductList';

describe('ProductList', () => {
  const mockOnEndReached = jest.fn();
  const mockOnPressItem = jest.fn();
  const mockData = [
    { id: '1', name: 'Product 1', description: 'This Test Product', logo: 'logo.png', date_revision: '2024-01-01', date_release: '2025-01-01' },
    { id: '2', name: 'Product 2', description: 'This Test Product', logo: 'logo.png', date_revision: '2024-01-01', date_release: '2025-01-01' },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders the list of products correctly', () => {
    const { getByText } = render(
      <ProductList
        data={mockData}
        loading={false}
        onEndReached={mockOnEndReached}
        onPressItem={mockOnPressItem}
      />
    );

    expect(getByText('Product 1')).toBeTruthy();
    expect(getByText('Product 2')).toBeTruthy();
  });
});