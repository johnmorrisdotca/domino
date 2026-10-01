// Runs the built command line as a person would: as a child process, on
// whatever system this is. `pnpm test:cli` builds first. The rules of the
// command line are tested as plain data in src/cli.test.ts; this is the part
// only a real process can show: the exit code, the two streams, standard
// input, the environment.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const bin = join(root, "bin", "domino.mjs");
const { version } = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
// An environment with no language of its own, so each case says what it means.
const bare = { ...process.env, LC_ALL: "", LC_MESSAGES: "", LANG: "en_US.UTF-8" };

let failed = 0;
function check(what, args, want, { input, env } = {}) {
  const ran = spawnSync(process.execPath, [bin, ...args], { input, encoding: "utf8", env: { ...bare, ...env } });
  const got = { code: ran.status, out: ran.stdout, err: ran.stderr };
  const problems = [];
  if (want.code !== undefined && got.code !== want.code) problems.push(`exit code ${got.code}, wanted ${want.code}`);
  for (const stream of ["out", "err"]) {
    const wanted = want[stream];
    if (wanted === undefined) continue;
    const ok = wanted instanceof RegExp ? wanted.test(got[stream]) : typeof wanted === "function" ? wanted(got[stream]) : got[stream] === wanted;
    if (!ok) problems.push(`${stream} was ${JSON.stringify(got[stream])}, wanted ${wanted instanceof RegExp ? wanted : JSON.stringify(wanted)}`);
  }
  if (problems.length > 0) failed += 1;
  console.log(`${problems.length === 0 ? "ok  " : "FAIL"} ${what}${problems.map((p) => `\n       ${p}`).join("")}`);
  return got;
}

check("the version", ["--version"], { code: 0, out: `${version}\n`, err: "" });
check("help", ["--help"], { code: 0, out: /^Usage: domino/, err: "" });
check("a seeded deal", ["deal", "--seed", "2026", "--players", "3", "--set", "9"], {
  code: 0,
  err: "",
  out: "Double-nine, 3 players, seed 2026\nRound 1 of 10, hub double 9\nComputer 1: 3-0 4-2 4-3 6-3 6-6 7-7 8-4 8-7 9-4 9-5\nComputer 2: 1-1 2-0 2-1 5-0 5-1 7-3 7-4 8-0 8-2 8-6\nComputer 3: 0-0 2-2 3-3 5-4 7-1 7-2 7-5 9-1 9-2 9-3\nBoneyard: 24 tiles\n",
});
const played = check("a game played out by computers", ["play", "--seed", "2026", "--players", "3", "--set", "9", "--length", "short", "--save"], { code: 0, err: "", out: /seed 2026, 5 rounds; moves made: 277\n[\s\S]*Winner: Computer 3 with 57 pips\.\n\nSaved game:\n\{"v":1,/ });
const saved = played.out.trim().split("\n").at(-1);
check("a saved game read back", ["check", saved], { code: 0, err: "", out: /moves made: 277[\s\S]*The game is over\./ });
check("a saved game on standard input", ["check", "--stdin", "--json"], { code: 0, out: (out) => JSON.parse(out).moves === 277 }, { input: `${saved}\n` });
check("a saved game replayed in words", ["replay", "--stdin"], { code: 0, out: (out) => out.startsWith("1. Computer ") && out.trimEnd().endsWith("won with 57 pips.") }, { input: saved });
check("a game the rules refuse is exit code 1", ["check", "{}"], { code: 1, out: "", err: "domino: that is not a game these rules can play out again\n" });
check("no seed: one is drawn and named on standard error", ["deal"], { code: 0, out: /^Double-twelve, 4 players, seed \d+\n/, err: /^domino: seed \d+ \(pass --seed \d+ to repeat this\)\n$/ });
check("a wrong option is exit code 2", ["deal", "--bogus"], { code: 2, out: "", err: /unknown option --bogus/ });
check("Japanese by flag", ["deal", "--seed", "1", "--lang", "ja"], { code: 0, out: /^ダブルトゥエルブ、4人、シード 1\n/ });
check("Japanese by LANG", ["--help"], { code: 0, out: /^使い方: domino/ }, { env: { LANG: "ja_JP.UTF-8" } });
check("English by flag over LANG", ["--help", "--lang", "en"], { code: 0, out: /^Usage: domino/ }, { env: { LANG: "ja_JP.UTF-8" } });

if (failed > 0) {
  console.log(`${failed} failed`);
  process.exit(1);
}
console.log("the command line does what it says, on", process.platform, process.version);
