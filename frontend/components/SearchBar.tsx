import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchBar: React.FC<{ handleSearch: (text: string) => void }> = ({ handleSearch }) => {
    const [searchText, setSearchText] = useState<string>('');

    const handleOnChangeText = (text: string) => {
        setSearchText(text);
        handleSearch(text);
    }
    
    return (
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={(text) => { handleOnChangeText(text) }}
        />
    );
}

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
