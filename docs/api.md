# API reference

Every export of every entry point of `@johnmorrisdotca/domino`, with its signature and its doc comment. This file is made from the source by `pnpm docs:api`, and a test fails when it falls behind: 3 entry points, 87 exports.

## `@johnmorrisdotca/domino`

[`cleanTrainName`](#main-cleanTrainName) · [`CLI_MOVES_MOST`](#main-CLI_MOVES_MOST) · [`cliLanguage`](#main-cliLanguage) · [`CliResult`](#main-CliResult) · [`CliSurroundings`](#main-CliSurroundings) · [`computerMove`](#main-computerMove) · [`decodeTrain`](#main-decodeTrain) · [`Domino`](#main-Domino) · [`DOMINO_STRINGS`](#main-DOMINO_STRINGS) · [`dominoLanguage`](#main-dominoLanguage) · [`dominoSay`](#main-dominoSay) · [`DominoStrings`](#main-DominoStrings) · [`DoublesRule`](#main-DoublesRule) · [`encodeTrain`](#main-encodeTrain) · [`endsOf`](#main-endsOf) · [`everyTile`](#main-everyTile) · [`fits`](#main-fits) · [`handPips`](#main-handPips) · [`handSizeFor`](#main-handSizeFor) · [`isDouble`](#main-isDouble) · [`laidAgainst`](#main-laidAgainst) · [`LaidDomino`](#main-LaidDomino) · [`laidEnds`](#main-laidEnds) · [`Language`](#main-Language) · [`legalPlays`](#main-legalPlays) · [`longestRun`](#main-longestRun) · [`mayLay`](#main-mayLay) · [`mexicanOf`](#main-mexicanOf) · [`MexicanStart`](#main-MexicanStart) · [`moveCount`](#main-moveCount) · [`movesOf`](#main-movesOf) · [`openEnd`](#main-openEnd) · [`peopleAt`](#main-peopleAt) · [`pipsOf`](#main-pipsOf) · [`playTrain`](#main-playTrain) · [`Random`](#main-Random) · [`replayTrain`](#main-replayTrain) · [`RoundEnding`](#main-RoundEnding) · [`RoundResult`](#main-RoundResult) · [`roundsFor`](#main-roundsFor) · [`runCli`](#main-runCli) · [`seededRandom`](#main-seededRandom) · [`shuffled`](#main-shuffled) · [`startTrain`](#main-startTrain) · [`tileOf`](#main-tileOf) · [`tileOfLaid`](#main-tileOfLaid) · [`tileWords`](#main-tileWords) · [`Train`](#main-Train) · [`TRAIN_DEFAULT_OPTIONS`](#main-TRAIN_DEFAULT_OPTIONS) · [`TRAIN_DOUBLES`](#main-TRAIN_DOUBLES) · [`TRAIN_LENGTHS`](#main-TRAIN_LENGTHS) · [`TRAIN_MEXICAN`](#main-TRAIN_MEXICAN) · [`TRAIN_NAME_MOST`](#main-TRAIN_NAME_MOST) · [`TRAIN_PHASES`](#main-TRAIN_PHASES) · [`TRAIN_PIP_BASE`](#main-TRAIN_PIP_BASE) · [`TRAIN_SET_NAMES`](#main-TRAIN_SET_NAMES) · [`TRAIN_SETS`](#main-TRAIN_SETS) · [`trainAgain`](#main-trainAgain) · [`TrainGame`](#main-TrainGame) · [`TrainHistory`](#main-TrainHistory) · [`TrainLength`](#main-TrainLength) · [`TrainMove`](#main-TrainMove) · [`trainMoves`](#main-trainMoves) · [`trainName`](#main-trainName) · [`trainNews`](#main-trainNews) · [`TrainOptions`](#main-TrainOptions) · [`TrainPhase`](#main-TrainPhase) · [`trainPlayerName`](#main-trainPlayerName) · [`TrainSeat`](#main-TrainSeat) · [`trainSeatName`](#main-trainSeatName) · [`trainSetLabel`](#main-trainSetLabel) · [`trainSetName`](#main-trainSetName) · [`trainStatus`](#main-trainStatus) · [`trainTotals`](#main-trainTotals) · [`VERSION`](#main-VERSION)

<a id="main-cleanTrainName"></a>

### function `cleanTrainName`

```ts
cleanTrainName(name: string): string
```

A seat's name as given, its spaces tidied and cut to `TRAIN_NAME_MOST` characters.

<a id="main-CLI_MOVES_MOST"></a>

### const `CLI_MOVES_MOST`

```ts
CLI_MOVES_MOST: 100000
```

The most moves a played game may take before the command line gives up, far above any game the rules allow.

<a id="main-cliLanguage"></a>

### function `cliLanguage`

```ts
cliLanguage(flag: string | undefined, env?: Record<string, string | undefined>, locale?: string): Language
```

The language the command line speaks: `--lang`, or the environment's, or the system's; Japanese for `ja…`, English for anything else.

<a id="main-CliResult"></a>

### type `CliResult`

```ts
type CliResult = { /** 0 when all went well, 1 when what was asked for could not be done, 2 when the command itself was wrong. */ code: 0 | 1 | 2; /** For standard output. */ out: string; /** For standard error. */ err: string; };
```

What the command line came to.

<a id="main-CliSurroundings"></a>

### type `CliSurroundings`

```ts
type CliSurroundings = { /** The environment, for the language: `LC_ALL`, `LC_MESSAGES` and `LANG`. */ env?: Record<string, string | undefined>; /** Standard input, when `--stdin` asks for it: the saved game. */ stdin?: string; /** The system's language where the environment names none: what `Intl` says, on Windows. */ locale?: string; /** Where a seed comes from when none is given: a function like `Math.random`, wh…
```

What the command line is run in. All of it is optional.

<a id="main-computerMove"></a>

### function `computerMove`

```ts
computerMove(game: TrainGame): TrainMove
```

The move the computer in the seat to move makes now: the best-scored lay, or the draw, pass or next round it must take.

<a id="main-decodeTrain"></a>

### function `decodeTrain`

```ts
decodeTrain(text: string | null): TrainGame | null
```

A kept game read back, or null for nothing kept or anything these rules cannot play out again.

<a id="main-Domino"></a>

### type `Domino`

```ts
type Domino = number;
```

A domino in a hand or the boneyard: `low * 16 + high`.

<a id="main-DOMINO_STRINGS"></a>

### const `DOMINO_STRINGS`

```ts
DOMINO_STRINGS: Record<Language, DominoStrings>
```

Every string, in both languages. The Japanese has not yet been read by a native reader.

<a id="main-dominoLanguage"></a>

### function `dominoLanguage`

```ts
dominoLanguage(tag: string | undefined): Language
```

The language a person asked for, by `en` or `ja` or a tag that begins with one: English for anything else.

<a id="main-dominoSay"></a>

### function `dominoSay`

```ts
dominoSay(text: string, values?: Readonly<Record<string, string | number>>): string
```

A string with its braces filled in from `values`; a brace with no value is left as it is.

<a id="main-DominoStrings"></a>

### type `DominoStrings`

```ts
type DominoStrings = { /** The set's names, by its highest double. */ set9: string; set12: string; set15: string; /** The house rules' names, each with the way it is chosen. */ lengthFull: string; lengthShort: string; doublesOne: string; doublesChain: string; mexicanAny: string; mexicanOwnFirst: string; /** A seat's default name. */ you: string; computer: string; player: string; /** The trains. */ mexican: string; t…
```

The names of the strings. Each is one line or one block of text.

<a id="main-DoublesRule"></a>

### type `DoublesRule`

```ts
type DoublesRule = "one" | "chain";
```

How a double is dealt with, the table's one house rule about them.

- `one` (the default, as most published rules play it): a double must be
  covered before anything else is played anywhere, and whoever laid it lays
  again to cover it.
- `chain`: after laying a double you may lay another double in the same
  turn, anywhere one fits, before covering; then every double left open is
  covered, the last laid first, before anything else is played.

<a id="main-encodeTrain"></a>

### function `encodeTrain`

```ts
encodeTrain(game: TrainGame): string
```

<a id="main-endsOf"></a>

### function `endsOf`

```ts
endsOf(tile: Domino): [number, number]
```

A tile's two ends, the smaller first.

<a id="main-everyTile"></a>

### function `everyTile`

```ts
everyTile(set: number): Domino[]
```

Every tile of a set, double-blank to its highest double, in order.

<a id="main-fits"></a>

### function `fits`

```ts
fits(tile: Domino, end: number): boolean
```

Whether a tile has this number at either end, so it can be laid against it.

<a id="main-handPips"></a>

### function `handPips`

```ts
handPips(hand: readonly Domino[]): number
```

The pips in a hand, which count against its holder when the round ends.

<a id="main-handSizeFor"></a>

### function `handSizeFor`

```ts
handSizeFor(set: number, players: number): number
```

HOW MANY TILES EACH PLAYER IS DEALT, by the set and the number at the
table. Double-twelve's are the figures most published rules give (fifteen
each for two to four, twelve for five or six, ten for seven or eight); the
other sets are scaled so that at every table some tiles are left to draw.

