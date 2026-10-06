# Changelog

All notable changes to this project are written here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.1.1] - 2026-10-05

Nothing that was exported has changed.

### Added

- A test holds every `@johnmorrisdotca/domino@N` version pin in the README to this package's major version.

### Changed

- The family's list, in the README and in the demo's footer, names all twenty-four packages, Karakuri and Houseki included.
- The npm description is one sentence of 250 characters or fewer, so npm and its search show it whole; it is also the repository's About text. `homepage` is the demo site and `author` is `"John Morris"`, the same in every package.
- The GitHub Actions workflows use the current versions of the actions (checkout 7, setup-node 7, pnpm/action-setup 6; configure-pages 6, upload-pages-artifact 5 and deploy-pages 5 for Pages), which clears GitHub's Node 20 deprecation warning.

## [1.1.0] - 2026-10-01

### Added

- **A command line**, `domino`: `deal` makes the deal a seed makes, every hand and the hub double; `play` plays a game out by computers, with its scores, every move in words (`--moves`) and the saved game (`--save`); `check` reads a saved game back through the rules and says where it stands; `replay` tells every move of one in words. All take `--json`, and `--lang en|ja`. The whole of it is `runCli`, a pure function, and it is tested as plain data and as a child process on Linux, macOS and Windows.
- **The words of a table in English and Japanese**: `DOMINO_STRINGS`, with `dominoSay` and `dominoLanguage`, and `trainStatus`, `trainNews`, `trainSeatName`, `trainName` and `trainSetLabel`, which say what the rules have already decided: whose turn it is, what was laid, how a round ended. The Japanese has not yet been read by a native reader; every string is listed in `docs/strings-ja.md`.
- **Tile sounds**, optional: `createTileSounds` (`@johnmorrisdotca/domino/tile-sounds`) plays tiles shuffled, drawn and laid, and a knock for a pass, from recordings fetched by the first sound (`@johnmorrisdotca/domino/sounds`). They are poker chips from Kenney's Casino Audio (CC0), the nearest free recording of a hard tile on a table, and `docs/credits.md` says so.
- **A README** with the sections a package of the family has: Use it in your project, Features, Saved games, The command line, Languages, Sounds, Theming (none, on purpose), Limits, Browser and runtime support, The family and Changes; `src/docs.test.js` holds its examples and tables to the code. Issue templates, a security policy and more keywords.
- **The demo** has a *Using it* panel (the code, the command and the saved text of the game on the table, each copyable), a link that names the deal (the set, the players, the rules and the seed are in the address), and a Sound switch.

- **A Help switch in the demo.** Beside the language chooser in the family header, shared by every demo. Off (the default) the page is as it was; on, each option row (the set, the players, the rounds, the doubles and the Mexican Train) says in one plain line what it does, in English or Japanese, and every button in it has the same words as its hover text. Kept on the device.
- **A playable demo on GitHub Pages** (published before this release), in the family's look and in English and Japanese: Mexican Train for one against one to seven computers, with the set, the number of players and every house rule chosen with a press, the family's cloth patches, and an API reference page in the same frame. It is tested in a real browser on a phone and a desk (`pnpm test:demo`), including a whole game played to its end.

### Changed

- **Node 22 or later** is what the package declares (`engines`) and is tested on; Node 20 reached its end of life.
- The demo's table says its words through the package, so a switch of language renames the seats at once; the first computer is "Computer 2", the seat it sits in, as `trainPlayerName` has always named it.
- Changing the table in the demo keeps the seed in use; Deal again takes a new one.

## [1.0.0] - 2026-09-30

### Added

- Double-nine, double-twelve and double-fifteen sets of dominoes, a tile as a
  number.
- Mexican Train for two to eight players: the hub, a train for every player and
  the Mexican Train, open trains, doubles to cover, blocked rounds and the score
  over every round, with house rules as options.
- A computer player, seeded deals that replay exactly, and a saved-game format
  read back through the rules.
- Brought from itsutsu.com, and held by its tests to sixty-four games dealt and
  played out there before the move.
