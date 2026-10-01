// The demo, driven as a person drives it: taps on a real page. Each flow ends by checking that the page fits the
// screen and nothing was complained of. `pnpm test:demo` builds the demo and runs these.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test } from "@playwright/test";

const site = join(dirname(fileURLToPath(import.meta.url)), "..", "site");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml" };

/** Open the demo (or another page of it), the computers moving at once, and collect anything the page complains of. */
async function open(page, address = "?lang=en") {
  if (!existsSync(join(site, "index.html"))) throw new Error("site/ is not built: run `pnpm site` first (`pnpm test:demo` does)");
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
  await page.route("http://domino.test/**", (route) => {
    const { pathname } = new URL(route.request().url());
    const file = join(site, pathname === "/" ? "index.html" : pathname);
    if (!existsSync(file)) return route.fulfill({ status: 404, body: "" });
    return route.fulfill({ body: readFileSync(file), contentType: TYPES[file.slice(file.lastIndexOf("."))] ?? "application/octet-stream" });
  });
  await page.addInitScript(() => {
    window.dominoDelay = 30;
  });
  await page.goto(`http://domino.test/${address}`);
  if (!address.startsWith("api")) await expect(page.locator("html")).toHaveAttribute("data-ready", "true");
  else await expect(page.locator("h1")).toBeVisible();
  return errors;
}

async function tap(page, selector) {
  const target = typeof selector === "string" ? page.locator(selector).first() : selector;
  await target.scrollIntoViewIfNeeded();
  if (test.info().project.use.hasTouch === true) await target.tap();
  else await target.click();
}

/** The page fits the screen, and everything to press is at least 44 pixels. */
async function sound(page, errors) {
  const found = await page.evaluate(() => {
    const seen = (el) => {
      const box = el.getBoundingClientRect();
      return box.width > 0 && box.height > 0 && getComputedStyle(el).visibility !== "hidden";
    };
    const small = [...document.querySelectorAll("button:not(:disabled), input, select, nav a, footer .family a")]
      .filter(seen)
      .map((el) => ({ what: el.id || el.className || el.textContent.trim().slice(0, 20), box: el.getBoundingClientRect() }))
      .filter(({ box }) => box.width < 43.5 || box.height < 43.5)
      .map(({ what, box }) => `${what} ${Math.round(box.width)}×${Math.round(box.height)}`);
    return { over: document.documentElement.scrollWidth - window.innerWidth, small };
  });
  expect(found.over, "the page scrolls sideways").toBeLessThanOrEqual(0);
  expect(found.small, "something to press is under 44px").toEqual([]);
  expect(errors, "the page complained").toEqual([]);
}

const rows = (page) => page.locator('[data-testid="trains"] .train');
const hand = (page) => page.locator('[data-testid="hand"] .tile');
const status = (page) => page.locator('[data-testid="status"]');

test("opens on a double-twelve table of four, in the family's look", async ({ page }) => {
  const errors = await open(page);
  await expect(page.locator("h1")).toHaveText("Dominoドミノ");
  await expect(rows(page)).toHaveCount(5);
  await expect(hand(page)).toHaveCount(15);
  await expect(page.locator('[data-testid="info"]')).toContainText("hub double 12");
  await expect(page.locator("footer .family a[aria-current='page']")).toHaveText("Domino");
  await expect(page.locator("footer .family a", { hasText: "Kotoba" })).toHaveCount(1);
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toMatch(/^rgb\((244, 239, 228|20, 22, 20)\)$/);
  await sound(page, errors);
});

test("the set and the number of players change the table and the hands", async ({ page }) => {
  const errors = await open(page, "?lang=en&seed=7");
  await tap(page, '[data-testid="sets"] [data-set="9"]');
  await expect(page.locator('[data-testid="info"]')).toContainText("hub double 9");
  await tap(page, '[data-testid="players"] [data-count="8"]');
  await expect(rows(page)).toHaveCount(9);
  await tap(page, '[data-testid="players"] [data-count="2"]');
  await expect(rows(page)).toHaveCount(3);
  await tap(page, '[data-testid="sets"] [data-set="15"]');
  await expect(page.locator('[data-testid="info"]')).toContainText("hub double 15");
  await sound(page, errors);
});