<a id="main-isDouble"></a>

### function `isDouble`

```ts
isDouble(tile: Domino): boolean
```

Both ends the same: a double, which is laid across a train and must be covered.

<a id="main-laidAgainst"></a>

### function `laidAgainst`

```ts
laidAgainst(tile: Domino, end: number): LaidDomino
```

The tile laid against `end`: turned so that end touches, the other one left open.

<a id="main-LaidDomino"></a>

### type `LaidDomino`

```ts
type LaidDomino = number;
```

A domino laid in a train, turned so its `from` end touches the train: `from * 16 + to`.

<a id="main-laidEnds"></a>

### function `laidEnds`

```ts
laidEnds(laid: LaidDomino): [number, number]
```

A laid tile's two ends in the order it lies: the one touching the train, then the open one.

<a id="main-Language"></a>

### type `Language`

```ts
type Language = "en" | "ja";
```

The languages Domino speaks.

<a id="main-legalPlays"></a>

### function `legalPlays`

```ts
legalPlays(game: TrainGame): { tile: Domino; train: number; }[]
```

Every tile the player to move may lay, and where: what `moves` offers, and
what the table lights up. While a double is uncovered anywhere the only
lay is to cover the last of them, on whoever's train it is — or, under the
chained-doubles rule, another double laid by the player still laying them.

