import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { useWishlist } from "../context/WishlistContext";
import { colors, radius, shadow, spacing } from "../theme";
import { AppStackParamList } from "../types";
import { formatPrice, titleCase } from "../utils/format";

type Props = NativeStackScreenProps<AppStackParamList, "Detail">;

export function DetailScreen({ navigation, route }: Props) {
  const { product } = route.params;
  const { ids, toggle } = useWishlist();
  const wished = ids.has(product.id);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Image
          source={{ uri: product.images[0] ?? product.thumbnail }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.main}>
        <View style={styles.categoryRow}>
          <Text style={styles.category}>{titleCase(product.category)}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color={colors.amber} />
            <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.infoGrid}>
          <InfoTile label="Stok" value={`${product.stock}`} icon="cube-outline" />
          <InfoTile
            label="Diskon"
            value={`${product.discountPercentage.toFixed(1)}%`}
            icon="pricetag-outline"
          />
          <InfoTile
            label="Status"
            value={product.availabilityStatus ?? "Tersedia"}
            icon="checkmark-circle-outline"
          />
          <InfoTile
            label="Pengiriman"
            value={product.shippingInformation ?? "Terjadwal"}
            icon="bicycle-outline"
          />
        </View>

        <View style={styles.detailBlock}>
          <Text style={styles.blockTitle}>Detail penjual</Text>
          <Text style={styles.blockText}>
            Brand: {product.brand ?? "KampusMarket"}
          </Text>
          <Text style={styles.blockText}>
            SKU: {product.sku ?? `KM-${product.id}`}
          </Text>
          <Text style={styles.blockText}>
            Garansi: {product.warrantyInformation ?? "Tidak tersedia"}
          </Text>
        </View>

        <AppButton
          title={wished ? "Hapus dari Wishlist" : "Simpan ke Wishlist"}
          icon={wished ? "heart" : "heart-outline"}
          variant={wished ? "danger" : "primary"}
          onPress={() => toggle(product)}
        />
        <AppButton
          title="Kembali ke Katalog"
          icon="arrow-back"
          variant="soft"
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
}

function InfoTile({
  label,
  value,
  icon
}: {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={styles.infoTile}>
      <Ionicons name={icon} size={19} color={colors.primary} />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    paddingBottom: spacing.xxl
  },
  hero: {
    minHeight: 310,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl
  },
  image: {
    width: "100%",
    height: 260
  },
  main: {
    marginTop: -spacing.lg,
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    ...shadow.subtle
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md
  },
  category: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.amberSoft,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    height: 30
  },
  ratingText: {
    color: colors.text,
    fontWeight: "900"
  },
  title: {
    color: colors.text,
    fontSize: 27,
    lineHeight: 32,
    fontWeight: "900"
  },
  price: {
    color: colors.amber,
    fontSize: 25,
    fontWeight: "900"
  },
  description: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 23
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  infoTile: {
    flexGrow: 1,
    flexBasis: "47%",
    minHeight: 94,
    borderRadius: radius.md,
    padding: spacing.md,
    backgroundColor: colors.surfaceMuted,
    gap: spacing.xs
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "800"
  },
  infoValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900"
  },
  detailBlock: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs
  },
  blockTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900"
  },
  blockText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19
  }
});
