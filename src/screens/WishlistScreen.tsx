import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ProductCard } from "../components/ProductCard";
import { StatusBlock } from "../components/StatusBlock";
import { useWishlist } from "../context/WishlistContext";
import { colors, spacing } from "../theme";
import { AppStackParamList, Product } from "../types";

type Navigation = NativeStackNavigationProp<AppStackParamList, "Tabs">;

export function WishlistScreen() {
  const navigation = useNavigation<Navigation>();
  const { items, ids, toggle } = useWishlist();

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      wished={ids.has(item.id)}
      onToggleWishlist={() => toggle(item)}
      onPress={() => navigation.navigate("Detail", { product: item })}
    />
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Wishlist</Text>
        <Text style={styles.title}>Barang yang disimpan</Text>
      </View>
      <FlatList
        data={items}
        renderItem={renderProduct}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <StatusBlock
            icon="heart-outline"
            title="Wishlist masih kosong"
            message="Produk yang disimpan dari katalog akan muncul di sini."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    padding: spacing.lg,
    gap: spacing.xs
  },
  kicker: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  title: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 31,
    fontWeight: "900"
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
    flexGrow: 1
  }
});
