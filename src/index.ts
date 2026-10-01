/** Domino: double-nine, double-twelve and double-fifteen sets of dominoes, and Mexican Train with a computer player and a saved-game format. */
export * from "./mexicanTrain/dominoes.ts";
export * from "./mexicanTrain/mexicanTrain.constants.ts";
export * from "./mexicanTrain/mexicanTrain.ts";
export type * from "./mexicanTrain/mexicanTrain.types.ts";
export * from "./mexicanTrain/trainComputer.ts";
export * from "./mexicanTrain/trainCodec.ts";
export { seededRandom, shuffled } from "./random.ts";
export type { Random } from "./random.ts";
export { VERSION } from "./version.ts";
