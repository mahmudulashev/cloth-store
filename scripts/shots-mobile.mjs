import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = process.env.SHOT_DIR || "/tmp/shots";
const BASE = process.env.BASE_URL || "http://localhost:3000";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 393, height: 852 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });

for (const spec of process.argv.slice(2)) {
  const [route, name, mode = "full"] = spec.split("::");
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 110));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: mode === "full" });
  console.log("shot", name);
}
await browser.close();
