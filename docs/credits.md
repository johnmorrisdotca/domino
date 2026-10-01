# Credits: where the sounds come from

Everything in Domino was written for it, under its MIT licence, except what
this page names. Each item says where it came from, its licence as read at
its source, and the day that was checked. Nothing here is GPL or LGPL, and
nothing is used whose licence has not been read.

## The tile sounds

**Casino Audio (1.1)** by Kenney Vleugels,
[https://kenney.nl/assets/casino-audio](https://kenney.nl/assets/casino-audio).

- **Licence:** Creative Commons Zero, CC0 1.0
  ([creativecommons.org/publicdomain/zero/1.0](http://creativecommons.org/publicdomain/zero/1.0/)),
  as the pack's page says and as its own `License.txt` states: "You may use
  these assets in personal and commercial projects. Credit (Kenney or
  www.kenney.nl) would be nice but is not mandatory."
- **Checked:** 2026-10-01, on the pack's page and in `License.txt` inside
  `kenney_casino-audio.zip` (SHA-256
  `f36250766ac5bc378c13708ddf12a23a8e54a3251f8d482c7536e51b5dbafa18`).

**What they are, said plainly.** The pack has no dominoes. These are
recordings of poker chips, which are hard and click on a table the way a
tile does, and they are the nearest sound that is free to use. Nine of the
pack's recordings are used, each cut short and re-encoded:

| File here | From the pack | What it is | Length | Size |
| --- | --- | --- | --- | --- |
| `sounds/lay-1.m4a` | `Audio/chip-lay-1.ogg` | a chip set down on a table: a tile laid | 0.09 s | 1,681 bytes |
| `sounds/lay-2.m4a` | `Audio/chip-lay-2.ogg` | a chip set down on a table: a tile laid | 0.15 s | 1,901 bytes |
| `sounds/lay-3.m4a` | `Audio/chip-lay-3.ogg` | a chip set down on a table: a tile laid | 0.15 s | 1,947 bytes |
| `sounds/draw-1.m4a` | `Audio/chips-handle-3.ogg` | a chip picked up: a tile taken from the boneyard | 0.19 s | 2,293 bytes |
| `sounds/draw-2.m4a` | `Audio/chips-handle-4.ogg` | a chip picked up: a tile taken from the boneyard | 0.30 s | 3,174 bytes |
| `sounds/shuffle-1.m4a` | `Audio/chips-handle-5.ogg` | chips stirred about: the tiles shuffled | 0.81 s | 6,058 bytes |
| `sounds/shuffle-2.m4a` | `Audio/chips-handle-6.ogg` | chips stirred about: the tiles shuffled | 0.33 s | 3,644 bytes |
| `sounds/knock-1.m4a` | `Audio/chips-collide-1.ogg` | two chips knocked together: a rap on the table for a pass | 0.08 s | 1,557 bytes |
| `sounds/knock-2.m4a` | `Audio/chips-collide-4.ogg` | two chips knocked together: a rap on the table for a pass | 0.06 s | 1,520 bytes |

23,775 bytes in all.

**What was done to them**, by `scripts/sounds-cut.mjs` on a Mac: each
recording was decoded from Ogg Vorbis, mixed to one channel, cut from where
it first reaches a tenth of its peak to where it falls quiet (or to a length
chosen for it), faded at both ends, brought to the same peak level, and
encoded as AAC at 48 kbit/s in an `.m4a`, which every current browser
decodes, Safari on an iPhone included. The empty padding the encoder leaves
in the file was taken out. Then `pnpm sounds` writes them into
`src/sounds.ts` as base64, and a test fails if that module and the files fall
out of step, or if a file is not named on this page.
