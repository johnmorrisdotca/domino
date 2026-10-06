# Contributing

Thank you for helping. Bug reports, ideas, corrections to the Japanese and pull
requests are all welcome.

This first part is the same in every package of the family. It is the master
text kept in
[johnmorrisdotca/.github](https://github.com/johnmorrisdotca/.github/blob/main/CONTRIBUTING.md),
copied unchanged into `scripts/community/CONTRIBUTING.md`, and a test holds
this file to that copy. What is particular to the package follows it, under
the heading "Particular to" and the package's name.

## Before you start

Open an issue first for anything bigger than a typo, so that we can agree on the
shape before you spend time on it. Taking part follows the
[Code of Conduct](CODE_OF_CONDUCT.md); report a security concern privately, as
[SECURITY.md](SECURITY.md) says.

## Making a change

```sh
pnpm install
pnpm check          # lint, types and tests: the same as CI
pnpm test:package   # pack it as npm does, install it in an empty project, import every entry
pnpm site           # build the demo into ./site, as GitHub Pages publishes it
```

The package's own further commands (its browser tests, its command line, its
data scripts) are listed under its own heading below.

## House rules, shared by every package of the family

- **No runtime dependencies.** Development dependencies are for tests, builds and
  documentation only.
- **The core is pure.** Every function in it returns new values and never
  changes what it was given.
- **Test what you change.** Tests sit beside the code they test. A rule you
  change has a test that would have caught it.
- **Words a person reads come in English and Japanese.** If you cannot write the
  Japanese, say so in the pull request and someone will.
- **Option values and names are kebab case.**
- **Art and sound are CC0 or public domain only**, checked at the source and
  credited. Data and word lists may be under another licence that lets them be
  shipped, with its notice kept in `NOTICE.md`. No GPL or LGPL code.
- **Needs Node 22 or later.**
- **A README table, example or count that a test holds to the code** changes
  together with the code.
- **The family's own files are the same in every package**: `demo/family.css`,
  `scripts/family-template.mjs`, `scripts/family-readme.mjs`,
  `scripts/release-notes.mjs`, the files in `scripts/community/` and
  `family.test.js` (in `src/`, or in `test/`). Do not edit one here. To change
  one, change it in every repository at once, bump `FAMILY_TEMPLATE_VERSION` for
  the template, and record the new hash in `family.test.js`. What is the
  package's own goes in its own stylesheet, `demo/<name>.css`, and its page
  builder, `scripts/site.mjs`.
- **The list of the family in the README is made, not written.**
  `pnpm family:readme` writes it between its markers from
  `scripts/family-template.mjs`.
- **The workflows are the family's too.** `ci.yml` runs `pnpm check`, the demo's
  browser tests and the packed package on Linux, macOS and Windows; `pages.yml`
  is the same text in every package. A package adds jobs of its own after those.

## Pull requests

One change per pull request. Say what changed and how you checked it, and add a
line to `CHANGELOG.md` under **Unreleased**: for a change a user would notice,
and for one to the repository alone.

## Releasing

Maintainers bump the version in `package.json` (and in `src/version.ts`, where
the package has one), move *Unreleased* to the new version in `CHANGELOG.md`,
dated, push, wait for CI and tag `vX.Y.Z`, the same as `package.json`'s version.
The Release workflow (`.github/workflows/release.yml`) checks and builds the
package, attaches the tarball to a GitHub release and publishes it to npm by
trusted publishing, with provenance and no token. A version already on npm is
not published again.

## Particular to Domino

### Reporting a bug

A saved game (the text `encodeTrain` makes) is usually the whole report: it is
the table, the seed and the moves, and it plays again exactly. Say which move
you expected the rules to take or refuse, and where it ran (browser and
version, or Node, Deno or Bun and version).

### Commands and rules

```sh
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
  `CREDITS.md` with what was done to them; `pnpm sounds` writes
  `src/sounds.ts` from `sounds/`. No GPL or LGPL code.
- **The demo is tested by tapping it.** `e2e/*.demo.mjs` are Playwright tests
  that open the built demo in Chromium and WebKit, at a phone's width by touch
  and at a desktop's by mouse. After every flow they check that nothing is wider
  than the screen, nothing to tap is under 44px, and the page complained of
  nothing. The first time, `pnpm exec playwright install chromium webkit`
  fetches the browsers.
