// The recordings in ./sounds, held to the module made from them and to the credits that name them.
// Plain JavaScript, so that reading files needs no Node types in a package that has none.
import { Buffer } from "node:buffer";
import { readFileSync, readdirSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { TILE_SOUND_DATA } from "./sounds.ts";

describe("the recordings", () => {
  const files = readdirSync("sounds").filter((name) => name.endsWith(".m4a")).sort();

  it("are the files in ./sounds, byte for byte: run `pnpm sounds` after changing one", () => {
    expect(Object.keys(TILE_SOUND_DATA).sort()).toEqual(files.map((name) => name.replace(".m4a", "")));
    for (const name of files) expect(TILE_SOUND_DATA[name.replace(".m4a", "")]).toBe(readFileSync(`sounds/${name}`).toString("base64"));
  });

  it("are AAC in an .m4a, with no empty padding, and small", () => {
    let bytes = 0;
    for (const name of files) {
      const file = readFileSync(`sounds/${name}`);
      expect(file.toString("latin1", 4, 12), name).toBe("ftypM4A ");
      expect(file.includes(Buffer.from("mp4a", "latin1")), name).toBe(true);
      expect(file.includes(Buffer.from("free", "latin1")), name).toBe(false);
      bytes += file.length;
    }
    expect(bytes).toBeLessThan(40_000);
    expect(readFileSync("src/sounds.ts").length).toBeLessThan(50_000);
  });

  it("are each named in CREDITS.md, with where they came from and their licence", () => {
    const credits = readFileSync("CREDITS.md", "utf8");
    for (const name of files) expect(credits).toContain(`sounds/${name}`);
    expect(credits).toContain("CC0");
    expect(credits).toContain("https://kenney.nl/assets/casino-audio");
  });

  it("are each given in CREDITS.md at the size they are", () => {
    const credits = readFileSync("CREDITS.md", "utf8");
    for (const name of files) expect(credits).toContain(`| \`sounds/${name}\` |`);
    for (const name of files) expect(credits, name).toMatch(new RegExp(`\\| \`sounds/${name}\` \\|[^\\n]*\\| ${readFileSync(`sounds/${name}`).length.toLocaleString("en-US")} bytes \\|`));
    expect(credits).toContain(`${files.reduce((sum, name) => sum + readFileSync(`sounds/${name}`).length, 0).toLocaleString("en-US")} bytes in all`);
  });

  it("are never part of the core: only a sound played imports them", () => {
    for (const path of ["src/index.ts", "src/cli.ts", "src/words.ts"]) expect(readFileSync(path, "utf8")).not.toMatch(/from "\.\/sounds\.ts"/);
    const player = readFileSync("src/tile-sounds.ts", "utf8");
    expect(player).toContain('import("./sounds.ts")');
    expect(player).not.toMatch(/^import .*sounds\.ts/m);
  });
});
