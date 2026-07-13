import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, shadow, spacing } from "../theme";
import { AppButton } from "./AppButton";

type Props = {
  title: string;
  message: string;
  icon?: keyof typeof Ionicons.glyphMap;
  actionLabel?: string;
  onAction?: () => void;
};

export function StatusBlock({ title, message, icon = "cube-outline", actionLabel, onAction }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.icon}>
        <Ionicons name={icon} size={26} color={colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction ? (
        <AppButton title={actionLabel} onPress={onAction} variant="soft" style={styles.button} />
      ) : null}
    </View>
  );
}

export function ProductSkeleton() {
  return (
    <View style={styles.skeletonCard}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonBody}>
        <View style={[styles.skeletonLine, { width: "80%" }]} />
        <View style={[styles.skeletonLine, { width: "55%" }]} />
        <View style={[styles.skeletonLine, { width: "65%" }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    margin: spacing.lg,
    padding: spacing.xl,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    gap: spacing.sm,
    ...shadow.subtle
  },
  icon: {
    width: 52,
    height: 52,
    borderRadius: radius.lg,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "800",
    textAlign: "center"
  },
  message: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center"
  },
  button: {
    marginTop: spacing.sm
  },
  skeletonCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    minHeight: 134,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    overflow: "hidden"
  },
  skeletonImage: {
    width: 118,
    backgroundColor: colors.surfaceMuted
  },
  skeletonBody: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.md,
    justifyContent: "center"
  },
  skeletonLine: {
    height: 13,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceMuted
  }
});
