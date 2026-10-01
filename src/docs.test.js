// The documents that are made from the source, or that quote it, checked against it.
// Plain JavaScript, so that reading files needs no Node types. `pnpm docs:make` rewrites what is made.
import { readFileSync, writeFileSync } from "node:fs";
import process from "node:process";

import { describe, expect, it } from "vitest";

import { FAMILY } from "../scripts/family-template.mjs";
import * as domino from "./index.ts";
import { TILE_SOUND_DATA } from "./sounds.ts";
import * as sounds from "./tile-sounds.ts";

const { CLI_MOVES_MOST, DOMINO_STRINGS, TRAIN_NAME_MOST, TRAIN_PIP_BASE, TRAIN_SETS, VERSION, computerMove, decodeTrain, encodeTrain, everyTile, handSizeFor, legalPlays, mexicanOf, playTrain, roundsFor, runCli, startTrain, trainNews, trainSeatName, trainStatus } = domino;

const readme = readFileSync("README.md", "utf8");
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const cell = (text) => text.replace(/\\\|/g, "|").trim();

/** The rows of the table under a heading: each row's cells. */
function table(heading, doc = readme) {
  const from = doc.indexOf(heading);
  if (from < 0) throw new Error(`no “${heading}”`);
  const rows = [];
  for (const line of doc.slice(from).split("\n").slice(1)) {
    if (line.startsWith("|")) rows.push(line.split(/(?<!\\)\|/).slice(1, -1).map(cell));
    else if (rows.length > 0) break;
  }
  return rows.slice(2);
}

/** The text of the fenced block of this language that holds `part`. */
function block(language, part) {
  const found = [...readme.matchAll(new RegExp(`\`\`\`${language}\\n([\\s\\S]*?)\`\`\``, "g"))].map((match) => match[1]).find((text) => text.includes(part));
  if (found === undefined) throw new Error(`no ${language} block with “${part}”`);
  return found;
}

/** A line of a README example: it must be there to the letter. */
const says = (line) => expect(readme, line).toContain(line);

const table2026 = () => startTrain(12, ["You", "", "", ""], 2026, undefined, [false, true, true, true]);

describe("the README in 30 seconds", () => {
  it("the lines run, and the game kept after its one move is the one in Saved games", () => {
    says('let game = startTrain(12, ["You", "", "", ""], 2026, undefined, [false, true, true, true])!;');
    says("game = playTrain(game, computerMove(game))!;");
    let game = table2026();
    expect(game).not.toBeNull();
    expect(legalPlays(game).length).toBeGreaterThan(0);
    game = playTrain(game, computerMove(game));
    expect(game).not.toBeNull();
    expect(block("json", '"seed":2026').trim()).toBe(encodeTrain(game));
    expect(decodeTrain(encodeTrain(game))).toEqual(game);
  });

  it("the terminal line plays a game out", () => {
    says("npx @johnmorrisdotca/domino play --seed 2026 --players 3 --set 9 --length short");
    expect(runCli(["play", "--seed", "2026", "--players", "3", "--set", "9", "--length", "short"]).code).toBe(0);
  });
});

describe("the README on the API alone", () => {
  it("every line comes to what its comment says", () => {
    says('let game = startTrain(9, ["Ann", "Ben", ""], 7, { length: "short", doubles: "chain", mexican: "ownFirst" }, [false, false, true])!;');
    const game = startTrain(9, ["Ann", "Ben", ""], 7, { length: "short", doubles: "chain", mexican: "ownFirst" }, [false, false, true]);
    expect(game).not.toBeNull();
    expect(legalPlays(game).every((play) => Number.isInteger(play.tile) && Number.isInteger(play.train))).toBe(true);
    says("playTrain(game, { kind: \"draw\" });        // null: the rules refuse a draw while a tile fits");
    expect(legalPlays(game).length).toBeGreaterThan(0);
    expect(playTrain(game, { kind: "draw" })).toBeNull();
    says('trainStatus(game, "en", 0);               // "Your turn. Tap a tile to lay it." (seat 0 is you)');
    expect(trainStatus(game, "en", 0)).toBe("Your turn. Tap a tile to lay it.");
    says("mexicanOf(game);                          // 3: the Mexican Train is numbered after the seats");
    expect(mexicanOf(game)).toBe(3);
    expect(decodeTrain(encodeTrain(game))).toEqual(game);
  });

  it("a changed save comes back null", () => {
    const kept = encodeTrain(playTrain(table2026(), computerMove(table2026())));
    expect(decodeTrain(kept)).not.toBeNull();
    expect(decodeTrain(kept.replace('"seed":2026', '"seed":2027'))).not.toEqual(decodeTrain(kept));
    expect(decodeTrain(kept.replace("p156.0", "p999.0"))).toBeNull();
    expect(decodeTrain("not a game")).toBeNull();
  });

  it("the plain page's script is the one the README shows, and deals a hand of tiles", () => {
    const html = block("html", "startTrain");
    expect(html).toContain('import { startTrain, tileWords } from "./node_modules/@johnmorrisdotca/domino/dist/index.js";');
    const game = startTrain(12, ["You", "", ""], 2026, undefined, [false, true, true]);
    expect(game.hands[0].map(domino.tileWords).join("  ")).toMatch(/^\d+–\d+( {2}\d+–\d+){14}$/);
  });
});

