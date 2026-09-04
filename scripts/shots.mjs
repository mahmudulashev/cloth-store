import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = process.env.SHOT_DIR || "/tmp/shots";
const BASE = process.env.BASE_URL || "http://localhost:3000";
const targets = process.argv.slice(2);

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });

if (process.env.SEED_CART) {
  await page.goto(BASE);
  await page.evaluate(() => {
    localStorage.setItem("xiv.cart.v1", JSON.stringify([
      { slug: "basic-heavy-weight-t-shirt", size: "M", color: "Bone", quantity: 1 },
      { slug: "soft-wash-straight-fit-jeans", size: "L", color: "Indigo", quantity: 2 },
    ]));
    localStorage.setItem("xiv.favourites.v1", JSON.stringify(["abstract-print-shirt"]));
  });
}

for (const spec of targets) {
  const [route, name, mode = "full"] = spec.split("::");
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  // Settle scroll-triggered reveals by walking the page to the bottom.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: mode === "full" });
  console.log("shot", name);
}

await browser.close();
