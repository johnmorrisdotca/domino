// Takes the pictures the README shows, from the built demo in `site/`: `pnpm pictures` (builds the demo, then runs this).
// The page is served to a browser without a port, never fetched from the live site, and the same each run:
// the deal is seeded (`?seed=`), the computers move at once and motion is reduced.
// Output: docs/desktop.jpg (1280 wide, light, English) and docs/phone.jpg (390 by 844, dark, Japanese).
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "@playwright/test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const site = join(root, "site");
const docs = join(root, "docs");
const host = "http://domino.test";
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml" };
const QUALITY = 70;

if (!existsSync(join(site, "index.html"))) throw new Error("site/ is not built: run `pnpm pictures` (it builds the demo first)");
const browser = await chromium.launch();

/** Play `turns` turns as a person does: lay a lifted tile (on the train offered), else press what is asked, and let the computers answer.
 * It ends on a turn where a tile can be laid, so the picture shows a hand with tiles lifted. */
async function play(page, turns) {
  const lifted = page.locator('[data-testid="hand"] .tile[data-playable="true"]');
  const asked = page.locator('[data-testid="moves"] button');
  for (let n = 0; n < turns + 6; n += 1) {
    await page.waitForFunction(() => document.querySelector('[data-testid="hand"] .tile[data-playable="true"]') || document.querySelector('[data-testid="moves"] button'));
    if (n >= turns && (await lifted.count()) > 0) return;
    if ((await lifted.count()) > 0) {
      await lifted.first().click();
      if ((await page.locator('[data-testid="lay"]').count()) > 0) await page.locator('[data-testid="lay"]').first().click();
    } else await asked.first().click();
    await page.waitForTimeout(200);
  }
}

async function shot({ width, height, colorScheme, lang, turns, path, scrollTo }) {
  const context = await browser.newContext({ viewport: { width, height }, colorScheme, reducedMotion: "reduce", locale: "en-US", deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.route(`${host}/**`, (route) => {
    const { pathname } = new URL(route.request().url());
    const file = join(site, pathname === "/" ? "index.html" : pathname);
    if (!existsSync(file)) return route.fulfill({ status: 404, body: "" });
    return route.fulfill({ body: readFileSync(file), contentType: TYPES[file.slice(file.lastIndexOf("."))] ?? "application/octet-stream" });
  });
  await page.addInitScript(() => {
    window.dominoDelay = 0;
  });
  await page.goto(`${host}/?lang=${lang}&seed=2026`);
  await page.locator("html[data-ready='true']").waitFor({ state: "attached" });
  // A double-nine set for three keeps the table short enough to show under the header.
  await page.locator('[data-testid="sets"] [data-set="9"]').click();
  await page.locator('[data-testid="players"] [data-count="3"]').click();
  await play(page, turns);
  if (scrollTo) await page.locator(scrollTo).evaluate((element) => window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY - 16));
  else await page.evaluate(() => window.scrollTo(0, 0));
  await page.mouse.move(0, 0);
  await page.screenshot({ path, type: "jpeg", quality: QUALITY });
  await context.close();
}

// From the top of the page, so the header, the language chooser and the cloth patches show, a few turns into a game of Mexican Train.
await shot({ width: 1280, height: 960, colorScheme: "light", lang: "en", turns: 4, path: join(docs, "desktop.jpg") });
// The phone is scrolled to the table.
await shot({ width: 390, height: 844, colorScheme: "dark", lang: "ja", turns: 4, path: join(docs, "phone.jpg"), scrollTo: '[data-testid="table"]' });
await browser.close();
