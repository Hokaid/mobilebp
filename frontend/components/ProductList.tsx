import React, { useCallback } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import ProductItem from "./ProductItem";
import { Item } from "../utils/models/Item";

interface ProductListProps {
  data: Item[];
  loading: boolean;
  onEndReached: () => void;
  onPressItem: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = React.memo(({ data, loading, onEndReached, onPressItem }) => {
  const handleEndReached = useCallback(() => {
    if (!loading) {
      onEndReached();
    }
  }, [loading, onEndReached]);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ProductItem item={item} onPress={onPressItem} />}
      keyExtractor={(item) => item.id}
      style={styles.flatList}
      onScrollEndDrag={handleEndReached}
      ListFooterComponent={loading ? <ActivityIndicator size="large" color="#FFD700" /> : null}
    />
  );
});

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    marginBottom: 80,
  },
});

export default ProductList;