<a id="main-longestRun"></a>

### function `longestRun`

```ts
longestRun(hand: readonly Domino[], end: number): Domino[]
```

The longest run of tiles from `hand` that can be laid one after another
against `end`, in the order they would be laid. A depth-first search over
the hand, bounded by `PLAN_STEPS`, preferring the heavier run of two the
same length: pips laid are pips that do not count.

<a id="main-mayLay"></a>

### function `mayLay`

```ts
mayLay(game: TrainGame, tile: Domino, train: number): boolean
```

Whether the player to move may lay this tile on this train now: the same
answer `legalPlays` gives, for one tile, without listing every other.

<a id="main-mexicanOf"></a>

### function `mexicanOf`

```ts
mexicanOf(game: Pick<TrainGame, "players">): number
```

The Mexican Train's number among a game's trains: after every seat's own.

<a id="main-MexicanStart"></a>

### type `MexicanStart`

```ts
type MexicanStart = "any" | "ownFirst";
```

When the Mexican Train may be started.

- `any` (the default): on any turn, by anybody, as most published rules say.
- `ownFirst`: a player may lay on the Mexican Train only once their own
  train has been started, the common house rule that keeps a first turn
  about your own train.

<a id="main-moveCount"></a>

### function `moveCount`

```ts
moveCount(game: Pick<TrainGame, "history">): number
```

How many moves a game has made.

<a id="main-movesOf"></a>

### function `movesOf`

```ts
movesOf(game: Pick<TrainGame, "history">): TrainMove[]
```

Every move a game has made, first to last.

<a id="main-openEnd"></a>

### function `openEnd`

```ts
openEnd(game: TrainGame, train: number): number
```

The number a train's next tile must match: its last tile's open end, or the engine double's when nothing is laid on it yet.

<a id="main-peopleAt"></a>

### function `peopleAt`

```ts
peopleAt(game: Pick<TrainGame, "computers">): TrainSeat[]
```

The seats a person plays: a table with two or more of them passes the device, and covers each hand between turns.

<a id="main-pipsOf"></a>

### function `pipsOf`

```ts
pipsOf(tile: Domino): number
```

Every pip on a tile: what it counts against its holder when a round ends.

<a id="main-playTrain"></a>

### function `playTrain`

```ts
playTrain(game: TrainGame, move: TrainMove): TrainGame | null
```

The game after that move, or null for a move that may not be made now.
The game given is left untouched, and the move is added to its record.

<a id="main-Random"></a>

### type `Random`

