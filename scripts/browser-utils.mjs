import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright";

export const appUrl = process.env.APP_URL ?? "http://127.0.0.1:4173";
export const edgePath = process.env.EDGE_PATH ?? findEdge();

export function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

export async function launchBrowser(options = {}) {
  return chromium.launch({
    executablePath: edgePath,
    headless: true,
    ...options
  });
}

export async function login(page, url = appUrl) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.getByPlaceholder("Nama lengkap").fill("Farel Pratama");
  await page.getByPlaceholder("nama@email.com").fill("farel@example.com");
  await page.getByPlaceholder("Minimal 8 karakter").fill("kampus123");
  await page.getByRole("button", { name: "Masuk" }).click();
  await page.getByText("Barang siap pindah tangan").waitFor({ timeout: 30000 });
  await page.getByText("produk ditampilkan").waitFor({ timeout: 30000 });
}

export async function runMainFlow(page, url = appUrl) {
  await login(page, url);
  await page.getByPlaceholder("Tas, laptop, parfum...").fill("phone");
  await page.getByText("produk ditampilkan").waitFor({ timeout: 30000 });

  const phoneCard = page.getByText("iPhone 5s", { exact: true });
  await phoneCard.waitFor({ timeout: 30000 });
  await phoneCard.click();
  await page.getByText("Detail penjual").waitFor({ timeout: 30000 });
  await page.getByRole("button", { name: "Simpan ke Wishlist" }).click();
  await page.getByRole("button", { name: "Kembali ke Katalog" }).click();
  await page.getByText("Barang siap pindah tangan").waitFor({ timeout: 30000 });
  await page.getByText("Wishlist", { exact: true }).click();
  await page.getByText("Barang yang disimpan").waitFor({ timeout: 30000 });
  await page.getByText("Profil", { exact: true }).click();
  await page.getByText("Farel Pratama").waitFor({ timeout: 30000 });
}

function findEdge() {
  const candidates = [
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe"
  ];
  const found = candidates.find((candidate) => existsSync(candidate));

  if (!found) {
    throw new Error("Microsoft Edge executable was not found. Set EDGE_PATH to continue.");
  }

  return resolve(found);
}
