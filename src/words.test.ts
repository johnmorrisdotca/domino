import { describe, expect, it } from "vitest";

import { tileOf } from "./mexicanTrain/dominoes.ts";
import { TRAIN_DEFAULT_OPTIONS } from "./mexicanTrain/mexicanTrain.constants.ts";
import { TRAIN_PHASES, playTrain, startTrain, trainMoves } from "./mexicanTrain/mexicanTrain.ts";
import type { TrainGame } from "./mexicanTrain/mexicanTrain.types.ts";
import { computerMove } from "./mexicanTrain/trainComputer.ts";
import { trainName, trainNews, trainSeatName, trainSetLabel, trainStatus } from "./words.ts";

/** A table of three the person at seat 0 plays, with computers at the others, dealt from a seed. */
const table = () => startTrain(12, ["", "Ben", ""], 2026, TRAIN_DEFAULT_OPTIONS, [false, true, true])!;

/** The game played to its end by computers, and every state on the way. */
function played(seed: number): TrainGame[] {
  const states = [startTrain(9, ["", "", ""], seed, { ...TRAIN_DEFAULT_OPTIONS, length: "short" }, [true, true, true])!];
  while (states[states.length - 1]!.phase !== TRAIN_PHASES.finished) states.push(playTrain(states[states.length - 1]!, computerMove(states[states.length - 1]!))!);
  return states;
}

describe("names", () => {
  it("name a seat by the name given, then 'You', then its number as a computer or a player", () => {
    const game = table();
    expect(trainSeatName(game, 1, "en", 0)).toBe("Ben");
    expect(trainSeatName(game, 0, "en", 0)).toBe("You");
    expect(trainSeatName(game, 0, "en")).toBe("Player 1");
    expect(trainSeatName(game, 2, "en", 0)).toBe("Computer 3");
    expect(trainSeatName(game, 0, "ja", 0)).toBe("あなた");
    expect(trainSeatName(game, 2, "ja", 0)).toBe("コンピューター3");
  });

  it("name the trains: yours, a seat's, and the Mexican Train that follows them", () => {
    const game = table();
    expect(trainName(game, 0, "en", 0)).toBe("Your train");
    expect(trainName(game, 1, "en", 0)).toBe("Ben's train");
    expect(trainName(game, 2, "en")).toBe("Computer 3's train");
    expect(trainName(game, 3, "en", 0)).toBe("Mexican Train");
    expect(trainName(game, 3, "ja")).toBe("メキシカントレイン");
    expect(trainName(game, 1, "ja", 0)).toBe("Benの道");
  });

  it("name the sets, and nothing else", () => {
    expect(trainSetLabel(12, "en")).toBe("Double-twelve");
    expect(trainSetLabel(15, "ja")).toBe("ダブルフィフティーン");
    expect(trainSetLabel(10, "en")).toBeNull();
  });
});

describe("what is said", () => {
  it("says nothing happened before the first move, and who is to play", () => {
    const game = table();
    expect(trainNews(game, "en", 0)).toBe("");
    expect(trainStatus(game, "en")).toBe("Player 1 to play.");
    expect(trainStatus(game, "ja")).toBe("プレイヤー1の番です。");
  });

  it("asks the person at the device to lay, cover, draw or pass, and tells them when it is not their turn", () => {
    const game = table();
    expect(game.toPlay).toBe(0);
    const first = trainMoves(game)[0]!;
    expect(first.kind).toBe("play");
    expect(trainStatus(game, "en", 0)).toBe("Your turn. Tap a tile to lay it.");
    expect(trainStatus(game, "en", 1)).toBe("Player 1 to play.");
    const covering = { ...game, uncovered: [0] };
    expect(trainStatus(covering, "en", 0)).toBe("Your turn. Cover the double.");
    const stuck = { ...game, hands: [[tileOf(0, 1)], game.hands[1]!, game.hands[2]!], trains: game.trains.map((train, at) => (at === 3 ? train : { laid: [12 * 16 + 5], open: false })) };
    expect(trainMoves(stuck)[0]!.kind).toBe("draw");
    expect(trainStatus(stuck, "en", 0)).toBe("Nothing fits. Draw a tile.");
    expect(trainStatus({ ...stuck, boneyard: [] }, "ja", 0)).toBe("置ける牌がありません。パスしてください。");
  });

  it("tells what a move did, in either language", () => {
    const game = table();
    const move = trainMoves(game)[0]!;
    if (move.kind !== "play") throw new Error("the first move is a lay");
    const after = playTrain(game, move)!;
    expect(trainNews(after, "en", 0)).toMatch(/^You laid \d+–\d+ on (Your train|Mexican Train)\.$/);
    expect(trainNews(after, "ja", 0)).toMatch(/^あなたが\d+–\d+を.+に置きました。$/);
  });

  it("tells a draw, a pass, a new round, a round's end and the game's end, over whole games", () => {
    const seen = new Set<string>();
    for (const seed of [1, 2, 3]) {
      for (const state of played(seed)) {
        const news = trainNews(state, "en");
        for (const [name, pattern] of [["laid", /laid/], ["drew", /drew a tile/], ["passed", /passed/], ["dealt", /dealt: the hub double is \d+/]] as const) if (pattern.test(news)) seen.add(name);
        if (state.phase === TRAIN_PHASES.roundOver) {
          expect(trainStatus(state, "en")).toMatch(/^Round over\. (Computer \d played out\.|Nobody can play\.)$/);
          seen.add("roundOver");
        }
        if (state.phase === TRAIN_PHASES.finished) {
          expect(trainStatus(state, "en")).toMatch(/^Game over\. Computer \d( & Computer \d)* won with \d+ pips\.$/);
          expect(trainStatus(state, "ja")).toMatch(/^ゲーム終了。コンピューター\d.*の勝ち（\d+点）。$/);
          seen.add("finished");
        }
      }
    }
    expect([...seen].sort()).toEqual(["dealt", "drew", "finished", "laid", "passed", "roundOver"]);
  });
});
