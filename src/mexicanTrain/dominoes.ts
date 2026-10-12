// Relative, like the rest of lib/party: the browser specs import this, and Playwright resolves no alias.
import { TRAIN_PIP_BASE } from "./mexicanTrain.constants.ts";
import type { Domino, LaidDomino } from "./mexicanTrain.types.ts";

/**
 * DOMINOES AS NUMBERS: a tile is `low * 16 + high`, a tile laid in a train
 * `from * 16 + to` (see `mexicanTrain.types.ts`). Small, pure helpers the
 * rules, the computer player and the drawing all read, so that none of them
 * pulls a number apart its own way.
 */

/** The tile with these two ends, whichever order they are given in.
 *
 * @param a - The first pip value, from 0 to the set maximum.
 * @param b - The second pip value, from 0 to the set maximum.
 * @returns The tile with these two ends, whichever order they are given in.
 * @example
 * ```ts
 * import { tileOf } from "@johnmorrisdotca/domino";
 *
 * console.log(tileOf(6,4));
 * ```
 */
export function tileOf(a: number, b: number): Domino {
  return a <= b ? a * TRAIN_PIP_BASE + b : b * TRAIN_PIP_BASE + a;
}

/** A tile's two ends, the smaller first.
 *
 * @param tile - A canonical tile number: low * 16 + high.
 * @returns A tile's two ends, the smaller first.
 * @example
 * ```ts
 * import { endsOf, tileOf } from "@johnmorrisdotca/domino";
 *
 * console.log(endsOf(tileOf(6,4)));
 * ```
 */
export function endsOf(tile: Domino): [number, number] {
  return [Math.floor(tile / TRAIN_PIP_BASE), tile % TRAIN_PIP_BASE];
}

/** Both ends the same: a double, which is laid across a train and must be covered.
 *
 * @param tile - A canonical tile number: low * 16 + high.
 * @returns Both ends the same: a double, which is laid across a train and must be covered.
 * @example
 * ```ts
 * import { isDouble, tileOf } from "@johnmorrisdotca/domino";
 *
 * console.log(isDouble(tileOf(6,6)));
 * ```
 */
export function isDouble(tile: Domino): boolean {
  const [low, high] = endsOf(tile);
  return low === high;
}

/** Every pip on a tile: what it counts against its holder when a round ends.
 *
 * @param tile - A canonical tile number: low * 16 + high.
 * @returns Every pip on a tile: what it counts against its holder when a round ends.
 * @example
 * ```ts
 * import { pipsOf, tileOf } from "@johnmorrisdotca/domino";
 *
 * console.log(pipsOf(tileOf(6,4)));
 * ```
 */
export function pipsOf(tile: Domino): number {
  const [low, high] = endsOf(tile);
  return low + high;
}

/** Whether a tile has this number at either end, so it can be laid against it.
 *
 * @param tile - A canonical tile number: low * 16 + high.
 * @param end - The pip value the next laid tile must match.
 * @returns Whether a tile has this number at either end, so it can be laid against it.
 * @example
 * ```ts
 * import { fits, tileOf } from "@johnmorrisdotca/domino";
 *
 * console.log(fits(tileOf(6,4),4));
 * ```
 */
export function fits(tile: Domino, end: number): boolean {
  const [low, high] = endsOf(tile);
  return low === end || high === end;
}

/** The tile laid against `end`: turned so that end touches, the other one left open.
 *
 * @param tile - A canonical tile number: low * 16 + high.
 * @param end - The pip value the next laid tile must match.
 * @returns The tile laid against `end`: turned so that end touches, the other one left open.
 * @example
 * ```ts
 * import { laidAgainst, tileOf } from "@johnmorrisdotca/domino";
 *
 * console.log(laidAgainst(tileOf(6,4),6));
 * ```
 */
export function laidAgainst(tile: Domino, end: number): LaidDomino {
  const [low, high] = endsOf(tile);
  return low === end ? low * TRAIN_PIP_BASE + high : high * TRAIN_PIP_BASE + low;
}

/** A laid tile's two ends in the order it lies: the one touching the train, then the open one.
 *
 * @param laid - An oriented tile number: from * 16 + to.
 * @returns A laid tile's two ends in the order it lies: the one touching the train, then the open one.
 * @example
 * ```ts
 * import { laidAgainst, laidEnds, tileOf } from "@johnmorrisdotca/domino";
 *
 * console.log(laidEnds(laidAgainst(tileOf(6,4),6)));
 * ```
 */
export function laidEnds(laid: LaidDomino): [number, number] {
  return [Math.floor(laid / TRAIN_PIP_BASE), laid % TRAIN_PIP_BASE];
}

/** The tile a laid tile is, whichever way round it lies.
 *
 * @param laid - An oriented tile number: from * 16 + to.
 * @returns The tile a laid tile is, whichever way round it lies.
 * @example
 * ```ts
 * import { laidAgainst, tileOf, tileOfLaid } from "@johnmorrisdotca/domino";
 *
 * console.log(tileOfLaid(laidAgainst(tileOf(6,4),6)));
 * ```
 */
export function tileOfLaid(laid: LaidDomino): Domino {
  const [from, to] = laidEnds(laid);
  return tileOf(from, to);
}

/** Every tile of a set, double-blank to its highest double, in order.
 *
 * @param set - The highest double of the supported set: 9, 12 or 15.
 * @returns Every tile of a set, double-blank to its highest double, in order.
 * @example
 * ```ts
 * import { everyTile } from "@johnmorrisdotca/domino";
 *
 * console.log(everyTile(9).length);
 * ```
 */
export function everyTile(set: number): Domino[] {
  const tiles: Domino[] = [];
  for (let low = 0; low <= set; low += 1) for (let high = low; high <= set; high += 1) tiles.push(tileOf(low, high));
  return tiles;
}

/** A tile as a person reads it: "6–4", the larger end first, as a tile is named at the table.
 *
 * @param tile - A canonical tile number: low * 16 + high.
 * @returns A tile as a person reads it: "6–4", the larger end first, as a tile is named at the table.
 * @example
 * ```ts
 * import { tileOf, tileWords } from "@johnmorrisdotca/domino";
 *
 * console.log(tileWords(tileOf(6,4)));
 * ```
 */
export function tileWords(tile: Domino): string {
  const [low, high] = endsOf(tile);
  return `${high}–${low}`;
}
