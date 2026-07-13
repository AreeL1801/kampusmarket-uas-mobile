import { Image, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { AppButton } from "../components/AppButton";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { colors, radius, shadow, spacing } from "../theme";

export function ProfileScreen() {
  const { user, logout } = useAuth();
  const { items, clear } = useWishlist();
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        {user?.image && !imageFailed ? (
          <Image
            source={{ uri: user.image }}
            style={styles.avatar}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarText}>{user?.name.charAt(0) ?? "K"}</Text>
          </View>
        )}
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <View style={styles.stats}>
          <View style={styles.statTile}>
            <Text style={styles.statValue}>{items.length}</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </View>
          <View style={styles.statTile}>
            <Text style={styles.statValue}>DummyJSON</Text>
            <Text style={styles.statLabel}>Sumber API</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <AppButton title="Kosongkan Wishlist" variant="soft" icon="trash-outline" onPress={clear} />
          <AppButton title="Keluar" variant="danger" icon="log-out-outline" onPress={logout} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    alignItems: "center",
    gap: spacing.md,
    ...shadow.subtle
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: colors.surfaceMuted
  },
  avatarFallback: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  avatarText: {
    color: colors.surface,
    fontSize: 32,
    fontWeight: "900"
  },
  name: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center"
  },
  email: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center"
  },
  stats: {
    flexDirection: "row",
    gap: spacing.sm,
    width: "100%"
  },
  statTile: {
    flex: 1,
    minHeight: 82,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
    padding: spacing.md,
    justifyContent: "center",
    gap: spacing.xs
  },
  statValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900"
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "800"
  },
  actions: {
    width: "100%",
    gap: spacing.sm,
    marginTop: spacing.sm
  }
});
