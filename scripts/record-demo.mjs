import { existsSync, renameSync, rmSync } from "node:fs";
import { join } from "node:path";
import { ensureDir, launchBrowser, runMainFlow } from "./browser-utils.mjs";
import { startStaticServer } from "./static-server-utils.mjs";

const videoDir = "videos";
const finalVideoPath = join(videoDir, "kampusmarket-demo.webm");
ensureDir(videoDir);
if (existsSync(finalVideoPath)) {
  rmSync(finalVideoPath);
}

const server = await startStaticServer();
const browser = await launchBrowser();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  recordVideo: {
    dir: videoDir,
    size: { width: 390, height: 844 }
  }
});

const page = await context.newPage();
const video = page.video();

try {
  await runMainFlow(page, server.url);
} finally {
  await context.close();
  await browser.close();
  await server.close();
}

const recordedPath = await video.path();
renameSync(recordedPath, finalVideoPath);
console.log(`Demo video saved at ${finalVideoPath}`);
