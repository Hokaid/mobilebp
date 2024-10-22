import React, { useState, useCallback } from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  handleSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = React.memo(({ handleSearch }) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleOnChangeText = useCallback((text: string) => {
    setSearchText(text);
    handleSearch(text);
  }, [handleSearch]);

  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Buscar..."
      placeholderTextColor="#999"
      value={searchText}
      onChangeText={handleOnChangeText}
    />
  );
});

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default SearchBar;