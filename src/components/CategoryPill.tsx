import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, spacing } from "../theme";

type Props = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export function CategoryPill({ label, active, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        active && styles.active,
        pressed && styles.pressed
      ]}
    >
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    minHeight: 36,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  active: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  pressed: {
    opacity: 0.82
  },
  label: {
    color: colors.textMuted,
    fontWeight: "700",
    fontSize: 13
  },
  activeLabel: {
    color: colors.surface
  }
});
