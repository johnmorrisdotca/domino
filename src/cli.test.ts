import { describe, expect, it } from "vitest";

import { runCli } from "./cli.ts";
import { TRAIN_PHASES, moveCount, startTrain, trainTotals } from "./mexicanTrain/mexicanTrain.ts";
import { decodeTrain } from "./mexicanTrain/trainCodec.ts";
import { DOMINO_STRINGS } from "./strings.ts";
import { VERSION } from "./version.ts";

/** The command line's rules, as plain data: arguments in, what to print and the exit code out. */

const savedOf = (args: string[]) => {
  const ran = runCli([...args, "--save"]);
  expect(ran.code, ran.err).toBe(0);
  return ran.out.trim().split("\n").at(-1)!;
};

describe("the command line", () => {
  it("prints its version and its help, in the language asked for", () => {
    expect(runCli(["--version"])).toEqual({ code: 0, out: `${VERSION}\n`, err: "" });
    expect(runCli(["-h"]).out).toBe(DOMINO_STRINGS.en.cliUsage);
    expect(runCli(["--help", "--lang", "ja"]).out).toBe(DOMINO_STRINGS.ja.cliUsage);
    expect(runCli(["--help"], { env: { LANG: "ja_JP.UTF-8" } }).out).toBe(DOMINO_STRINGS.ja.cliUsage);
    expect(runCli(["--help", "--lang", "en"], { env: { LANG: "ja_JP.UTF-8" } }).out).toBe(DOMINO_STRINGS.en.cliUsage);
    expect(runCli(["--help"], { env: { LC_ALL: "en_US.UTF-8", LANG: "ja_JP.UTF-8" } }).out).toBe(DOMINO_STRINGS.en.cliUsage);
    expect(runCli(["--help"], { env: { LANG: "C" }, locale: "ja-JP" }).out).toBe(DOMINO_STRINGS.ja.cliUsage);
  });

  it("deals a seed the way the package does, and says so in words", () => {
    const ran = runCli(["deal", "--seed", "2026", "--players", "3", "--set", "9"]);
    expect(ran.code).toBe(0);
    expect(ran.out).toBe(`Double-nine, 3 players, seed 2026
Round 1 of 10, hub double 9
Computer 1: 3-0 4-2 4-3 6-3 6-6 7-7 8-4 8-7 9-4 9-5
Computer 2: 1-1 2-0 2-1 5-0 5-1 7-3 7-4 8-0 8-2 8-6
Computer 3: 0-0 2-2 3-3 5-4 7-1 7-2 7-5 9-1 9-2 9-3
Boneyard: 24 tiles
`);
    const game = startTrain(9, ["", "", ""], 2026)!;
    expect(game.hands.map((hand) => hand.length)).toEqual([10, 10, 10]);
    expect(game.boneyard.length).toBe(24);
  });

  it("deals as JSON, every hand and the boneyard's size", () => {
    const data = JSON.parse(runCli(["deal", "--json", "--seed", "7", "--players", "2", "--set", "12", "--doubles", "chain", "--mexican", "own-first", "--length", "short"]).out);
    expect(data).toMatchObject({ format: 1, generator: `domino ${VERSION}`, set: 12, seed: 7, engine: 12, options: { length: "short", doubles: "chain", mexican: "ownFirst" } });
    expect(data.hands).toHaveLength(2);
    expect(data.hands[0]).toHaveLength(15);
    expect(data.boneyard).toBe(91 - 1 - 30);
    for (const tile of data.hands.flat()) expect(tile).toMatch(/^\d{1,2}-\d{1,2}$/);
  });

  it("plays a game out, the same one for the same seed, and writes its scores and its winner", () => {
    const one = runCli(["play", "--seed", "2026", "--players", "3", "--set", "9", "--length", "short"]);
    const two = runCli(["play", "--seed", "2026", "--players", "3", "--set", "9", "--length", "short"]);
    expect(one).toEqual(two);
    expect(one.out).toContain("Double-nine, 3 players, seed 2026, 5 rounds; moves made: 277");
    expect(one.out).toContain("Winner: Computer 3 with 57 pips.");
    expect(one.out).toMatch(/^Total {5}\s+88\s+117\s+57$/m);
  });

  it("writes the saved game on the last line, and `check` reads it back to the same totals", () => {
    const saved = savedOf(["play", "--seed", "9", "--players", "2", "--set", "9", "--length", "short"]);
    const game = decodeTrain(saved)!;
    expect(game.phase).toBe(TRAIN_PHASES.finished);
    const checked = runCli(["check", saved]);
    expect(checked.code).toBe(0);
    expect(checked.out).toContain(`moves made: ${moveCount(game)}`);
    expect(checked.out).toContain("The game is over.");
    expect(checked.out).toMatch(/^Total {4}/m);
    const json = JSON.parse(runCli(["check", "--json", saved]).out);
    expect(json.totals).toEqual(trainTotals(game));
    expect(json.winners).toEqual(game.winners);
    expect(json.phase).toBe("finished");
    expect(json.toPlay).toBeNull();
  });

  it("reads a saved game from standard input, and says where a game half played stands", () => {
    const saved = savedOf(["play", "--seed", "3", "--players", "2", "--set", "9", "--length", "short"]);
    const cut = JSON.parse(saved);
    cut.moves = cut.moves.split(",").slice(0, 20).join(",");
    const half = JSON.stringify(cut);
    const checked = runCli(["check", "--stdin"], { stdin: `${half}\n` });
    expect(checked.code).toBe(0);
    expect(checked.out).toMatch(/moves made: 20/);
    expect(checked.out).toMatch(/Round 1 of 5 is being played; Computer \d is to play\./);
    expect(JSON.parse(runCli(["check", "--stdin", "--json"], { stdin: half }).out)).toMatchObject({ phase: "playing", moves: 20, round: 1 });
  });

  it("replays every move in words, ending on how the game stands", () => {
    const saved = savedOf(["play", "--seed", "3", "--players", "2", "--set", "9", "--length", "short"]);
    const replayed = runCli(["replay", saved]);
    expect(replayed.code).toBe(0);
    const lines = replayed.out.trim().split("\n");
    expect(lines[0]).toMatch(/^1\. Computer \d laid \d+–\d+ on /);
    expect(lines.at(-1)).toMatch(/^Game over\. Computer \d won with \d+ pips\.$/);
    expect(lines.length).toBe(moveCount(decodeTrain(saved)!) + 1);
    expect(runCli(["replay", saved, "--lang", "ja"]).out.split("\n")[0]).toMatch(/^1\. コンピューター\d(が|は)/);
  });

  it("tells every move of a played game with --moves", () => {
    const told = runCli(["play", "--seed", "4", "--players", "2", "--set", "9", "--length", "short", "--moves"]).out;
    expect(told).toMatch(/^1\. Computer \d (laid|drew|passed)/m);
    expect(told).toMatch(/dealt: the hub double is 8\./);
  });

  it("refuses a saved game the rules will not play out, with exit code 1", () => {
    for (const bad of ["{}", "not a game", '{"v":1,"set":9,"options":{"length":"short","doubles":"one","mexican":"any"},"seed":1,"players":["",""],"computers":[true,true],"moves":"p999.0"}']) {
      expect(runCli(["check", bad])).toEqual({ code: 1, out: "", err: "domino: that is not a game these rules can play out again\n" });
    }
    const saved = savedOf(["play", "--seed", "3", "--players", "2", "--set", "9", "--length", "short"]);
    const tampered = saved.replace(/"moves":"p(\d+)\.(\d)/, (_, tile, train) => `"moves":"p${Number(tile) + 1}.${train}`);
    expect(tampered).not.toBe(saved);
    expect(runCli(["replay", tampered]).code).toBe(1);
  });

  it("names a seed it had to draw, on standard error, so the run can be repeated", () => {
    const ran = runCli(["deal"], { random: () => 0.5 });
    expect(ran.code).toBe(0);
    expect(ran.err).toBe("domino: seed 1073741824 (pass --seed 1073741824 to repeat this)\n");
    expect(ran.out).toBe(runCli(["deal", "--seed", "1073741824"]).out);
    expect(runCli(["deal", "--seed", "5"]).err).toBe("");
    expect(runCli(["deal"], { random: () => 0.5, env: { LANG: "ja_JP.UTF-8" } }).err).toBe("domino: シード 1073741824（--seed 1073741824 で同じ結果を再現できます）\n");
  });

  it("is exit code 2, with a pointer to the help, for a command that is wrong", () => {
    const tried = (args: string[]) => runCli(args);
    expect(tried([])).toEqual({ code: 2, out: "", err: "domino: say what to do: deal, play, check or replay\nTry `domino --help`.\n" });
    expect(tried(["shuffle"]).err).toContain("“shuffle” is not a command");
    expect(tried(["deal", "--bogus"]).err).toContain("unknown option --bogus");
    expect(tried(["deal", "--seed"]).err).toContain("--seed needs a value");
    expect(tried(["deal", "--set", "10"]).err).toContain("--set takes 9, 12 or 15");
    expect(tried(["deal", "--players", "1"]).err).toContain("--players takes a whole number from 2 to 8");
    expect(tried(["deal", "--players", "9"]).code).toBe(2);
    expect(tried(["deal", "--seed", "-1"]).err).toContain("--seed takes a whole number");
    expect(tried(["deal", "--seed", "4294967296"]).code).toBe(2);
    expect(tried(["deal", "--length", "long"]).err).toContain("--length takes one of: full, short");
    expect(tried(["deal", "--doubles", "two"]).err).toContain("--doubles takes one of: one, chain");
    expect(tried(["deal", "--mexican", "never"]).err).toContain("--mexican takes one of: any, own-first");
    expect(tried(["deal", "--lang", "fr"]).err).toContain("--lang takes en or ja");
    expect(tried(["check"]).err).toContain("there is no saved game to read");
    expect(tried(["check", "--stdin"]).code).toBe(2);
    expect(tried(["deal", "--bogus", "--lang", "ja"]).err).toContain("不明なオプションです: --bogus");
  });

  it("takes an option as --name=value too, and both spellings of the Mexican Train rule", () => {
    expect(runCli(["deal", "--seed=7", "--set=9", "--players=2"]).out).toBe(runCli(["deal", "--seed", "7", "--set", "9", "--players", "2"]).out);
    expect(JSON.parse(runCli(["deal", "--json", "--seed", "1", "--mexican", "ownFirst"]).out).options.mexican).toBe("ownFirst");
  });
});
