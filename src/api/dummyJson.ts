import { Product, SessionUser } from "../types";

const API_BASE_URL = "https://dummyjson.com";

type ProductsResponse = {
  products: Product[];
  total: number;
};

type AuthResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
  accessToken: string;
};

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getProducts(): Promise<Product[]> {
  const data = await requestJson<ProductsResponse>("/products?limit=200");
  return data.products;
}

export async function simulateLogin(input: {
  name: string;
  email: string;
  password: string;
}): Promise<SessionUser> {
  const auth = await requestJson<AuthResponse>("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "emilys",
      password: "emilyspass",
      expiresInMins: 30
    })
  });

  return {
    id: auth.id,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    username: auth.username,
    image: auth.image,
    token: auth.accessToken
  };
}
