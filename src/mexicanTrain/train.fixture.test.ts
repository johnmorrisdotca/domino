import { describe, expect, it } from "vitest";

import { startTrain, playTrain } from "./mexicanTrain.ts";
import { computerMove } from "./trainComputer.ts";
import { encodeTrain } from "./trainCodec.ts";
import fixture from "./train.fixture.json" with { type: "json" };

/** Two 32-bit FNV-1a hashes of a text side by side: a fingerprint, enough to tell one finished game from another. */
const fingerprint = (text: string): string => {
  let a = 0x811c9dc5;
  let b = 0x01000193 ^ 0x9e3779b9;
  for (let at = 0; at < text.length; at += 1) {
    const code = text.charCodeAt(at);
    a = Math.imul(a ^ code, 0x01000193) >>> 0;
    b = Math.imul(b ^ code, 0x01000193 ^ 0x2545f491) >>> 0;
  }
  return a.toString(16).padStart(8, "0") + b.toString(16).padStart(8, "0");
};

/**
 * Mexican Train came here from itsutsu.com, where tables were already being
 * played and kept. So a seed must deal exactly what it dealt there, and the
 * computer must play exactly as it did: this file is sixty-four games written
 * down on the site before the move, each dealt and then played out by
 * computers in every seat to the end, at every set, at two, four and eight
 * players, and under both sets of house rules. A finished game is kept as a
 * fingerprint of its saved form.
 */
describe("a game deals and plays as it did on itsutsu.com", () => {
  it("every recorded table, dealt and played to the end by computers", () => {
    for (const [key, want] of Object.entries(fixture)) {
      const [set, players, seed, length] = key.split("/");
      const options = length === "full" ? ({ length: "full", doubles: "one", mexican: "any" } as const) : ({ length: "short", doubles: "chain", mexican: "ownFirst" } as const);
      const names = Array.from({ length: Number(players) }, (_, at) => `P${at}`);
      let game = startTrain(Number(set), names, Number(seed), options, names.map(() => true))!;
      expect(encodeTrain(game), `${key} dealt`).toBe(want.start);
      for (let move = 0; move < 3000 && game.phase !== "finished"; move += 1) game = playTrain(game, computerMove(game))!;
      expect(fingerprint(encodeTrain(game)), `${key} played out`).toBe(want.end);
    }
  }, 120_000);
});
