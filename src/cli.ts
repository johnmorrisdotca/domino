import { endsOf } from "./mexicanTrain/dominoes.ts";
import { TRAIN_DEFAULT_OPTIONS, TRAIN_DOUBLES, TRAIN_LENGTHS, TRAIN_MEXICAN } from "./mexicanTrain/mexicanTrain.constants.ts";
import type { Domino, TrainGame, TrainOptions } from "./mexicanTrain/mexicanTrain.types.ts";
import { TRAIN_PHASES, moveCount, movesOf, playTrain, startTrain, trainTotals } from "./mexicanTrain/mexicanTrain.ts";
import { decodeTrain, encodeTrain } from "./mexicanTrain/trainCodec.ts";
import { computerMove } from "./mexicanTrain/trainComputer.ts";
import { DOMINO_STRINGS, dominoLanguage, dominoSay, type Language } from "./strings.ts";
import { VERSION } from "./version.ts";
import { trainNews, trainSeatName, trainSetLabel, trainStatus } from "./words.ts";

/**
 * The command line, as a pure function: arguments and surroundings in, what
 * to print and the exit code out. `bin/domino.mjs` is the few lines that hand
 * it the real process. Nothing here touches a file, a terminal or the
 * network, so every line of it is tested as plain data.
 */

/** What the command line is run in. All of it is optional. */
export type CliSurroundings = {
  /** The environment, for the language: `LC_ALL`, `LC_MESSAGES` and `LANG`. */
  env?: Record<string, string | undefined>;
  /** Standard input, when `--stdin` asks for it: the saved game. */
  stdin?: string;
  /** The system's language where the environment names none: what `Intl` says, on Windows. */
  locale?: string;
  /** Where a seed comes from when none is given: a function like `Math.random`, which it is unless given. */
  random?: () => number;
};

/** What the command line came to. */
export type CliResult = {
  /** 0 when all went well, 1 when what was asked for could not be done, 2 when the command itself was wrong. */
  code: 0 | 1 | 2;
  /** For standard output. */
  out: string;
  /** For standard error. */
  err: string;
};

/** The most moves a played game may take before the command line gives up, far above any game the rules allow. */
export const CLI_MOVES_MOST = 100_000;

/** The language the command line speaks: `--lang`, or the environment's, or the system's; Japanese for `ja…`, English for anything else. */
export function cliLanguage(flag: string | undefined, env: Record<string, string | undefined> = {}, locale?: string): Language {
  const named = [flag, env.LC_ALL, env.LC_MESSAGES, env.LANG].find((value) => value !== undefined && value !== "" && value !== "C" && value !== "POSIX" && !value.startsWith("C."));
  return dominoLanguage(named ?? locale);
}

const FLAGS_WITH_VALUES: Record<string, string> = { "-s": "seed", "--seed": "seed", "--set": "set", "--players": "players", "--length": "length", "--doubles": "doubles", "--mexican": "mexican", "--lang": "lang" };
const FLAGS: Record<string, string> = { "--moves": "moves", "--save": "save", "--stdin": "stdin", "-j": "json", "--json": "json", "-h": "help", "--help": "help", "-v": "version", "--version": "version" };
const COMMANDS = ["deal", "play", "check", "replay"] as const;

type Asked = { values: Record<string, string>; flags: Set<string>; words: string[]; wrong: { message: "cliUnknown" | "cliNeeds"; part: string } | null };

/** The arguments sorted into options and words. */
function sortArguments(args: readonly string[]): Asked {
  const asked: Asked = { values: {}, flags: new Set(), words: [], wrong: null };
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i] as string;
    const [name, inline] = arg.startsWith("--") && arg.includes("=") ? [arg.slice(0, arg.indexOf("=")), arg.slice(arg.indexOf("=") + 1)] : [arg, undefined];
    if (arg === "--") {
      asked.words.push(...args.slice(i + 1));
      break;
    }
    if (name in FLAGS_WITH_VALUES) {
      const value = inline ?? args[++i];
      if (value === undefined) {
        asked.wrong ??= { message: "cliNeeds", part: name };
        break;
      }
      asked.values[FLAGS_WITH_VALUES[name] as string] = value;
    } else if (name in FLAGS && inline === undefined) asked.flags.add(FLAGS[name] as string);
    // The first wrong option is the one reported; the rest are still read, so that the report comes in the language asked for.
    else if (arg.startsWith("-") && arg !== "-") asked.wrong ??= { message: "cliUnknown", part: arg };
    else asked.words.push(arg);
  }
  return asked;
}