describe("the README on languages", () => {
  it("the three lines come to what their comments say", () => {
    let game = table2026();
    game = playTrain(game, computerMove(game));
    says('trainStatus(game, "ja", 0);        // "あなたの番です。牌をタップして置きます。"');
    expect(trainStatus(startTrain(12, ["You", "", "", ""], 2026), "ja", 0)).toBe("あなたの番です。牌をタップして置きます。");
    says('trainNews(game, "en", 0);          // "You laid 12–9 on Your train."  (after the first move)');
    expect(trainNews(game, "en", 0)).toBe("You laid 12–9 on Your train.");
    says('trainSeatName(game, 1, "en", 0);   // "Computer 2"');
    expect(trainSeatName(game, 1, "en", 0)).toBe("Computer 2");
  });
});

describe("the README's command line", () => {
  it("shows the help the package prints, word for word", () => {
    const from = readme.indexOf("```\nUsage: domino") + 4;
    expect(readme.slice(from, readme.indexOf("```", from))).toBe(DOMINO_STRINGS.en.cliUsage);
  });

  it("shows what a deal and a game say", () => {
    const shown = block("sh", "$ domino deal");
    const deal = runCli(["deal", "--seed", "2026", "--players", "3", "--set", "9"]).out;
    const play = runCli(["play", "--seed", "2026", "--players", "3", "--set", "9", "--length", "short"]).out;
    expect(shown).toBe(`$ domino deal --seed 2026 --players 3 --set 9\n${deal}$ domino play --seed 2026 --players 3 --set 9 --length short\n${play}`);
  });

  it("runCli's line is the shape it returns", () => {
    says('runCli(["deal", "--seed", "2026", "--players", "3", "--set", "9"]);   // { code: 0, out: "Double-nine, 3 players, …", err: "" }');
    const ran = runCli(["deal", "--seed", "2026", "--players", "3", "--set", "9"]);
    expect(ran.code).toBe(0);
    expect(ran.out.startsWith("Double-nine, 3 players, ")).toBe(true);
    expect(ran.err).toBe("");
  });
});

describe("the README on sounds", () => {
  it("the table of kinds is the kinds the player has, in order", () => {
    expect(table("## Sounds").map((row) => row[0].replaceAll("`", ""))).toEqual([...sounds.TILE_SOUND_KINDS]);
    for (const kind of sounds.TILE_SOUND_KINDS) expect(Object.keys(TILE_SOUND_DATA).some((name) => name.startsWith(`${kind}-`)), kind).toBe(true);
  });

  it("the example's calls are the player's", () => {
    for (const call of ['sounds.play("shuffle");', 'sounds.play("draw", { count: 7, gap: 120 });', 'sounds.play("lay");', 'sounds.play("knock");', "sounds.setMuted(!sounds.muted)"]) says(call);
    const silent = sounds.createTileSounds({ window: null });
    for (const kind of sounds.TILE_SOUND_KINDS) expect(() => silent.play(kind, { count: 7, gap: 120 })).not.toThrow();
    expect(silent.volume).toBe(0.6);
  });
});