```ts
type Random = () => number;
```

A number in [0, 1), like `Math.random`, from a stream a seed fixes.

<a id="main-replayTrain"></a>

### function `replayTrain`

```ts
replayTrain(set: number, players: readonly string[], seed: number, options: TrainOptions, computers: readonly boolean[], moves: readonly TrainMove[]): TrainGame | null
```

A game played again from its table and its moves: what reading a kept game
back does. Null if any move is one the rules would not have taken.

<a id="main-RoundEnding"></a>

### type `RoundEnding`

```ts
type RoundEnding = "domino" | "blocked";
```

Why a round ended: somebody played their last tile, or nobody could play and nothing was left to draw.

<a id="main-RoundResult"></a>

### type `RoundResult`

```ts
type RoundResult = { /** The round's engine double, by its number: 12 for double-twelve. */ engine: number; /** Pips left in each seat's hand when it ended: that round's score. */ pips: readonly number[]; ending: RoundEnding; /** The seat that played out, on a round that ended that way. */ out: TrainSeat | null; };
```

A round's result, kept for the table of scores.

<a id="main-roundsFor"></a>

### function `roundsFor`

```ts
roundsFor(set: number, length: TrainLength): number
```

How many rounds a game of this length plays with this set: one per double, top to blank, or the first half of them.

<a id="main-runCli"></a>

### function `runCli`

```ts
runCli(args: readonly string[], around?: CliSurroundings): CliResult
```

Run the command line. See `domino --help` for what it takes. One seed serves the whole run, so the same command prints the same lines on every machine.

<a id="main-seededRandom"></a>

### function `seededRandom`

```ts
seededRandom(seed: number): Random
```

A stream of numbers in [0, 1) fixed by a seed.

<a id="main-shuffled"></a>

### function `shuffled`

```ts
shuffled<T>(items: readonly T[], random: Random): T[]
```

A copy of the list in a random order (Fisher–Yates); the list given is left alone.

<a id="main-startTrain"></a>

### function `startTrain`

```ts
startTrain(set: number, players: readonly string[], seed?: number, options?: TrainOptions, computers?: readonly boolean[]): TrainGame | null
```

A new game: the set (its highest double), the names at the table (one a
seat), which seats a computer plays, the options, and the seed every
shuffle is drawn from. Null for a table the game is not offered for — a set
not in `PARTY_SPECS`, or too few or too many players — rather than a game
nobody chose.

<a id="main-tileOf"></a>

### function `tileOf`

```ts
tileOf(a: number, b: number): Domino
```

The tile with these two ends, whichever order they are given in.

<a id="main-tileOfLaid"></a>

### function `tileOfLaid`

```ts
tileOfLaid(laid: LaidDomino): Domino
```

The tile a laid tile is, whichever way round it lies.

<a id="main-tileWords"></a>

### function `tileWords`

```ts
tileWords(tile: Domino): string
```

A tile as a person reads it: "6–4", the larger end first, as a tile is named at the table.

<a id="main-Train"></a>

### type `Train`

```ts
type Train = { laid: readonly LaidDomino[]; /** Open to everybody: the Mexican Train always, a player's own once they could not play. */ open: boolean; };
```

A train on the table: the tiles laid on it in order, and whether its owner's marker says anybody may play on it.

<a id="main-TRAIN_DEFAULT_OPTIONS"></a>

### const `TRAIN_DEFAULT_OPTIONS`

```ts
TRAIN_DEFAULT_OPTIONS: TrainOptions
```

The options a table opens on: every round, one double at a time, and the Mexican Train open from the start.

<a id="main-TRAIN_DOUBLES"></a>

### const `TRAIN_DOUBLES`

```ts
TRAIN_DOUBLES: { readonly one: "one"; readonly chain: "chain"; }
```

<a id="main-TRAIN_LENGTHS"></a>

### const `TRAIN_LENGTHS`

```ts
TRAIN_LENGTHS: { readonly full: "full"; readonly short: "short"; }
```

<a id="main-TRAIN_MEXICAN"></a>

### const `TRAIN_MEXICAN`

```ts
TRAIN_MEXICAN: { readonly any: "any"; readonly ownFirst: "ownFirst"; }
```

<a id="main-TRAIN_NAME_MOST"></a>

### const `TRAIN_NAME_MOST`

```ts
TRAIN_NAME_MOST: 20
```

The longest name a seat keeps.