const wholeNumber = (text: string | undefined, least: number, most: number): number | null => (text !== undefined && /^\d{1,10}$/.test(text) && Number(text) >= least && Number(text) <= most ? Number(text) : null);

/** A tile as text a program can read: the larger end first, "12-3". */
const tileText = (tile: Domino): string => {
  const [low, high] = endsOf(tile);
  return `${high}-${low}`;
};

/** A hand in the order a person sorts it: by the larger end, then the smaller. */
const sorted = (hand: readonly Domino[]): Domino[] =>
  [...hand].sort((x, y) => {
    const [xl, xh] = endsOf(x);
    const [yl, yh] = endsOf(y);
    return xh - yh || xl - yl;
  });

/** Names every seat, for a table the command line made. */
const seatNames = (game: TrainGame, language: Language): string[] => game.players.map((_, seat) => trainSeatName(game, seat, language));

/** Run the command line. See `domino --help` for what it takes. One seed serves the whole run, so the same command prints the same lines on every machine. */
export function runCli(args: readonly string[], around: CliSurroundings = {}): CliResult {
  const asked = sortArguments(args);
  const env = around.env ?? {};
  const lang = asked.values.lang;
  const language = cliLanguage(lang, env, around.locale);
  const t = DOMINO_STRINGS[language];
  const wrong = (message: string): CliResult => ({ code: 2, out: "", err: `domino: ${message}\n${t.cliTryHelp}\n` });
  const failed = (message: string): CliResult => ({ code: 1, out: "", err: `domino: ${message}\n` });
  if (asked.wrong !== null) return wrong(dominoSay(t[asked.wrong.message], { part: asked.wrong.part }));
  if (lang !== undefined && lang !== "en" && lang !== "ja") return wrong(t.cliLangBad);
  if (asked.flags.has("help")) return { code: 0, out: t.cliUsage, err: "" };
  if (asked.flags.has("version")) return { code: 0, out: `${VERSION}\n`, err: "" };
  const command = asked.words[0];
  if (command === undefined) return wrong(t.cliNoCommand);
  if (!(COMMANDS as readonly string[]).includes(command)) return wrong(dominoSay(t.cliCommandBad, { part: command }));
  const json = asked.flags.has("json");

  // A saved game: read it back through the rules, and say where it stands (`check`), or every move (`replay`).
  if (command === "check" || command === "replay") {
    const text = asked.flags.has("stdin") ? (around.stdin ?? "").trim() : asked.words.slice(1).join(" ").trim();
    if (text === "") return wrong(t.cliNoSaved);
    const game = decodeTrain(text);
    if (game === null) return failed(t.cliSavedBad);
    return command === "check" ? checkOut(game, language, json) : replayOut(game, language);
  }

  // A table: the set, the players, the seed and the house rules.
  const set = asked.values.set === undefined ? 12 : wholeNumber(asked.values.set, 9, 15);
  if (set === null || ![9, 12, 15].includes(set)) return wrong(t.cliSetBad);
  const players = asked.values.players === undefined ? 4 : wholeNumber(asked.values.players, 2, 8);
  if (players === null) return wrong(t.cliPlayersBad);
  let seed: number;
  let fresh = false;
  if (asked.values.seed === undefined) {
    seed = Math.floor((around.random ?? Math.random)() * 2_147_483_647) + 1;
    fresh = true;
  } else {
    const read = wholeNumber(asked.values.seed, 0, 4_294_967_295);
    if (read === null) return wrong(t.cliSeedBad);
    seed = read;
  }
  const options: TrainOptions = { ...TRAIN_DEFAULT_OPTIONS };
  const choose = (flag: "length" | "doubles" | "mexican", allowed: Record<string, string>, spelled: Record<string, string> = {}): string | null => {
    const value = asked.values[flag];
    if (value === undefined) return options[flag];
    const key = spelled[value] ?? value;
    return key in allowed ? key : null;
  };
  const length = choose("length", TRAIN_LENGTHS);
  const doubles = choose("doubles", TRAIN_DOUBLES);
  const mexican = choose("mexican", TRAIN_MEXICAN, { "own-first": "ownFirst" });
  if (length === null) return wrong(dominoSay(t.cliValueBad, { part: "--length", choices: Object.keys(TRAIN_LENGTHS).join(", ") }));
  if (doubles === null) return wrong(dominoSay(t.cliValueBad, { part: "--doubles", choices: Object.keys(TRAIN_DOUBLES).join(", ") }));
  if (mexican === null) return wrong(dominoSay(t.cliValueBad, { part: "--mexican", choices: "any, own-first" }));
  Object.assign(options, { length, doubles, mexican });

  const dealt = startTrain(set, Array.from({ length: players }, () => ""), seed, options, Array.from({ length: players }, () => true));
  if (dealt === null) return wrong(t.cliSetBad);
  const note = fresh ? `domino: ${dominoSay(t.cliFresh, { seed })}\n` : "";
  const done = command === "deal" ? dealOut(dealt, language, json) : playOut(dealt, language, json, asked.flags.has("moves"), asked.flags.has("save"));
  return { ...done, err: done.err + note };
}

