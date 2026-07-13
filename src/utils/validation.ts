export type LoginValues = {
  name: string;
  email: string;
  password: string;
};

export type LoginErrors = Partial<Record<keyof LoginValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(values: LoginValues): LoginErrors {
  const errors: LoginErrors = {};

  if (values.name.trim().length < 3) {
    errors.name = "Nama minimal 3 karakter.";
  }

  if (!emailPattern.test(values.email.trim())) {
    errors.email = "Masukkan format email yang valid.";
  }

  if (values.password.length < 8) {
    errors.password = "Password minimal 8 karakter.";
  }

  return errors;
}
