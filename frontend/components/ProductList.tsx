import React from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import ProductItem from "./ProductItem";
import { Item } from "../utils/models/Item";

const ProductList: React.FC<{ data: Item[]; loading: boolean; onEndReached: () => void; onPressItem: (id: string) => void }> = ({
    data,
    loading,
    onEndReached,
    onPressItem,
}) => (
    <FlatList
      data={data}
      renderItem={({ item }) => <ProductItem item={item} onPress={onPressItem} />}
      keyExtractor={(item) => item.id}
      style={styles.flatList}
      onScrollEndDrag={onEndReached}
      ListFooterComponent={loading ? <ActivityIndicator size="large" color="#FFD700" /> : null}
    />
);

const styles = StyleSheet.create({
    flatList: {
      flex: 1,
      marginBottom: 80,
    },
});

export default ProductList;