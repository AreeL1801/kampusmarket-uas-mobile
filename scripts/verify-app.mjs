import { ensureDir, launchBrowser, runMainFlow } from "./browser-utils.mjs";
import { startStaticServer } from "./static-server-utils.mjs";

const screenshotDir = "screenshots";
ensureDir(screenshotDir);

const server = await startStaticServer();
const browser = await launchBrowser();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true
});

const page = await context.newPage();
const consoleErrors = [];
page.on("console", (message) => {
  if (message.type() === "error") {
    consoleErrors.push(message.text());
  }
});

try {
  await page.goto(server.url, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${screenshotDir}/01-login.png`, fullPage: true });
  await page.getByRole("button", { name: "Masuk" }).click();
  await page.getByText("Nama minimal 3 karakter.").waitFor({ timeout: 10000 });
  await page.screenshot({ path: `${screenshotDir}/02-validation.png`, fullPage: true });
  await runMainFlow(page, server.url);
  await page.screenshot({ path: `${screenshotDir}/03-profile.png`, fullPage: true });

  if (consoleErrors.length > 0) {
    throw new Error(`Console errors found:\n${consoleErrors.join("\n")}`);
  }

  console.log("Verified login validation, protected tabs, catalog API, search, detail, wishlist, and profile.");
} catch (error) {
  await page.screenshot({ path: `${screenshotDir}/failure.png`, fullPage: true });
  console.log(`Failure URL: ${page.url()}`);
  console.log(`Console errors:\n${consoleErrors.join("\n") || "none"}`);
  throw error;
} finally {
  await browser.close();
  await server.close();
}