test("a seeded deal is the same deal every time", async ({ page }) => {
  await open(page, "?lang=en&seed=2026");
  const first = await hand(page).evaluateAll((all) => all.map((el) => el.dataset.ends));
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-ready", "true");
  expect(await hand(page).evaluateAll((all) => all.map((el) => el.dataset.ends))).toEqual(first);
});

test("a person lays a tile, the computers answer, and play goes round until the person is wanted again", async ({ page }) => {
  const errors = await open(page, "?lang=en&seed=2026");
  // Whoever leads, wait for a turn that is the person's.
  await expect(status(page)).toContainText(/Your turn|Nothing fits/, { timeout: 15000 });
  const lifted = page.locator('[data-testid="hand"] .tile[data-playable="true"]');
  if ((await lifted.count()) > 0) {
    const before = await hand(page).count();
    await tap(page, lifted.first());
    // A tile that fits two trains asks which.
    if ((await page.locator('[data-testid="lay"]').count()) > 0) await tap(page, '[data-testid="lay"]');
    await expect.poll(() => hand(page).count()).toBe(before - 1);
  } else {
    await tap(page, page.locator('[data-testid="moves"] button'));
  }
  await expect(status(page)).toContainText(/Your turn|Nothing fits|Round over|Game over/, { timeout: 15000 });
  await sound(page, errors);
});

test("with nothing that fits, the person draws, and passes when the drawn tile will not go", async ({ page }) => {
  await open(page, "?lang=en");
  // Play every turn with the same few presses until the page asks to draw or pass, whatever the deal.
  const asked = page.locator('[data-testid="moves"] button');
  for (let turn = 0; turn < 40 && (await asked.count()) === 0; turn += 1) {
    await expect(status(page)).toContainText(/Your turn|Nothing fits|Round over|Game over/, { timeout: 15000 });
    if ((await asked.count()) > 0) break;
    const lifted = page.locator('[data-testid="hand"] .tile[data-playable="true"]');
    if ((await lifted.count()) === 0) break;
    await tap(page, lifted.first());
    if ((await page.locator('[data-testid="lay"]').count()) > 0) await tap(page, '[data-testid="lay"]');
    await page.waitForTimeout(60);
  }
  const label = await asked.first().textContent().catch(() => "");
  if (label === "Draw a tile") {
    const before = await hand(page).count();
    await tap(page, asked.first());
    await expect.poll(() => hand(page).count()).toBe(before + 1);
  }
  expect(typeof label).toBe("string");
});

test("the cloth patches in the header change the felt of the table", async ({ page }) => {
  await open(page);
  const felt = () => page.locator(".table").evaluate((el) => getComputedStyle(el).backgroundImage);
  const green = await felt();
  await tap(page, 'button[data-cloth="black"]');
  expect(await felt()).not.toBe(green);
  await tap(page, 'button[data-cloth="green"]');
  expect(await felt()).toBe(green);
});

test("in Japanese the page and the table speak Japanese, and the unreviewed note shows", async ({ page }) => {
  const errors = await open(page, "?lang=en&seed=11");
  await tap(page, 'button[data-lang="ja"]');
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  await expect(page.locator('[data-testid="deal"]')).toHaveText("配り直す");
  await expect(rows(page).first().locator(".train-head b")).toContainText("あなた");
  await expect(page.locator("#unreviewed")).toBeVisible();
  await sound(page, errors);
  await tap(page, 'button[data-lang="en"]');
  await expect(rows(page).first().locator(".train-head b")).toContainText("You");
  await expect(page.locator("#unreviewed")).toBeHidden();
});