/** The deal, written as lines: the hub, and every hand. */
function dealOut(game: TrainGame, language: Language, json: boolean): CliResult {
  const t = DOMINO_STRINGS[language];
  const names = seatNames(game, language);
  if (json) {
    const data = { format: 1, generator: `domino ${VERSION}`, set: game.set, players: names, seed: game.seed, options: game.options, engine: game.engine, hands: game.hands.map((hand) => sorted(hand).map(tileText)), boneyard: game.boneyard.length };
    return { code: 0, out: `${JSON.stringify(data, null, 2)}\n`, err: "" };
  }
  const lines = [
    dominoSay(t.cliDeal, { set: trainSetLabel(game.set, language) ?? game.set, players: game.players.length, seed: game.seed }),
    dominoSay(t.round, { n: 1, total: game.rounds, engine: game.engine }),
    ...game.hands.map((hand, seat) => dominoSay(t.cliSeat, { who: names[seat] as string, tiles: sorted(hand).map(tileText).join(" ") })),
    dominoSay(t.cliBoneyard, { n: game.boneyard.length }),
  ];
  return { code: 0, out: `${lines.join("\n")}\n`, err: "" };
}

/** A table of scores, one row to a round and a row of totals, in columns. */
function scoreTable(game: TrainGame, language: Language): string[] {
  const t = DOMINO_STRINGS[language];
  const names = seatNames(game, language);
  const rows = [[t.hub, ...names], ...game.results.map((result) => [String(result.engine), ...result.pips.map((pips, seat) => `${pips}${result.out === seat ? "*" : ""}`)]), [t.total, ...trainTotals(game).map(String)]];
  const widths = rows[0]!.map((_, column) => Math.max(...rows.map((row) => [...(row[column] as string)].length)));
  return rows.map((row) => row.map((cell, column) => (column === 0 ? cell.padEnd(widths[column]!) : cell.padStart(widths[column]!))).join("  ").trimEnd());
}

/** The winners' line. */
function winnerLine(game: TrainGame, language: Language): string {
  const t = DOMINO_STRINGS[language];
  const who = game.winners.map((seat) => trainSeatName(game, seat, language)).join(", ");
  return dominoSay(game.winners.length === 1 ? t.cliWinner : t.cliWinners, { who, pips: Math.min(...trainTotals(game)) });
}

