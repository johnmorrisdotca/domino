# Changelog

All notable changes to this project are written here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- **A playable demo on GitHub Pages**, in the family's look and in English and
  Japanese (the Japanese not yet read by a native reader): Mexican Train for
  one against one to seven computers, with the set, the number of players and
  every house rule chosen with a press, the family's cloth patches, and an API
  reference page in the same frame. It is tested in a real browser on a phone
  and a desk (`pnpm test:demo`), including a whole game played to its end. The
  package itself is unchanged.

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