<a id="main-TRAIN_PHASES"></a>

### const `TRAIN_PHASES`

```ts
TRAIN_PHASES: { readonly playing: "playing"; readonly roundOver: "roundOver"; readonly finished: "finished"; }
```

MEXICAN TRAIN, THE DOMINO GAME: the rules, and nothing else.

Pure, as the engine is: every function returns a new game and leaves the
one it was given untouched. A game is its table (the set, the options, the
seed, the seats) and its moves, in order; hands, trains, the boneyard and
whose turn it is are always read again from those (`replayTrain`), so a game
read back out of a browser's storage is exactly the game its moves make,
or none. Every shuffle is drawn from the game's seed and the round's
number, so a reload deals exactly what it dealt before.

The rules as the site plays them, most published rules' own:

 - a round is dealt round the engine double, the set's highest in the
   first round and one fewer each round after, which sits in the hub;
 - every player has a train of their own out of the hub, and there is one
   more, the Mexican Train, anybody may play on;
 - on your turn lay one tile against the open end of your own train, the
   Mexican Train, or any player's train whose marker is out;
 - nothing to lay: draw one tile; lay it if it goes, or put your marker out
   and pass (with nothing to draw, just put it out); lay on your own train
   and your marker comes in;
 - a double must be covered before anything else is played anywhere, and
   whoever lays one lays again to cover it (`DoublesRule` for the house
   rule that lets doubles be chained);
 - a round ends when somebody lays their last tile, or when nobody can lay
   and there is nothing left to draw; every player scores the pips left in
   their hand, and after the last round the lowest total wins.

<a id="main-TRAIN_PIP_BASE"></a>

### const `TRAIN_PIP_BASE`

```ts
TRAIN_PIP_BASE: 16
```

The largest set's highest double, and so the base a tile's two ends are written in (`tileOf`).

<a id="main-TRAIN_SET_NAMES"></a>

### const `TRAIN_SET_NAMES`

```ts
TRAIN_SET_NAMES: Record<number, string>
```

Each set by name, for the set-up's tiles and the card on My games.

<a id="main-TRAIN_SETS"></a>

### const `TRAIN_SETS`

```ts
TRAIN_SETS: { readonly nine: 9; readonly twelve: 12; readonly fifteen: 15; }
```

THE SETS OFFERED, by their highest double. Double-twelve is the set Mexican
Train is sold with and the one most published rules are written for, so it
is the default; double-nine for a quicker game with fewer, larger pips, and
double-fifteen for a long evening. These are the party game's "sizes"
(`PARTY_SPECS`), since the set is what the table is played on.

<a id="main-trainAgain"></a>

### function `trainAgain`

```ts
trainAgain(game: TrainGame, seed: number): TrainGame
```

The same table again, the same seats and options, with a fresh shuffle.

<a id="main-TrainGame"></a>

### type `TrainGame`

```ts
type TrainGame = { /** The set, by its highest double: 9, 12 or 15. The party game's "board size". */ set: number; options: TrainOptions; /** What every shuffle of this game is drawn from. */ seed: number; /** The names given at the table, in seat order: "" for one left blank. */ players: readonly string[]; /** Which seats a computer plays. */ computers: readonly boolean[]; /** * Every move made, the last first, eac…
```

A game, as its table and moves make it. Only the set, the options, the
seed, the seats and the moves are ever kept (`encodeTrain`); everything
else is read again from them (`replayTrain`), so a kept game can never hold
a hand or a train its moves do not make, and a reload cannot deal again.

<a id="main-TrainHistory"></a>

### type `TrainHistory`

```ts
type TrainHistory = { readonly move: TrainMove; readonly before: TrainHistory | null; /** How many moves the record holds, this one included. */ readonly count: number; };
```

One link of a game's record: a move, and every move before it.

<a id="main-TrainLength"></a>

### type `TrainLength`

```ts
type TrainLength = "full" | "short";
```

How many rounds: all of them, one for every double from the set's highest down to double blank, or half as many.

<a id="main-TrainMove"></a>

### type `TrainMove`

```ts
type TrainMove = | { kind: "play"; tile: Domino; train: number } | { kind: "draw" } | { kind: "pass" } | { kind: "next" };
```

One move at the table.

- `play`: lay a tile from your hand on a train.
- `draw`: take one tile from the boneyard, when you have nothing to play.
- `pass`: nothing to play and nothing to draw (or the tile drawn will not
  go): your train's marker goes on, and the turn passes.
