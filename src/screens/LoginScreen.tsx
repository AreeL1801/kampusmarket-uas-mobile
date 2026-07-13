import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { AppButton } from "../components/AppButton";
import { TextField } from "../components/TextField";
import { useAuth } from "../context/AuthContext";
import { colors, radius, shadow, spacing } from "../theme";
import { RootStackParamList } from "../types";
import { LoginErrors, LoginValues, validateLogin } from "../utils/validation";

type Props = NativeStackScreenProps<RootStackParamList, "Auth">;

const initialValues: LoginValues = {
  name: "",
  email: "",
  password: ""
};

export function LoginScreen(_: Props) {
  const { login, loading } = useAuth();
  const [values, setValues] = useState<LoginValues>(initialValues);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateValue = (key: keyof LoginValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmitError(null);
  };

  const submit = async () => {
    const nextErrors = validateLogin(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      await login(values);
    } catch {
      setSubmitError("Login demo belum berhasil. Periksa koneksi internet lalu coba lagi.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboard}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.brandBlock}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>KM</Text>
          </View>
          <Text style={styles.eyebrow}>UAS Praktikum Mobile</Text>
          <Text style={styles.title}>KampusMarket</Text>
          <Text style={styles.subtitle}>
            Marketplace barang bekas mahasiswa dengan katalog cepat, filter ringkas,
            dan sesi pengguna yang tervalidasi.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Masuk ke akun</Text>
          <TextField
            label="Nama"
            icon="person-outline"
            placeholder="Nama lengkap"
            value={values.name}
            onChangeText={(value) => updateValue("name", value)}
            error={errors.name}
            autoCapitalize="words"
          />
          <TextField
            label="Email"
            icon="mail-outline"
            placeholder="nama@email.com"
            value={values.email}
            onChangeText={(value) => updateValue("email", value)}
            error={errors.email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextField
            label="Password"
            icon="lock-closed-outline"
            placeholder="Minimal 8 karakter"
            value={values.password}
            onChangeText={(value) => updateValue("password", value)}
            error={errors.password}
            secureTextEntry
          />
          {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}
          <AppButton
            title="Masuk"
            icon="arrow-forward"
            loading={loading}
            onPress={submit}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    flexGrow: 1,
    padding: spacing.xl,
    justifyContent: "center",
    gap: spacing.xl
  },
  brandBlock: {
    gap: spacing.sm
  },
  logo: {
    width: 58,
    height: 58,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm
  },
  logoText: {
    color: colors.surface,
    fontSize: 19,
    fontWeight: "900"
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase"
  },
  title: {
    color: colors.text,
    fontSize: 38,
    lineHeight: 43,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 520
  },
  formCard: {
    padding: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    ...shadow.subtle
  },
  formTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900"
  },
  submitError: {
    color: colors.rose,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18
  }
});
