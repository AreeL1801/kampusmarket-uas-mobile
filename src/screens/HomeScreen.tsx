import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import { CategoryPill } from "../components/CategoryPill";
import { ProductCard } from "../components/ProductCard";
import { ProductSkeleton, StatusBlock } from "../components/StatusBlock";
import { TextField } from "../components/TextField";
import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../hooks/useProducts";
import { colors, spacing } from "../theme";
import { AppStackParamList, Product } from "../types";
import { titleCase } from "../utils/format";

type Navigation = NativeStackNavigationProp<AppStackParamList, "Tabs">;

export function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const { width } = useWindowDimensions();
  const { products, loading, refreshing, error, reload, refresh } = useProducts();
  const { ids, toggle } = useWishlist();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((product) => product.category))).sort();
    return ["all", ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const searchable = [
        product.title,
        product.description,
        product.category,
        product.brand ?? ""
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = normalizedQuery.length === 0 || searchable.includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, products, query]);

  const columns = width >= 760 ? 2 : 1;

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      wished={ids.has(item.id)}
      onToggleWishlist={() => toggle(item)}
      onPress={() => navigation.navigate("Detail", { product: item })}
      style={columns > 1 ? styles.gridCard : undefined}
    />
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Katalog kampus</Text>
        <Text style={styles.title}>Barang siap pindah tangan</Text>
        <TextField
          label="Cari produk"
          icon="search-outline"
          placeholder="Tas, laptop, parfum..."
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((item) => (
            <CategoryPill
              key={item}
              label={item === "all" ? "Semua" : titleCase(item)}
              active={category === item}
              onPress={() => setCategory(item)}
            />
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.loadingWrap}>
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </View>
      ) : error ? (
        <StatusBlock
          icon="cloud-offline-outline"
          title="Katalog gagal dimuat"
          message="Data produk belum berhasil diambil dari DummyJSON."
          actionLabel="Coba lagi"
          onAction={reload}
        />
      ) : (
        <FlatList
          key={columns}
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => String(item.id)}
          numColumns={columns}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={columns > 1 ? styles.columnWrapper : undefined}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.primary} />
          }
          ListHeaderComponent={
            <Text style={styles.resultText}>
              {filteredProducts.length} dari {products.length} produk ditampilkan
            </Text>
          }
          ListEmptyComponent={
            <StatusBlock
              icon="search-outline"
              title="Produk tidak ditemukan"
              message="Kata kunci atau kategori belum cocok dengan katalog saat ini."
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.md,
    backgroundColor: colors.background
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
  categoryList: {
    gap: spacing.sm,
    paddingRight: spacing.lg
  },
  loadingWrap: {
    paddingTop: spacing.sm
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.md
  },
  columnWrapper: {
    gap: spacing.md
  },
  gridCard: {
    flex: 1
  },
  resultText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: spacing.md
  }
});
