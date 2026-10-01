import { tileWords } from "./mexicanTrain/dominoes.ts";
import { TRAIN_PHASES, mexicanOf, trainMoves, trainTotals } from "./mexicanTrain/mexicanTrain.ts";
import type { TrainGame, TrainSeat } from "./mexicanTrain/mexicanTrain.types.ts";
import { DOMINO_STRINGS, dominoSay, type DominoStrings, type Language } from "./strings.ts";

/**
 * A TABLE'S WORDS, in English or Japanese: who is who, what just happened,
 * and what is wanted of whoever is to play. They read a game and say what its
 * rules have already decided, so they can never disagree with the rules; a
 * table draws them under its trains, and the command line prints them.
 *
 * `you` is the seat of the person at this device. Where there is none (a
 * computers-only game, or a command line) it is left out, and every seat is
 * named the same way.
 */

/** The set's name by its highest double ("Double-twelve"), or null for a number that is no set offered. */
export function trainSetLabel(set: number, language: Language): string | null {
  const t = DOMINO_STRINGS[language];
  return ({ 9: t.set9, 12: t.set12, 15: t.set15 } as Record<number, string>)[set] ?? null;
}

/** A seat's name: the one given at the table, or "You" for the person at this device, or "Computer 3" or "Player 3" for the seat's number. */
export function trainSeatName(game: Pick<TrainGame, "players" | "computers">, seat: TrainSeat, language: Language, you?: TrainSeat): string {
  const t = DOMINO_STRINGS[language];
  const given = game.players[seat]?.trim() ?? "";
  if (given !== "") return given;
  if (seat === you) return t.you;
  return dominoSay(game.computers[seat] ? t.computer : t.player, { n: seat + 1 });
}

/** A train's name: "Your train", "Computer 2's train", or the Mexican Train. */
export function trainName(game: Pick<TrainGame, "players" | "computers">, train: number, language: Language, you?: TrainSeat): string {
  const t = DOMINO_STRINGS[language];
  if (train === mexicanOf(game)) return t.mexican;
  if (train === you) return t.trainYours;
  return dominoSay(t.trainOf, { who: trainSeatName(game, train, language, you) });
}

/** What the last move did, in a line, or "" before there is one: "Computer 2 laid 9–4 on Your train." */
export function trainNews(game: TrainGame, language: Language, you?: TrainSeat): string {
  const t: DominoStrings = DOMINO_STRINGS[language];
  const last = game.last;
  if (last === null) return "";
  const who = trainSeatName(game, last.seat, language, you);
  switch (last.move.kind) {
    case "play":
      return dominoSay(t.laid, { who, tile: tileWords(last.move.tile), train: trainName(game, last.move.train, language, you) });
    case "draw":
      return dominoSay(t.drew, { who });
    case "pass":
      return dominoSay(t.passed, { who });
    case "next":
      return dominoSay(t.dealt, { n: game.round + 1, engine: game.engine });
  }
}

/** Why a round ended, in a line: who played out, or that nobody could play. */
function why(game: TrainGame, language: Language, you?: TrainSeat): string {
  const t = DOMINO_STRINGS[language];
  const result = game.results[game.results.length - 1];
  return result !== undefined && result.ending === "domino" && result.out !== null ? dominoSay(t.outBy, { who: trainSeatName(game, result.out, language, you) }) : t.blocked;
}

/**
 * What is going on, in a line: who is to play, or what the person at `you` is
 * asked to do (lay, cover a double, draw, pass), or how the round or the game
 * ended.
 */
export function trainStatus(game: TrainGame, language: Language, you?: TrainSeat): string {
  const t = DOMINO_STRINGS[language];
  if (game.phase === TRAIN_PHASES.finished) {
    const who = game.winners.map((seat) => trainSeatName(game, seat, language, you)).join(" & ");
    return dominoSay(t.gameOver, { who, pips: Math.min(...trainTotals(game)) });
  }
  if (game.phase === TRAIN_PHASES.roundOver) return dominoSay(t.roundOver, { why: why(game, language, you) });
  if (you === undefined || game.toPlay !== you) return dominoSay(t.thinking, { who: trainSeatName(game, game.toPlay, language, you) });
  const first = trainMoves(game)[0];
  if (first?.kind === "draw") return t.yourTurnDraw;
  if (first?.kind === "pass") return t.yourTurnPass;
  return game.uncovered.length > 0 ? t.yourTurnCover : t.yourTurn;
}