/** A game played out by the computers. */
function playOut(start: TrainGame, language: Language, json: boolean, moves: boolean, save: boolean): CliResult {
  const t = DOMINO_STRINGS[language];
  let game = start;
  const told: string[] = [];
  while (game.phase !== TRAIN_PHASES.finished) {
    if (moveCount(game) >= CLI_MOVES_MOST) return { code: 1, out: "", err: `domino: ${t.cliSavedBad}\n` };
    const next = playTrain(game, computerMove(game));
    if (next === null) return { code: 1, out: "", err: `domino: ${t.cliSavedBad}\n` };
    game = next;
    if (moves) {
      told.push(`${moveCount(game)}. ${trainNews(game, language)}`);
    }
  }
  if (json) return { code: 0, out: `${JSON.stringify(summary(game, language, true), null, 2)}\n`, err: "" };
  const head = dominoSay(t.cliPlayed, { set: trainSetLabel(game.set, language) ?? game.set, players: game.players.length, seed: game.seed, rounds: game.rounds, moves: moveCount(game) });
  const lines = [head, ...(moves ? ["", ...told, ""] : []), ...scoreTable(game, language), "", winnerLine(game, language), ...(save ? ["", t.cliSaved, encodeTrain(game)] : [])];
  return { code: 0, out: `${lines.join("\n")}\n`, err: "" };
}

/** What a game comes to, as data for `--json`. */
function summary(game: TrainGame, language: Language, saved: boolean): Record<string, unknown> {
  return {
    format: 1,
    generator: `domino ${VERSION}`,
    set: game.set,
    players: seatNames(game, language),
    computers: game.computers,
    seed: game.seed,
    options: game.options,
    rounds: game.rounds,
    round: game.round + 1,
    moves: moveCount(game),
    phase: game.phase,
    toPlay: game.phase === TRAIN_PHASES.playing ? game.toPlay : null,
    results: game.results.map((result) => ({ hub: result.engine, pips: result.pips, ending: result.ending, out: result.out })),
    totals: trainTotals(game),
    winners: game.winners,
    ...(saved ? { saved: encodeTrain(game) } : {}),
  };
}

/** Where a kept game stands. */
function checkOut(game: TrainGame, language: Language, json: boolean): CliResult {
  const t = DOMINO_STRINGS[language];
  if (json) return { code: 0, out: `${JSON.stringify(summary(game, language, false), null, 2)}\n`, err: "" };
  const where =
    game.phase === TRAIN_PHASES.finished
      ? t.cliPhaseFinished
      : dominoSay(game.phase === TRAIN_PHASES.roundOver ? t.cliPhaseRoundOver : t.cliPhasePlaying, { n: game.round + 1, total: game.rounds, who: trainSeatName(game, game.toPlay, language) });
  const lines = [dominoSay(t.cliPlayed, { set: trainSetLabel(game.set, language) ?? game.set, players: game.players.length, seed: game.seed, rounds: game.rounds, moves: moveCount(game) }), where];
  if (game.results.length > 0) lines.push("", ...scoreTable(game, language));
  if (game.phase === TRAIN_PHASES.finished) lines.push("", winnerLine(game, language));
  return { code: 0, out: `${lines.join("\n")}\n`, err: "" };
}

/** Every move of a kept game, in words, played again from its seed. */
function replayOut(kept: TrainGame, language: Language): CliResult {
  const t = DOMINO_STRINGS[language];
  let game = startTrain(kept.set, kept.players, kept.seed, kept.options, kept.computers);
  const lines: string[] = [];
  for (const move of movesOf(kept)) {
    if (game === null) break;
    game = playTrain(game, move);
    if (game === null) break;
    lines.push(`${moveCount(game)}. ${trainNews(game, language)}`);
  }
  if (game === null) return { code: 1, out: "", err: `domino: ${t.cliSavedBad}\n` };
  lines.push(trainStatus(game, language));
  return { code: 0, out: `${lines.join("\n")}\n`, err: "" };
}
