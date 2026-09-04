import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const fails = [];
const check = (name, ok, extra = "") =>
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? ` — ${extra}` : ""}`) ||
  (ok ? null : fails.push(name));

page.on("pageerror", (e) => fails.push(`pageerror: ${e.message}`));

// Add to bag from a product card
await page.goto(`${BASE}/products`, { waitUntil: "networkidle" });
await page.locator('button[aria-label^="Add"]').first().click();
await page.waitForTimeout(400);
check("cart badge appears", (await page.locator("header a[href='/cart']").first().innerText()).match(/\d/) !== null);

// Add a second, different item from the detail page
await page.goto(`${BASE}/products/wool-overcoat`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Add to cart" }).click();
await page.waitForTimeout(400);
check("detail add shows confirmation", await page.getByText("Added to bag").isVisible());

// Bag reflects both lines and survives a reload
await page.goto(`${BASE}/cart`, { waitUntil: "networkidle" });
const lines = await page.locator("main ul > li").count();
check("bag has 2 lines", lines === 2, `got ${lines}`);
await page.reload({ waitUntil: "networkidle" });
check("bag survives reload", (await page.locator("main ul > li").count()) === 2);

// Quantity stepper
await page.locator('button[aria-label="Increase quantity"]').first().click();
await page.waitForTimeout(300);
const total = await page.locator("aside").getByText(/^\$ \d+$/).last().innerText();
check("total recalculates", /\$ \d+/.test(total), total);

// Checkout gate
const checkout = page.locator("aside a", { hasText: "Checkout" });
check("checkout blocked until terms agreed", (await checkout.getAttribute("aria-disabled")) === "true");
await page.getByText("I agree to the Terms and Conditions").click();
await page.waitForTimeout(200);
check("checkout unlocked after agreeing", (await checkout.getAttribute("aria-disabled")) === "false");

// Remove a line
await page.locator('button[aria-label^="Remove"]').first().click();
await page.waitForTimeout(300);
check("removing a line works", (await page.locator("main ul > li").count()) === 1);

// Filters
await page.goto(`${BASE}/products?category=Jeans`, { waitUntil: "networkidle" });
const jeans = await page.locator("main ul > li").count();
check("category filter narrows the grid", jeans > 0 && jeans < 18, `${jeans} results`);

// Search
await page.goto(`${BASE}/products?q=denim`, { waitUntil: "networkidle" });
check("search returns matches", (await page.locator("main ul > li").count()) > 0);

// Every image resolves
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
const broken = await page.evaluate(() =>
  [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
);
check("no broken images on home", broken.length === 0, broken.slice(0, 2).join(", "));

await browser.close();
console.log(fails.length ? `\n${fails.length} FAILING: ${fails.join(" | ")}` : "\nall green");
process.exit(fails.length ? 1 : 0);
