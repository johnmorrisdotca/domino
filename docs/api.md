# API reference

Every export of every entry point of `@johnmorrisdotca/domino`, with its signature and its doc comment. This file is made from the source by `pnpm docs:api`, and a test fails when it falls behind: 1 entry point, 60 exports.

## `@johnmorrisdotca/domino`

[`cleanTrainName`](#main-cleanTrainName) · [`computerMove`](#main-computerMove) · [`decodeTrain`](#main-decodeTrain) · [`Domino`](#main-Domino) · [`DoublesRule`](#main-DoublesRule) · [`encodeTrain`](#main-encodeTrain) · [`endsOf`](#main-endsOf) · [`everyTile`](#main-everyTile) · [`fits`](#main-fits) · [`handPips`](#main-handPips) · [`handSizeFor`](#main-handSizeFor) · [`isDouble`](#main-isDouble) · [`laidAgainst`](#main-laidAgainst) · [`LaidDomino`](#main-LaidDomino) · [`laidEnds`](#main-laidEnds) · [`legalPlays`](#main-legalPlays) · [`longestRun`](#main-longestRun) · [`mayLay`](#main-mayLay) · [`mexicanOf`](#main-mexicanOf) · [`MexicanStart`](#main-MexicanStart) · [`moveCount`](#main-moveCount) · [`movesOf`](#main-movesOf) · [`openEnd`](#main-openEnd) · [`peopleAt`](#main-peopleAt) · [`pipsOf`](#main-pipsOf) · [`playTrain`](#main-playTrain) · [`Random`](#main-Random) · [`replayTrain`](#main-replayTrain) · [`RoundEnding`](#main-RoundEnding) · [`RoundResult`](#main-RoundResult) · [`roundsFor`](#main-roundsFor) · [`seededRandom`](#main-seededRandom) · [`shuffled`](#main-shuffled) · [`startTrain`](#main-startTrain) · [`tileOf`](#main-tileOf) · [`tileOfLaid`](#main-tileOfLaid) · [`tileWords`](#main-tileWords) · [`Train`](#main-Train) · [`TRAIN_DEFAULT_OPTIONS`](#main-TRAIN_DEFAULT_OPTIONS) · [`TRAIN_DOUBLES`](#main-TRAIN_DOUBLES) · [`TRAIN_LENGTHS`](#main-TRAIN_LENGTHS) · [`TRAIN_MEXICAN`](#main-TRAIN_MEXICAN) · [`TRAIN_NAME_MOST`](#main-TRAIN_NAME_MOST) · [`TRAIN_PHASES`](#main-TRAIN_PHASES) · [`TRAIN_PIP_BASE`](#main-TRAIN_PIP_BASE) · [`TRAIN_SET_NAMES`](#main-TRAIN_SET_NAMES) · [`TRAIN_SETS`](#main-TRAIN_SETS) · [`trainAgain`](#main-trainAgain) · [`TrainGame`](#main-TrainGame) · [`TrainHistory`](#main-TrainHistory) · [`TrainLength`](#main-TrainLength) · [`TrainMove`](#main-TrainMove) · [`trainMoves`](#main-trainMoves) · [`TrainOptions`](#main-TrainOptions) · [`TrainPhase`](#main-TrainPhase) · [`trainPlayerName`](#main-trainPlayerName) · [`TrainSeat`](#main-TrainSeat) · [`trainSetName`](#main-trainSetName) · [`trainTotals`](#main-trainTotals) · [`VERSION`](#main-VERSION)

<a id="main-cleanTrainName"></a>

### function `cleanTrainName`

```ts
cleanTrainName(name: string): string
```

A seat's name as given, its spaces tidied and cut to `TRAIN_NAME_MOST` characters.

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

<a id="main-trainSetName"></a>

### function `trainSetName`

```ts
trainSetName(set: number): string | null
```

The set's name, or null for a number that is no set offered.

<a id="main-trainTotals"></a>

### function `trainTotals`

```ts
trainTotals(game: Pick<TrainGame, "players" | "results">): number[]
```

Each seat's total over every round played: the lowest wins.

<a id="main-VERSION"></a>

### const `VERSION`

```ts
VERSION: "1.0.0"
```

The package's version.
