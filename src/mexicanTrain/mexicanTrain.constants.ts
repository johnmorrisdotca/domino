// Relative, like the rest of lib/party: the browser specs import this, and Playwright resolves no alias.
import type { DoublesRule, MexicanStart, TrainLength, TrainOptions } from "./mexicanTrain.types.ts";

/**
 * THE SETS OFFERED, by their highest double. Double-twelve is the set Mexican
 * Train is sold with and the one most published rules are written for, so it
 * is the default; double-nine for a quicker game with fewer, larger pips, and
 * double-fifteen for a long evening. These are the party game's "sizes"
 * (`PARTY_SPECS`), since the set is what the table is played on.
 *
 * @example
 * ```ts
 * import { TRAIN_SETS } from "@johnmorrisdotca/domino";
 * console.log(TRAIN_SETS);
 * ```
 */
export const TRAIN_SETS = { nine: 9, twelve: 12, fifteen: 15 } as const;

/** The largest set's highest double, and so the base a tile's two ends are written in (`tileOf`).
 *
 * @example
 * ```ts
 * import { TRAIN_PIP_BASE } from "@johnmorrisdotca/domino";
 * console.log(TRAIN_PIP_BASE);
 * ```
 */
export const TRAIN_PIP_BASE = 16;

/**
 * HOW MANY TILES EACH PLAYER IS DEALT, by the set and the number at the
 * table. Double-twelve's are the figures most published rules give (fifteen
 * each for two to four, twelve for five or six, ten for seven or eight); the
 * other sets are scaled so that at every table some tiles are left to draw.
 *
 * @param set - The highest double of the supported set: 9, 12 or 15.
 * @param players - Player count, or names in seat order, as specified by this signature.
 * @returns HOW MANY TILES EACH PLAYER IS DEALT, by the set and the number at the table. Double-twelve's are the figures most published rules give (fifteen each for two to four, twelve for five or six, ten for seven or eight); the other sets are scaled so that at every table some tiles are left to draw.
 * @example
 * ```ts
 * import { handSizeFor } from "@johnmorrisdotca/domino";
 *
 * console.log(handSizeFor(9,2));
 * ```
 */
export function handSizeFor(set: number, players: number): number {
  const few = players <= 4;
  const some = players <= 6;
  if (set === TRAIN_SETS.nine) return few ? 10 : some ? 8 : 6;
  if (set === TRAIN_SETS.fifteen) return few ? 15 : some ? 13 : 12;
  return few ? 15 : some ? 12 : 10;
}

/** The options a table opens on: every round, one double at a time, and the Mexican Train open from the start.
 *
 * @example
 * ```ts
 * import { TRAIN_DEFAULT_OPTIONS } from "@johnmorrisdotca/domino";
 * console.log(TRAIN_DEFAULT_OPTIONS);
 * ```
 */
export const TRAIN_DEFAULT_OPTIONS: TrainOptions = { length: "full", doubles: "one", mexican: "any" };

/** The full and short round-count choices for a game.
 *
 * @example
 * ```ts
 * import { TRAIN_LENGTHS } from "@johnmorrisdotca/domino";
 * console.log(TRAIN_LENGTHS);
 * ```
 */
export const TRAIN_LENGTHS = { full: "full", short: "short" } as const satisfies Record<TrainLength, TrainLength>;
/** The one-double and chained-double house-rule choices.
 *
 * @example
 * ```ts
 * import { TRAIN_DOUBLES } from "@johnmorrisdotca/domino";
 * console.log(TRAIN_DOUBLES);
 * ```
 */
export const TRAIN_DOUBLES = { one: "one", chain: "chain" } as const satisfies Record<DoublesRule, DoublesRule>;
/** The unrestricted and own-train-first Mexican Train opening choices.
 *
 * @example
 * ```ts
 * import { TRAIN_MEXICAN } from "@johnmorrisdotca/domino";
 * console.log(TRAIN_MEXICAN);
 * ```
 */
export const TRAIN_MEXICAN = { any: "any", ownFirst: "ownFirst" } as const satisfies Record<MexicanStart, MexicanStart>;

/** How many rounds a game of this length plays with this set: one per double, top to blank, or the first half of them.
 *
 * @param set - The highest double of the supported set: 9, 12 or 15.
 * @param length - Full descending-double rounds or the short half-length game.
 * @returns How many rounds a game of this length plays with this set: one per double, top to blank, or the first half of them.
 * @example
 * ```ts
 * import { roundsFor } from "@johnmorrisdotca/domino";
 *
 * console.log(roundsFor(9,"short"));
 * ```
 */
export function roundsFor(set: number, length: TrainLength): number {
  return length === TRAIN_LENGTHS.full ? set + 1 : Math.ceil((set + 1) / 2);
}

/** Each set by name, for the set-up's tiles and the card on My games.
 *
 * @example
 * ```ts
 * import { TRAIN_SET_NAMES } from "@johnmorrisdotca/domino";
 * console.log(TRAIN_SET_NAMES);
 * ```
 */
export const TRAIN_SET_NAMES: Record<number, string> = { 9: "Double-nine", 12: "Double-twelve", 15: "Double-fifteen" };

/** The set's name, or null for a number that is no set offered.
 *
 * @param set - The highest double of the supported set: 9, 12 or 15.
 * @returns The set's name, or null for a number that is no set offered.
 * @example
 * ```ts
 * import { trainSetName } from "@johnmorrisdotca/domino";
 *
 * console.log(trainSetName(9));
 * ```
 */
export function trainSetName(set: number): string | null {
  return TRAIN_SET_NAMES[set] ?? null;
}
