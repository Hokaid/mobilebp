import React, { useCallback } from 'react';
import { Item } from '../utils/models/Item';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

interface Props {
  item: Item;
  onPress: (id: string) => void;
}

const ProductItem: React.FC<Props> = React.memo(({ item, onPress }) => {
  const handlePress = useCallback(() => onPress(item.id), [onPress, item.id]);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.item}>
      <View style={styles.itemContent}>
        <View>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>ID: {item.id}</Text>
        </View>
        <ChevronRight size={24} color="#999" />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 8,
    marginBottom: 15,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default ProductItem;