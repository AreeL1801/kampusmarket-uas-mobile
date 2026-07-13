import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from "react-native";
import { colors, radius, shadow, spacing } from "../theme";
import { Product } from "../types";
import { formatPrice, titleCase } from "../utils/format";

type Props = {
  product: Product;
  onPress: () => void;
  onToggleWishlist: () => void;
  wished: boolean;
  style?: ViewStyle;
};

export function ProductCard({ product, onPress, onToggleWishlist, wished, style }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}
    >
      <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="cover" />
      <View style={styles.body}>
        <View style={styles.headerRow}>
          <Text style={styles.category}>{titleCase(product.category)}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={wished ? "Remove from wishlist" : "Add to wishlist"}
            onPress={(event) => {
              event.stopPropagation();
              onToggleWishlist();
            }}
            style={styles.heart}
          >
            <Ionicons
              name={wished ? "heart" : "heart-outline"}
              size={20}
              color={wished ? colors.rose : colors.textMuted}
            />
          </Pressable>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={13} color={colors.amber} />
            <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.stock}>{product.stock} stok tersedia</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 152,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    flexDirection: "row",
    ...shadow.subtle
  },
  pressed: {
    transform: [{ scale: 0.992 }],
    opacity: 0.95
  },
  image: {
    width: 124,
    minHeight: 152,
    backgroundColor: colors.surfaceMuted
  },
  body: {
    flex: 1,
    minWidth: 0,
    padding: spacing.md,
    gap: spacing.xs
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm
  },
  category: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800"
  },
  heart: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceMuted
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 20
  },
  description: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17
  },
  metaRow: {
    marginTop: spacing.xs,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  price: {
    color: colors.amber,
    fontSize: 16,
    fontWeight: "900"
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: spacing.sm,
    height: 26,
    borderRadius: radius.sm,
    backgroundColor: colors.amberSoft
  },
  ratingText: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 12
  },
  stock: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "600"
  }
});
