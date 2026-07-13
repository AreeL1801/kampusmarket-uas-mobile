export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  sku?: string;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  thumbnail: string;
  images: string[];
};

export type SessionUser = {
  id: number;
  name: string;
  email: string;
  username: string;
  image?: string;
  token: string;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AppStackParamList = {
  Tabs: undefined;
  Detail: { product: Product };
};

export type TabParamList = {
  Home: undefined;
  Wishlist: undefined;
  Profile: undefined;
};
