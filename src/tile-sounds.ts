/**
 * THE SOUNDS OF A DOMINO TABLE: tiles shuffled, a tile drawn from the
 * boneyard, a tile laid, a knock on the table for a pass. The recordings are
 * poker chips set down and handled (Kenney's Casino Audio, CC0; see
 * CREDITS.md), the nearest recorded sound of a hard tile on a table that
 * is free to use. They are loaded the first time a sound is played and never
 * before, so a page that stays silent never fetches them. Where they cannot be
 * loaded or decoded, a short sound made in the browser stands in. Nothing here
 * throws: a platform with no audio, a context the browser holds still, or a
 * failed decode is simply silent.
 *
 * Domino never makes a sound by itself. A table asks for one with `play`.
 */

/** Every kind of sound, in the order a game meets them. */
export const TILE_SOUND_KINDS = ["shuffle", "draw", "lay", "knock"] as const;

/** One kind of sound: `shuffle` the tiles stirred face down, `draw` a tile taken from the boneyard, `lay` a tile set down on a train, `knock` a rap on the table, which is how a pass is announced. */
export type TileSoundKind = (typeof TILE_SOUND_KINDS)[number];

/** The recordings, by name (`lay-2`), as base64 AAC. */
export type TileSoundData = Readonly<Record<string, string>>;

/** The parts of a window the sounds use: an audio context and `atob`. Any of them may be missing. */
export type TileSoundWindow = {
  AudioContext?: typeof AudioContext;
  webkitAudioContext?: typeof AudioContext;
  atob?: (text: string) => string;
};

/** How a table's sounds are made. Every field may be left out. */
export type TileSoundsOptions = {
  /** Start muted: nothing plays, and nothing is fetched, until `setMuted(false)`. Unless said, not muted. */
  muted?: boolean;
  /** How loud, from 0 to 1. Unless said, 0.6. */
  volume?: number;
  /** Where the recordings come from: the package's own module unless another is handed in. */
  load?: () => Promise<{ TILE_SOUND_DATA: TileSoundData }>;
  /** The window to make sound in: the page's own unless another is handed in (a test's, or none for silence). */
  window?: TileSoundWindow | null;
};

/** How one sound is played. */
export type PlayTileSoundOptions = {
  /** How many tiles: `draw` with 7 is seven tiles taken one after another (heard as at most `MOST_SOUNDS_AT_ONCE`). Unless said, one. */
  count?: number;
  /** Milliseconds between one tile's sound and the next. Unless said, 85. */
  gap?: number;
  /** Milliseconds to wait before the first. Unless said, none. */
  delay?: number;
};

/** A table's sounds: `play` one, mute and unmute, change the volume, `close` when the table goes. */
export type TileSounds = {
  /** Play a sound, or several of one kind in a row; nothing while muted or closed. */
  play(kind: TileSoundKind, options?: PlayTileSoundOptions): void;
  /** Fetch and decode the recordings now, rather than at the first sound. True once they are ready; false where they cannot be had. */
  load(): Promise<boolean>;
  /** Whether it is muted. */
  readonly muted: boolean;
  /** Mute or unmute. Muting stops nothing already playing; it only keeps anything new from starting. */
  setMuted(muted: boolean): void;
  /** How loud, from 0 to 1. */
  volume: number;
  /** Stop for good, and let the audio context go. */
  close(): void;
};

/** As many sounds as one call plays: fifteen tiles drawn are eight clicks, not a wall of noise. */
export const MOST_SOUNDS_AT_ONCE = 8;

/** When each of `count` sounds starts, in milliseconds from the first: one every `gap`, and no more than `MOST_SOUNDS_AT_ONCE`, spread over the same time. */
export function soundTimes(count: number, gap = 85): number[] {
  const whole = Math.max(1, Math.floor(Number.isFinite(count) ? count : 1));
  const span = (whole - 1) * Math.max(0, gap);
  const heard = Math.min(whole, MOST_SOUNDS_AT_ONCE);
  if (heard === 1) return [0];
  return Array.from({ length: heard }, (_, at) => Math.round((at * span) / (heard - 1)));
}

type Loaded = Partial<Record<TileSoundKind, AudioBuffer[]>>;

const clampVolume = (value: number) => (Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0.6);

function bytesOf(base64: string, atob: (text: string) => string): ArrayBuffer {
  const text = atob(base64);
  const bytes = new Uint8Array(text.length);
  for (let i = 0; i < text.length; i++) bytes[i] = text.charCodeAt(i);
  return bytes.buffer;
}

/** Decoding as a promise, on browsers that take callbacks and on those that return one. */
function decode(ctx: AudioContext, data: ArrayBuffer): Promise<AudioBuffer> {
  return new Promise((resolve, reject) => {
    const pending = ctx.decodeAudioData(data, resolve, reject) as Promise<AudioBuffer> | undefined;
    if (pending !== undefined && typeof pending.then === "function") pending.then(resolve, reject);
  });
}

/** What a sound made here is like, for when the recordings cannot be had: bursts of noise, each band-passed and cut off fast. */
const MADE: Record<TileSoundKind, { ticks: number; over: number; length: number; pitch: number }> = {
  lay: { ticks: 1, over: 0, length: 0.04, pitch: 2200 },
  draw: { ticks: 2, over: 0.04, length: 0.035, pitch: 1800 },
  knock: { ticks: 1, over: 0, length: 0.05, pitch: 1100 },
  shuffle: { ticks: 18, over: 0.9, length: 0.03, pitch: 2000 },
};

