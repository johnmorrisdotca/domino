// Takes the pictures the README shows, from the built demo in `site/`: `pnpm screenshots:readme` (builds the demo, then runs this).
// The family's standard is in johnmorrisdotca/.github (README-STANDARD.md); the shared part is readme-pictures-lib.mjs.
// The page is served to a browser without a port, never fetched from the live site, and the same each run: the deal is named by
// the address (set, players, seed), the computers answer at once (`window.dominoDelay = 0`), and every turn the pictures play is
// played as a person does, by pressing a lifted tile, and waited for on the page's own marks, never on a clock.
// Output: docs/images/<subject>-<desk|phone>-<light|dark>.webp.
import { takePictures } from "./readme-pictures-lib.mjs";

const READY = 'html[data-ready="true"] [data-testid="hand"]';
const address = (query, lang = "en") => `/?lang=${lang}&help=off&seed=2026&${query}`;
const TABLE = '[data-testid="table"]';
const LIFTED = '[data-testid="hand"] .tile[data-playable="true"]';
const ASKED = '[data-testid="moves"] button';

/** What the table looks like now, so that a move can be waited for. */
const looks = (page) => page.evaluate(() => `${document.querySelectorAll('[data-testid="trains"] .tile').length}|${document.querySelectorAll('[data-testid="hand"] .tile').length}|${document.querySelector('[data-testid="status"]')?.textContent}`);

/** Play `count` turns as a person does: lay a lifted tile (on the train offered), else press what is asked, and let the computers answer. Ends on a turn where a tile can be laid. */
async function play(page, count) {
  for (let turn = 0; turn < count + 8; turn += 1) {
    await page.waitForSelector(`${LIFTED}, ${ASKED}`);
    if (turn >= count && (await page.locator(LIFTED).count()) > 0) return;
    const before = await looks(page);
    if ((await page.locator(LIFTED).count()) > 0) {
      await page.locator(LIFTED).first().click();
      if ((await page.locator('[data-testid="lay"]').count()) > 0) await page.locator('[data-testid="lay"]').first().click();
    } else await page.locator(ASKED).first().click();
    await page.waitForFunction((was) => `${document.querySelectorAll('[data-testid="trains"] .tile').length}|${document.querySelectorAll('[data-testid="hand"] .tile').length}|${document.querySelector('[data-testid="status"]')?.textContent}` !== was, before);
    await page.waitForSelector('[data-train="0"][data-turn="true"], [data-testid="moves"] button');
  }
}

const scrollTo = (selector) => (page) => page.locator(selector).evaluate((element) => window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY - 16));
const noDelay = () => { window.dominoDelay = 0; };

await takePictures({
  shots: [
    // A few turns into a game of Mexican Train for three, from the top of the page, so the header and the set-up show. On a phone, in Japanese, scrolled to the table.
    {
      subject: "hero",
      views: ["desk", "phone"],
      url: address("set=9&players=3"),
      init: noDelay,
      ready: READY,
      height: 960,
      async prepare(page, { view }) {
        if (view === "phone") {
          await page.goto(`http://domino.test${address("set=9&players=3", "ja")}`);
          await page.waitForSelector(READY);
          await play(page, 4);
          await scrollTo(TABLE)(page);
        } else {
          await play(page, 4);
          await page.evaluate(() => window.scrollTo(0, 0));
        }
      },
    },
    // The table in the middle of a round: a train for every seat and the Mexican Train, the hand with the tiles that may be laid lifted.
    { subject: "table", views: ["desk"], url: address("set=12&players=4"), init: noDelay, ready: READY, target: TABLE, prepare: (page) => play(page, 6) },
    // The set-up: the set, the number of players, the rounds, the doubles rule and when the Mexican Train may be started.
    { subject: "set-up", views: ["desk"], url: address("set=12&players=4"), ready: READY, target: ".setup" },
    // The largest table: a double-fifteen set for eight, every train in its own row and a hand of fifteen.
    { subject: "big-table", views: ["desk"], url: address("set=15&players=8"), ready: READY, target: TABLE },
    // The words and the tiles in Japanese, on a phone, at the first turn.
    { subject: "japanese", views: ["phone"], url: address("set=9&players=3", "ja"), ready: READY, target: TABLE },
    // The code for the game on the table, the same deal on the command line, and the game kept as text.
    { subject: "using-it", views: ["desk"], url: address("set=9&players=3"), init: noDelay, ready: READY, target: "section.more", prepare: (page) => play(page, 2) },
  ],
});
