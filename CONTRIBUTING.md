# Contributing to Domino

Thank you for helping. Bug reports, ideas and pull requests are all welcome,
in the [issues](https://github.com/johnmorrisdotca/domino/issues). What holds
for every package of the family is in the
[family's contributing guide](https://github.com/johnmorrisdotca/.github/blob/main/CONTRIBUTING.md);
this is what is particular to Domino.

## Reporting a bug

A saved game (the text `encodeTrain` makes) is usually the whole report: it is
the table, the seed and the moves, and it plays again exactly. Say which move
you expected the rules to take or refuse, and where it ran (browser and
version, or Node, Deno or Bun and version).

## Making a change

```sh
git clone https://github.com/johnmorrisdotca/domino
cd domino
pnpm install
pnpm check          # lint, types and tests: the same as CI
pnpm test:cli       # the command line, run as a child process
pnpm test:package   # npm pack, install the tarball, import every entry, run the command
pnpm test:demo      # the demo in real browsers: builds it, then taps it
pnpm site           # builds the demo into ./site
```

- **Never change a deal.** A game kept as its seed and its moves is dealt again
  from them, so a change to the rules must leave every game in
  `src/mexicanTrain/train.fixture.json` dealing and playing exactly as it did:
  those are games already kept by people on itsutsu.com. The command line's
  documented output (`domino deal --seed 2026 …`) is held by the same deals.
- **Rules are pure.** Every function returns a new game and leaves its input
  untouched. Nothing in the package touches the DOM, the network or a file; the
  command line's few lines are `bin/domino.mjs`, and everything else is
  `runCli`, a pure function.
- **A new game is a folder** beside `src/mexicanTrain/`, with its own constants,
  types, rules and tests; add it to the README's Architecture tree, which a test
  holds to the files under `src/`.
- **Words go in `src/strings.ts`**, in English and Japanese, then
  `pnpm docs:make` to bring `docs/strings-ja.md` up to date. Japanese is plain
  and polite. If you cannot write it, say so in the pull request.
- **Every export gets a doc comment**, and `pnpm docs:api` brings `docs/api.md`
  up to date. A test fails without either.
- **Examples in the README are run by `src/docs.test.js`.** Change a number in
  one and the other has to follow.
- **Sounds are CC0 or public domain, checked at the source**, and named in
  `docs/credits.md` with what was done to them; `pnpm sounds` writes
  `src/sounds.ts` from `sounds/`. No GPL or LGPL code.
- **Option values and names are kebab case** (`own-first` on the command line).
- **The demo is tested by tapping it.** `e2e/*.demo.mjs` are Playwright tests
  that open the built demo in Chromium and WebKit, at a phone's width by touch
  and at a desktop's by mouse. After every flow they check that nothing is wider
  than the screen, nothing to tap is under 44px, and the page complained of
  nothing. The first time, `pnpm exec playwright install chromium webkit`
  fetches the browsers.
- **`demo/family.css` and `scripts/family-template.mjs` are the family's**, the
  same in every sibling package. Do not edit them here.
- **The list of the family in the README is made, not written.** `pnpm family:readme` writes it between its
  markers from `scripts/family-template.mjs` (the names, the Japanese names and a line on each), and
  `scripts/family-readme.mjs` is the same file in every package. To add a package or change a line, change the
  template in every repository, bump `FAMILY_TEMPLATE_VERSION` and record the new hash in `src/family.test.js`.
- One change per pull request, with a line in `CHANGELOG.md` under *Unreleased*.

## Releasing

Maintainers bump the version in `package.json` and `src/version.ts`, and move
*Unreleased* to the new version in `CHANGELOG.md`, dated. A version tag
(`v1.2.3`, the same as `package.json`'s version) runs
`.github/workflows/release.yml`: it checks and builds the package, runs the
packed package and the command line, attaches the tarball to a GitHub release,
and publishes it to npm by trusted publishing with provenance, with no token. A
version already on npm is not published again.