/** A table's tile sounds. Nothing is fetched and no audio context is made until the first sound. */
export function createTileSounds(options: TileSoundsOptions = {}): TileSounds {
  const win: TileSoundWindow | undefined = options.window === null ? undefined : (options.window ?? (typeof window === "undefined" ? undefined : (window as unknown as TileSoundWindow)));
  const load = options.load ?? ((): Promise<{ TILE_SOUND_DATA: TileSoundData }> => import("./sounds.ts"));
  let muted = options.muted === true;
  let volume = clampVolume(options.volume ?? 0.6);
  let ctx: AudioContext | null = null;
  let out: GainNode | null = null;
  let loaded: Promise<Loaded | null> | null = null;
  let closed = false;

  function context(): AudioContext | null {
    if (ctx !== null) return ctx;
    const Context = win?.AudioContext ?? win?.webkitAudioContext;
    if (Context === undefined) return null;
    ctx = new Context();
    out = ctx.createGain();
    out.gain.value = volume;
    out.connect(ctx.destination);
    return ctx;
  }

  function recordings(audio: AudioContext): Promise<Loaded | null> {
    loaded ??= (async () => {
      try {
        const atob = win?.atob ?? globalThis.atob;
        const { TILE_SOUND_DATA } = await load();
        const names = Object.keys(TILE_SOUND_DATA).sort();
        const buffers = await Promise.all(names.map((name) => decode(audio, bytesOf(TILE_SOUND_DATA[name] as string, atob))));
        const made: Loaded = {};
        names.forEach((name, at) => {
          const kind = name.replace(/-\d+$/, "") as TileSoundKind;
          if ((TILE_SOUND_KINDS as readonly string[]).includes(kind)) (made[kind] ??= []).push(buffers[at] as AudioBuffer);
        });
        return Object.keys(made).length > 0 ? made : null;
      } catch {
        return null;
      }
    })();
    return loaded;
  }

  function recorded(audio: AudioContext, buffer: AudioBuffer, at: number, gain: number) {
    const source = audio.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = 0.94 + Math.random() * 0.12;
    const level = audio.createGain();
    level.gain.value = gain;
    source.connect(level);
    level.connect(out as GainNode);
    source.start(at);
  }

  function madeHere(audio: AudioContext, kind: TileSoundKind, at: number, gain: number) {
    const shape = MADE[kind];
    const length = Math.max(1, Math.round(audio.sampleRate * shape.length));
    for (let tick = 0; tick < shape.ticks; tick++) {
      const buffer = audio.createBuffer(1, length, audio.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3;
      const source = audio.createBufferSource();
      source.buffer = buffer;
      const band = audio.createBiquadFilter();
      band.type = "bandpass";
      band.frequency.value = shape.pitch * (0.9 + Math.random() * 0.2);
      band.Q.value = 1.2;
      const level = audio.createGain();
      level.gain.value = gain * 1.4;
      source.connect(band);
      band.connect(level);
      level.connect(out as GainNode);
      source.start(at + (shape.ticks === 1 ? 0 : (tick * shape.over) / (shape.ticks - 1)) + Math.random() * 0.006);
    }
  }

  function schedule(audio: AudioContext, sounds: Loaded | null, kind: TileSoundKind, times: number[], began: number) {
    const pick = <T>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)] as T;
    const each = 0.9 / Math.sqrt(times.length);
    // The first sound waits for the recordings to be fetched and decoded; the rest keep their spacing from it, so nothing is lost or bunched.
    const late = Math.max(0, audio.currentTime - began);
    for (const ms of times) {
      const at = began + late + ms / 1000;
      const gain = each * (0.8 + Math.random() * 0.4);
      const takes = sounds?.[kind];
      if (takes !== undefined && takes.length > 0) recorded(audio, pick(takes), at, gain);
      else madeHere(audio, kind, at, gain);
    }
  }

  return {
    play(kind, how = {}) {
      if (closed || muted || !(TILE_SOUND_KINDS as readonly string[]).includes(kind)) return;
      try {
        const audio = context();
        if (audio === null) return;
        const times = soundTimes(how.count ?? 1, how.gap ?? 85).map((ms) => ms + Math.max(0, how.delay ?? 0));
        const go = () => {
          const began = audio.currentTime;
          void recordings(audio).then((sounds) => {
            try {
              if (!closed && !muted) schedule(audio, sounds, kind, times, began);
            } catch {
              // A node that will not start is a tile without its sound, nothing more.
            }
          });
        };
        // A browser holds a context still until the page has been touched; a sound asked for by code before then stays silent.
        if (audio.state === "running") go();
        else
          void audio.resume().then(
            () => {
              if (audio.state === "running") go();
            },
            () => undefined,
          );
      } catch {
        // No audio here, or none allowed: the game goes on.
      }
    },
    async load() {
      if (closed) return false;
      try {
        const audio = context();
        if (audio === null) return false;
        return (await recordings(audio)) !== null;
      } catch {
        return false;
      }
    },
    get muted() {
      return muted;
    },
    setMuted(next) {
      muted = next === true;
    },
    get volume() {
      return volume;
    },
    set volume(next) {
      volume = clampVolume(next);
      if (out !== null) out.gain.value = volume;
    },
    close() {
      closed = true;
      try {
        void ctx?.close().catch(() => undefined);
      } catch {
        // Already closed.
      }
      ctx = null;
    },
  };
}