- `next`: a round is over and everybody has seen how it went; deal the next.

<a id="main-trainMoves"></a>

### function `trainMoves`

```ts
trainMoves(game: TrainGame): TrainMove[]
```

Every move the player to move may make now; none once the game is over.

<a id="main-trainName"></a>

### function `trainName`

```ts
trainName(game: Pick<TrainGame, "players" | "computers">, train: number, language: Language, you?: TrainSeat): string
```

A train's name: "Your train", "Computer 2's train", or the Mexican Train.

<a id="main-trainNews"></a>

### function `trainNews`

```ts
trainNews(game: TrainGame, language: Language, you?: TrainSeat): string
```

What the last move did, in a line, or "" before there is one: "Computer 2 laid 9–4 on Your train."

<a id="main-TrainOptions"></a>

### type `TrainOptions`

```ts
type TrainOptions = { length: TrainLength; doubles: DoublesRule; mexican: MexicanStart; };
```

What the set-up chose, beyond the set and the players.

<a id="main-TrainPhase"></a>

### type `TrainPhase`

```ts
type TrainPhase = "playing" | "roundOver" | "finished";
```

<a id="main-trainPlayerName"></a>

### function `trainPlayerName`

```ts
trainPlayerName(game: Pick<TrainGame, "players" | "computers">, seat: TrainSeat): string
```

A seat's name as the table reads it: the one given, or "Computer 3" for a computer's seat left blank, "Player 3" for a person's.

<a id="main-TrainSeat"></a>

### type `TrainSeat`

```ts
type TrainSeat = number;
```

Who sits where: 0 is the first player, round the table in the order the set-up named them.

<a id="main-trainSeatName"></a>

### function `trainSeatName`

```ts
trainSeatName(game: Pick<TrainGame, "players" | "computers">, seat: TrainSeat, language: Language, you?: TrainSeat): string
```

A seat's name: the one given at the table, or "You" for the person at this device, or "Computer 3" or "Player 3" for the seat's number.

<a id="main-trainSetLabel"></a>

### function `trainSetLabel`

```ts
trainSetLabel(set: number, language: Language): string | null
```

The set's name by its highest double ("Double-twelve"), or null for a number that is no set offered.

<a id="main-trainSetName"></a>

### function `trainSetName`

```ts
trainSetName(set: number): string | null
```

The set's name, or null for a number that is no set offered.

<a id="main-trainStatus"></a>

### function `trainStatus`

```ts
trainStatus(game: TrainGame, language: Language, you?: TrainSeat): string
```

What is going on, in a line: who is to play, or what the person at `you` is
asked to do (lay, cover a double, draw, pass), or how the round or the game
ended.

<a id="main-trainTotals"></a>

### function `trainTotals`

```ts
trainTotals(game: Pick<TrainGame, "players" | "results">): number[]
```

Each seat's total over every round played: the lowest wins.

<a id="main-VERSION"></a>

### const `VERSION`

```ts
VERSION: "1.1.1"
```

The package's version.

## `@johnmorrisdotca/domino/tile-sounds`