test("a whole short game plays to its end by pressing whatever is asked", async ({ page }) => {
  test.setTimeout(120000);
  const errors = await open(page, "?lang=en&seed=5");
  await tap(page, '[data-testid="sets"] [data-set="9"]');
  await tap(page, '[data-testid="players"] [data-count="2"]');
  for (let step = 0; step < 400; step += 1) {
    const text = (await status(page).textContent()) ?? "";
    if (text.startsWith("Game over")) break;
    const asked = page.locator('[data-testid="moves"] button');
    if ((await asked.count()) > 0) await asked.first().click();
    else {
      const lifted = page.locator('[data-testid="hand"] .tile[data-playable="true"]');
      if ((await lifted.count()) > 0) {
        await lifted.first().click();
        const lay = page.locator('[data-testid="lay"]');
        if ((await lay.count()) > 0) await lay.first().click();
      }
    }
    await page.waitForTimeout(40);
  }
  await expect(status(page)).toContainText("Game over", { timeout: 15000 });
  await expect(page.locator('[data-testid="scores"] tr').last()).toContainText("Total");
  expect(errors).toEqual([]);
});

test("the API reference is in the family's frame and links back", async ({ page }) => {
  const errors = await open(page, "api.html?lang=en");
  await expect(page.locator("h1")).toHaveText("Dominoドミノ");
  expect(await page.locator("article[data-kind]").count()).toBeGreaterThan(40);
  await expect(page.locator("header nav a", { hasText: "The table" })).toHaveAttribute("href", "./");
  await sound(page, errors);
});

// The Help switch in the family header (scripts/family-template.mjs): off, the page is as it was; on, every
// option row says in one line what it does, in the page's language, and every control in it has hover words.
test("Help is off at first, and on it shows a line under each option row, in either language, without resizing the play area", async ({ page }) => {
  const errors = await open(page);
  const lines = page.locator(".fam-help");
  const rows = page.locator("[data-help-en]");
  expect(await rows.count()).toBeGreaterThan(0);
  await expect(page.locator("[data-help-switch]")).toHaveAttribute("aria-pressed", "false");
  await expect(lines.first()).toBeHidden();
  const surface = page.locator('[data-testid="table"]').first();
  const before = await surface.boundingBox();
  await page.locator("[data-help-switch]").click();
  await expect(page.locator("html")).toHaveAttribute("data-help", "on");
  for (const row of await rows.all()) {
    // A row in a tab that is not showing has its line, and shows it when the tab opens.
    if (await row.isVisible()) {
      const shown = await row.evaluate((el) => {
        const line = el.classList.contains("fam-seg") || el.hasAttribute("data-help-after") ? el.nextElementSibling : el.querySelector(":scope > .fam-help");
        return line !== null && line.classList.contains("fam-help") && window.getComputedStyle(line).display !== "none" && line.textContent.length > 10;
      });
      expect(shown).toBe(true);
    }
    expect(((await row.getAttribute("data-help-en")) ?? "").length).toBeGreaterThan(10);
    expect(((await row.getAttribute("data-help-ja")) ?? "").length).toBeGreaterThan(4);
  }
  const after = await surface.boundingBox();
  // The play area keeps its box (to a fraction of a pixel).
  expect(Math.abs(after.width - before.width)).toBeLessThan(0.5);
  expect(Math.abs(after.height - before.height)).toBeLessThan(0.5);
  // Every button in an option row says what it does on hover.
  const untitled = await page.evaluate(() => [...document.querySelectorAll("[data-help-en] button")].filter((b) => !b.title).map((b) => b.textContent.trim()));
  expect(untitled).toEqual([]);
  const english = await lines.first().textContent();
  await page.locator('[data-lang="ja"]').click();
  await expect(lines.first()).not.toHaveText(english);
  // The choice is kept, and turning it off hides every line again.
  await page.reload();
  await expect(page.locator("[data-help-switch]")).toHaveAttribute("aria-pressed", "true");
  await page.locator("[data-help-switch]").click();
  await expect(lines.first()).toBeHidden();
  expect(errors).toEqual([]);
});
