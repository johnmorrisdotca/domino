---
title: "Sound loading and host controls"
section: explanation
order: 7
description: "Understand lazy recordings, mute and audio cleanup."
---

## A player waits for the host

```ts no-run
import {createTileSounds} from "@johnmorrisdotca/domino/tile-sounds";
const sounds = createTileSounds({muted:true,volume:0.6});
const button = document.createElement("button");
button.textContent = "Enable sound";
button.addEventListener("click",()=>{sounds.setMuted(false);sounds.play("lay");});
document.body.append(button);
console.log(sounds.muted);
// When the host table is removed:
sounds.close();
```

Constructing the player fetches nothing and creates no audio context. First play loads the recordings; a muted page stays silent without downloading them. Browser audio may require a user gesture. An unavailable audio platform or failed recording decode is silent or uses the native synthesized fallback; it does not make the game fail.

## Keep the assets optional

Import `/tile-sounds` for controls; `/sounds` contains recorded AAC data. The recordings are Kenney's Casino Audio, CC0, with attribution preserved in [CREDITS.md](../../CREDITS.md). Multiple requested sounds are capped and spaced by `soundTimes`; mute blocks new sounds, while close ends the player. The host decides when a lay, draw, shuffle or pass should sound. There is no sound triggered by the rule engine itself.