[`createTileSounds`](#tile-sounds-createTileSounds) · [`MOST_SOUNDS_AT_ONCE`](#tile-sounds-MOST_SOUNDS_AT_ONCE) · [`PlayTileSoundOptions`](#tile-sounds-PlayTileSoundOptions) · [`soundTimes`](#tile-sounds-soundTimes) · [`TILE_SOUND_KINDS`](#tile-sounds-TILE_SOUND_KINDS) · [`TileSoundData`](#tile-sounds-TileSoundData) · [`TileSoundKind`](#tile-sounds-TileSoundKind) · [`TileSounds`](#tile-sounds-TileSounds) · [`TileSoundsOptions`](#tile-sounds-TileSoundsOptions) · [`TileSoundWindow`](#tile-sounds-TileSoundWindow)

<a id="tile-sounds-createTileSounds"></a>

### function `createTileSounds`

```ts
createTileSounds(options?: TileSoundsOptions): TileSounds
```

A table's tile sounds. Nothing is fetched and no audio context is made until the first sound.

<a id="tile-sounds-MOST_SOUNDS_AT_ONCE"></a>

### const `MOST_SOUNDS_AT_ONCE`

```ts
MOST_SOUNDS_AT_ONCE: 8
```

As many sounds as one call plays: fifteen tiles drawn are eight clicks, not a wall of noise.

<a id="tile-sounds-PlayTileSoundOptions"></a>

### type `PlayTileSoundOptions`

```ts
type PlayTileSoundOptions = { /** How many tiles: `draw` with 7 is seven tiles taken one after another (heard as at most `MOST_SOUNDS_AT_ONCE`). Unless said, one. */ count?: number; /** Milliseconds between one tile's sound and the next. Unless said, 85. */ gap?: number; /** Milliseconds to wait before the first. Unless said, none. */ delay?: number; };
```

How one sound is played.

<a id="tile-sounds-soundTimes"></a>

### function `soundTimes`

```ts
soundTimes(count: number, gap?: number): number[]
```

When each of `count` sounds starts, in milliseconds from the first: one every `gap`, and no more than `MOST_SOUNDS_AT_ONCE`, spread over the same time.

<a id="tile-sounds-TILE_SOUND_KINDS"></a>

### const `TILE_SOUND_KINDS`

```ts
TILE_SOUND_KINDS: readonly ["shuffle", "draw", "lay", "knock"]
```

Every kind of sound, in the order a game meets them.

<a id="tile-sounds-TileSoundData"></a>

### type `TileSoundData`

```ts
type TileSoundData = Readonly<Record<string, string>>;
```

The recordings, by name (`lay-2`), as base64 AAC.

<a id="tile-sounds-TileSoundKind"></a>

### type `TileSoundKind`

```ts
type TileSoundKind = (typeof TILE_SOUND_KINDS)[number];
```

One kind of sound: `shuffle` the tiles stirred face down, `draw` a tile taken from the boneyard, `lay` a tile set down on a train, `knock` a rap on the table, which is how a pass is announced.

<a id="tile-sounds-TileSounds"></a>

### type `TileSounds`

```ts
type TileSounds = { /** Play a sound, or several of one kind in a row; nothing while muted or closed. */ play(kind: TileSoundKind, options?: PlayTileSoundOptions): void; /** Fetch and decode the recordings now, rather than at the first sound. True once they are ready; false where they cannot be had. */ load(): Promise<boolean>; /** Whether it is muted. */ readonly muted: boolean; /** Mute or unmute. Muting stops not…
```

A table's sounds: `play` one, mute and unmute, change the volume, `close` when the table goes.

<a id="tile-sounds-TileSoundsOptions"></a>

### type `TileSoundsOptions`

```ts
type TileSoundsOptions = { /** Start muted: nothing plays, and nothing is fetched, until `setMuted(false)`. Unless said, not muted. */ muted?: boolean; /** How loud, from 0 to 1. Unless said, 0.6. */ volume?: number; /** Where the recordings come from: the package's own module unless another is handed in. */ load?: () => Promise<{ TILE_SOUND_DATA: TileSoundData }>; /** The window to make sound in: the page's own unl…
```

How a table's sounds are made. Every field may be left out.

<a id="tile-sounds-TileSoundWindow"></a>

### type `TileSoundWindow`

```ts
type TileSoundWindow = { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext; atob?: (text: string) => string; };
```

The parts of a window the sounds use: an audio context and `atob`. Any of them may be missing.

## `@johnmorrisdotca/domino/sounds`

[`TILE_SOUND_DATA`](#sounds-TILE_SOUND_DATA) · [`TileSoundFile`](#sounds-TileSoundFile)

<a id="sounds-TILE_SOUND_DATA"></a>

### const `TILE_SOUND_DATA`

```ts
TILE_SOUND_DATA: Readonly<Record<TileSoundFile, string>>
```

The tile sounds, recorded: tiles shuffled, drawn, laid and knocked on the
table, as base64 AAC (.m4a). From Kenney's Casino Audio
pack, CC0; see docs/credits.md. Written by scripts/sounds.mjs from the files
in ./sounds, never by hand. `createTileSounds` loads this module only when
a sound is first played, so a page that stays silent never downloads it.

<a id="sounds-TileSoundFile"></a>

### type `TileSoundFile`

```ts
type TileSoundFile = "draw-1" | "draw-2" | "knock-1" | "knock-2" | "lay-1" | "lay-2" | "lay-3" | "shuffle-1" | "shuffle-2";
```

The name of one recording: its kind of sound and a number, such as `lay-2`.
