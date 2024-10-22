import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  const mockHandleSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with an empty input field and placeholder text', () => {
    const { getByPlaceholderText, queryByDisplayValue } = render(
      <SearchBar handleSearch={mockHandleSearch} />
    );

    expect(getByPlaceholderText('Buscar...')).toBeTruthy();
    expect(queryByDisplayValue('')).toBeTruthy();
  });

  it('updates input value as the user types', () => {
    const { getByPlaceholderText } = render(
      <SearchBar handleSearch={mockHandleSearch} />
    );

    const input = getByPlaceholderText('Buscar...');
    fireEvent.changeText(input, 'Test Search');
    expect(input.props.value).toBe('Test Search');
  });

  it('calls handleSearch callback with the input value', () => {
    const { getByPlaceholderText } = render(
      <SearchBar handleSearch={mockHandleSearch} />
    );

    const input = getByPlaceholderText('Buscar...');
    fireEvent.changeText(input, 'Test Search');
    expect(mockHandleSearch).toHaveBeenCalledWith('Test Search');
    expect(mockHandleSearch).toHaveBeenCalledTimes(1);
  });
});