describe("the README's tables", () => {
  it("the API table names only what the package exports, and the main entry's every value is in it", () => {
    const exported = new Set([...Object.keys(domino), ...Object.keys(sounds), "TILE_SOUND_DATA"]);
    const rows = table("## API");
    const named = rows.flatMap((row) => [...row[0].matchAll(/`(\w+)/g)].map((match) => match[1]));
    const types = new Set(["TrainGame", "TrainMove", "TrainOptions", "Domino", "Language"]);
    for (const name of named) expect(exported.has(name) || types.has(name), name).toBe(true);
    const unlisted = Object.keys(domino).filter((name) => !named.includes(name));
    expect(unlisted).toEqual([]);
  });

  it("the limits are the constants and the rules", () => {
    const rows = Object.fromEntries(table("## Limits").map((row) => [row[0], row]));
    const tiles = Object.values(TRAIN_SETS).map((set) => everyTile(set).length);
    expect(tiles).toEqual([55, 91, 136]);
    expect(rows.Sets[1]).toBe(`double-nine (${tiles[0]} tiles), double-twelve (${tiles[1]}), double-fifteen (${tiles[2]})`);
    expect(startTrain(12, ["a"])).toBeNull();
    expect(startTrain(12, ["a", "b"])).not.toBeNull();
    expect(startTrain(12, Array.from({ length: 8 }, () => "x"))).not.toBeNull();
    expect(startTrain(12, Array.from({ length: 9 }, () => "x"))).toBeNull();
    expect(rows["Players at a table"][1]).toBe("2 to 8");
    const hands = Object.values(TRAIN_SETS).flatMap((set) => [2, 3, 4, 5, 6, 7, 8].map((players) => handSizeFor(set, players)));
    expect(rows["Tiles in a hand"][1]).toBe(`${Math.min(...hands)} to ${Math.max(...hands)}, by the set and the players`);
    const rounds = Object.values(TRAIN_SETS).map((set) => [roundsFor(set, "full"), roundsFor(set, "short")]);
    expect(rows.Rounds[1]).toBe(`one for every double (${rounds.map((pair) => pair[0]).join(", ").replace(/, (\d+)$/, " or $1")}), or about half of them (${rounds.map((pair) => pair[1]).join(", ").replace(/, (\d+)$/, " or $1")})`);
    expect(rows["A seat's name"][1]).toBe(`${TRAIN_NAME_MOST} characters`);
    expect(rows["Moves a played game may take on the command line"][1]).toBe(CLI_MOVES_MOST.toLocaleString("en-US"));
    expect(rows["A tile"][1]).toContain(`${TRAIN_PIP_BASE - 1}`);
    expect(domino.tileOf(15, 15)).toBe(15 * TRAIN_PIP_BASE + 15);
    expect(runCli(["deal", "--seed", "4294967295"]).code).toBe(0);
    expect(runCli(["deal", "--seed", "4294967296"]).code).toBe(2);
    expect(runCli(["deal", "--seed", "0"]).code).toBe(0);
  });
});

describe("the family", () => {
  const section = readme.slice(readme.indexOf("### The family"), readme.indexOf("## Roadmap"));

  it("names every other package of the family, once, linked to its repository", () => {
    const listed = [...section.matchAll(/^- \[(\w+)\]\(https:\/\/github\.com\/johnmorrisdotca\/(\w+)\) \(([^)]+)\): /gm)];
    const siblings = FAMILY.filter((one) => one.id !== "domino");
    expect(listed.map((match) => match[2])).toEqual(siblings.map((one) => one.id));
    for (const match of listed) {
      const one = FAMILY.find((entry) => entry.id === match[2]);
      expect(match[1], match[2]).toBe(one.name);
      expect(match[3], match[2]).toBe(one.kana);
    }
    expect(FAMILY).toHaveLength(16);
  });
});

describe("the version", () => {
  it("is package.json's, and the changelog has it", () => {
    expect(VERSION).toBe(pkg.version);
    expect(readFileSync("CHANGELOG.md", "utf8")).toContain(`## [${VERSION}]`);
  });
});

describe("package.json", () => {
  it("names built files directly, has no dependencies, and needs Node 22 or later", () => {
    const pointed = [pkg.main, pkg.module, pkg.types, ...Object.values(pkg.bin), ...Object.values(pkg.exports).flatMap((entry) => Object.values(entry))];
    for (const file of pointed) expect(/^\.?\/?(dist|bin)\//.test(file), file).toBe(true);
    expect(pkg.dependencies).toBeUndefined();
    expect(pkg.engines.node).toBe(">=22");
  });

  it("has keywords that are many, lower case and not repeated, and a description that fits", () => {
    expect(pkg.keywords.length).toBeGreaterThan(30);
    expect(new Set(pkg.keywords).size).toBe(pkg.keywords.length);
    for (const word of pkg.keywords) expect(word).toBe(word.toLowerCase());
    expect(pkg.description.length).toBeLessThanOrEqual(400);
  });

  it("ships what the README says it ships", () => {
    for (const file of ["dist", "bin", "docs/credits.md", "README.md", "LICENSE", "CHANGELOG.md"]) expect(pkg.files).toContain(file);
  });
});

describe("docs/strings-ja.md", () => {
  const escape = (text) => text.replaceAll("|", "\\|").replaceAll("\n", "<br>");
  const lines = [
    "# Domino's words, in English and Japanese",
    "",
    "Made from `src/strings.ts` by `pnpm docs:make`; a test fails if the two differ, so this list is never out of date.",
    "",
    "**The Japanese has not yet been reviewed by a native reader.** If a line reads wrongly or unnaturally, please",
    "open a *Fix a translation* issue with the string's name. `{who}` and the other braces are filled in when shown.",
    "Names that begin `cli` are the command line's; the others are the table's.",
    "",
    "| Name | English | Japanese |",
    "| --- | --- | --- |",
    ...Object.keys(DOMINO_STRINGS.en).filter((key) => key !== "cliUsage").map((key) => `| \`${key}\` | ${escape(DOMINO_STRINGS.en[key])} | ${escape(DOMINO_STRINGS.ja[key])} |`),
    "",
    "## The command line's help",
    "",
    "`cliUsage`, in English:",
    "",
    "```",
    DOMINO_STRINGS.en.cliUsage.trimEnd(),
    "```",
    "",
    "and in Japanese:",
    "",
    "```",
    DOMINO_STRINGS.ja.cliUsage.trimEnd(),
    "```",
    "",
  ];
  const made = lines.join("\n");

  it("is what the source makes: run `pnpm docs:make` after changing a string", () => {
    if (process.env.UPDATE_DOCS === "1") writeFileSync("docs/strings-ja.md", made);
    expect(readFileSync("docs/strings-ja.md", "utf8")).toBe(made);
  });
});
