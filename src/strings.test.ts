import { describe, expect, it } from "vitest";

import { DOMINO_STRINGS, dominoLanguage, dominoSay } from "./strings.ts";

const places = (text: string) => [...new Set([...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]))].sort();

describe("the strings", () => {
  it("have a Japanese line for every English one, in the same order, keeping every place to fill in", () => {
    expect(Object.keys(DOMINO_STRINGS.ja)).toEqual(Object.keys(DOMINO_STRINGS.en));
    for (const key of Object.keys(DOMINO_STRINGS.en) as (keyof typeof DOMINO_STRINGS.en)[]) {
      expect(places(DOMINO_STRINGS.ja[key]), key).toEqual(places(DOMINO_STRINGS.en[key]));
      expect(DOMINO_STRINGS.ja[key].trim(), key).not.toBe("");
      // The one line that is only its own places to fill in reads the same in both.
      if (key !== "cliSeat") expect(DOMINO_STRINGS.ja[key], key).not.toBe(DOMINO_STRINGS.en[key]);
    }
  });

  it("the two helps list the same options and the same commands, in the same order", () => {
    const options = (text: string) => [...text.matchAll(/^\s+(?:-\w, )?(--[\w-]+)/gm)].map((match) => match[1]);
    expect(options(DOMINO_STRINGS.ja.cliUsage)).toEqual(options(DOMINO_STRINGS.en.cliUsage));
    const commands = (text: string) => text.split("\n").filter((line) => line.startsWith("  domino ")).map((line) => /^ {2}domino \w+( --\w+)?/.exec(line)?.[0]);
    expect(commands(DOMINO_STRINGS.ja.cliUsage)).toEqual(commands(DOMINO_STRINGS.en.cliUsage));
  });

  it("fill in the braces they are given, and leave the rest", () => {
    expect(dominoSay("{who} laid {tile}.", { who: "Ann", tile: "6–4" })).toBe("Ann laid 6–4.");
    expect(dominoSay("{who} laid {tile}.", { who: "Ann" })).toBe("Ann laid {tile}.");
    expect(dominoSay("{n} left", { n: 0 })).toBe("0 left");
  });

  it("choose Japanese for a tag that begins ja, and English for anything else", () => {
    expect(dominoLanguage("ja")).toBe("ja");
    expect(dominoLanguage("ja_JP.UTF-8")).toBe("ja");
    expect(dominoLanguage("JA-jp")).toBe("ja");
    expect(dominoLanguage("fr")).toBe("en");
    expect(dominoLanguage(undefined)).toBe("en");
  });
});
