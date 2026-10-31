/** Domino: double-nine, double-twelve and double-fifteen sets of dominoes, and Mexican Train with a computer player and a saved-game format. */

export type { CliResult, CliSurroundings } from "./cli.ts";
export { CLI_MOVES_MOST, cliLanguage, runCli } from "./cli.ts";
export * from "./mexicanTrain/dominoes.ts";
export * from "./mexicanTrain/mexicanTrain.constants.ts";
export * from "./mexicanTrain/mexicanTrain.ts";
export type * from "./mexicanTrain/mexicanTrain.types.ts";
export * from "./mexicanTrain/trainCodec.ts";
export * from "./mexicanTrain/trainComputer.ts";
export type { Random } from "./random.ts";
export { seededRandom, shuffled } from "./random.ts";
export type { DominoStrings, Language } from "./strings.ts";
export { DOMINO_STRINGS, dominoLanguage, dominoSay } from "./strings.ts";
export { VERSION } from "./version.ts";
export { trainName, trainNews, trainSeatName, trainSetLabel, trainStatus } from "./words.ts";
