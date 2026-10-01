/**
 * Every word Domino says to a person, in English and Japanese: what a table
 * says (whose turn it is, what was laid, how the round ended) and what the
 * command line says. One table, so the two languages are kept side by side
 * and a test can hold them together. `{n}`, `{who}` and the other braces are
 * filled in with `dominoSay`; a table of your own must keep them.
 */

/** The languages Domino speaks. */
export type Language = "en" | "ja";

/** The names of the strings. Each is one line or one block of text. */
export type DominoStrings = {
  /** The set's names, by its highest double. */
  set9: string;
  set12: string;
  set15: string;
  /** The house rules' names, each with the way it is chosen. */
  lengthFull: string;
  lengthShort: string;
  doublesOne: string;
  doublesChain: string;
  mexicanAny: string;
  mexicanOwnFirst: string;
  /** A seat's default name. */
  you: string;
  computer: string;
  player: string;
  /** The trains. */
  mexican: string;
  trainYours: string;
  trainOf: string;
  open: string;
  closed: string;
  tilesLeft: string;
  boneyard: string;
  round: string;
  needs: string;
  hub: string;
  total: string;
  pips: string;
  /** What to press. */
  layHere: string;
  draw: string;
  pass: string;
  nextRound: string;
  again: string;
  /** The status line: what is wanted of a person, or who is to play. */
  yourTurn: string;
  yourTurnCover: string;
  yourTurnDraw: string;
  yourTurnPass: string;
  yourTurnChoose: string;
  thinking: string;
  roundOver: string;
  outBy: string;
  blocked: string;
  gameOver: string;
  /** What just happened. */
  laid: string;
  drew: string;
  passed: string;
  dealt: string;
  /** The command line's help, whole. */
  cliUsage: string;
  cliUnknown: string;
  cliNeeds: string;
  cliTryHelp: string;
  cliLangBad: string;
  cliNoCommand: string;
  cliCommandBad: string;
  cliSetBad: string;
  cliPlayersBad: string;
  cliSeedBad: string;
  cliValueBad: string;
  cliNoSaved: string;
  cliSavedBad: string;
  cliFresh: string;
  cliDeal: string;
  cliSeat: string;
  cliBoneyard: string;
  cliPlayed: string;
  cliWinner: string;
  cliWinners: string;
  cliSaved: string;
  cliPhasePlaying: string;
  cliPhaseRoundOver: string;
  cliPhaseFinished: string;
};

/** Every string, in both languages. The Japanese has not yet been read by a native reader. */
export const DOMINO_STRINGS: Record<Language, DominoStrings> = {
  en: {
    set9: "Double-nine",
    set12: "Double-twelve",
    set15: "Double-fifteen",
    lengthFull: "Every double",
    lengthShort: "Short",
    doublesOne: "Cover one",
    doublesChain: "Chain",
    mexicanAny: "Anyone, any time",
    mexicanOwnFirst: "After your own",
    you: "You",
    computer: "Computer {n}",
    player: "Player {n}",
    mexican: "Mexican Train",
    trainYours: "Your train",
    trainOf: "{who}'s train",
    open: "open",
    closed: "closed",
    tilesLeft: "{n} left",
    boneyard: "Boneyard: {n}",
    round: "Round {n} of {total}, hub double {engine}",
    needs: "Next: {n}",
    hub: "Hub",
    total: "Total",
    pips: "{n} pips",
    layHere: "Lay here",
    draw: "Draw a tile",
    pass: "Pass",
    nextRound: "Next round",
    again: "Play again",
    yourTurn: "Your turn. Tap a tile to lay it.",
    yourTurnCover: "Your turn. Cover the double.",
    yourTurnDraw: "Nothing fits. Draw a tile.",
    yourTurnPass: "Nothing fits. Pass.",
    yourTurnChoose: "Choose a train for the tile.",
    thinking: "{who} to play.",
    roundOver: "Round over. {why}",
    outBy: "{who} played out.",
    blocked: "Nobody can play.",
    gameOver: "Game over. {who} won with {pips} pips.",
    laid: "{who} laid {tile} on {train}.",
    drew: "{who} drew a tile.",
    passed: "{who} passed.",
    dealt: "Round {n} dealt: the hub double is {engine}.",
    cliUsage: `Usage: domino <command> [options]

Dominoes and Mexican Train: the same deal for the same seed, on every machine.

  domino deal --seed 2026 --players 4      the deal a seed makes: every hand, and the hub double
  domino play --seed 2026 --players 4      a game played out by computers, with its scores
  domino play --seed 2026 --moves          ...and every move, in words
  domino play --seed 2026 --save           ...and the saved game, as text
  domino check "<saved game>"              read a saved game back through the rules, and say where it stands
  domino replay "<saved game>"             every move of a saved game, in words

Options:
      --set <9|12|15>        the set, by its highest double (12 unless said)
      --players <2..8>       how many sit at the table (4 unless said)
  -s, --seed <n>             a whole number (one is drawn, and named on standard error, unless given)
      --length <full|short>  every round, or half of them (full unless said)
      --doubles <one|chain>  cover each double at once, or chain doubles (one unless said)
      --mexican <any|own-first>
                             the Mexican Train open to all, or only once you have laid on your own
      --moves                play: print every move
      --save                 play: print the saved game on the last line
      --stdin                check, replay: read the saved game from standard input
  -j, --json                 print JSON (format 1) for deal, play and check
      --lang <en|ja>         English or Japanese (default: your system's)
  -h, --help                 this help
  -v, --version              the version

Exit codes: 0 done, 1 what was asked for could not be done (a saved game the
rules refuse), 2 the command was wrong.
`,
    cliUnknown: "unknown option {part}",
    cliNeeds: "{part} needs a value",
    cliTryHelp: "Try `domino --help`.",
    cliLangBad: "--lang takes en or ja",
    cliNoCommand: "say what to do: deal, play, check or replay",
    cliCommandBad: "“{part}” is not a command: deal, play, check or replay",
    cliSetBad: "--set takes 9, 12 or 15",
    cliPlayersBad: "--players takes a whole number from 2 to 8",
    cliSeedBad: "--seed takes a whole number from 0 to 4294967295",
    cliValueBad: "{part} takes one of: {choices}",
    cliNoSaved: "there is no saved game to read: give it after the command, or with --stdin",
    cliSavedBad: "that is not a game these rules can play out again",
    cliFresh: "seed {seed} (pass --seed {seed} to repeat this)",
    cliDeal: "{set}, {players} players, seed {seed}",
    cliSeat: "{who}: {tiles}",
    cliBoneyard: "Boneyard: {n} tiles",
    cliPlayed: "{set}, {players} players, seed {seed}, {rounds} rounds; moves made: {moves}",
    cliWinner: "Winner: {who} with {pips} pips.",
    cliWinners: "Winners: {who}, each with {pips} pips.",
    cliSaved: "Saved game:",
    cliPhasePlaying: "Round {n} of {total} is being played; {who} is to play.",
    cliPhaseRoundOver: "Round {n} of {total} is over; the next is to be dealt.",
    cliPhaseFinished: "The game is over.",
  },
  ja: {
    set9: "ダブルナイン",
    set12: "ダブルトゥエルブ",
    set15: "ダブルフィフティーン",
    lengthFull: "すべてのダブル",
    lengthShort: "短め",
    doublesOne: "1枚で覆う",
    doublesChain: "連続",
    mexicanAny: "いつでも誰でも",
    mexicanOwnFirst: "自分の道のあと",
    you: "あなた",
    computer: "コンピューター{n}",
    player: "プレイヤー{n}",
    mexican: "メキシカントレイン",
    trainYours: "あなたの道",
    trainOf: "{who}の道",
    open: "開放",
    closed: "閉鎖",
    tilesLeft: "残り{n}枚",
    boneyard: "山: {n}枚",
    round: "第{n}ラウンド（全{total}）、ハブのダブル {engine}",
    needs: "次: {n}",
    hub: "ハブ",
    total: "合計",
    pips: "{n}点",
    layHere: "ここに置く",
    draw: "1枚引く",
    pass: "パス",
    nextRound: "次のラウンド",
    again: "もう一度",
    yourTurn: "あなたの番です。牌をタップして置きます。",
    yourTurnCover: "あなたの番です。ダブルを覆ってください。",
    yourTurnDraw: "置ける牌がありません。1枚引いてください。",
    yourTurnPass: "置ける牌がありません。パスしてください。",
    yourTurnChoose: "牌を置く道を選んでください。",
    thinking: "{who}の番です。",
    roundOver: "ラウンド終了。{why}",
    outBy: "{who}が出し切りました。",
    blocked: "誰も置けません。",
    gameOver: "ゲーム終了。{who}の勝ち（{pips}点）。",
    laid: "{who}が{tile}を{train}に置きました。",
    drew: "{who}が1枚引きました。",
    passed: "{who}はパスしました。",
    dealt: "第{n}ラウンドを配りました。ハブのダブルは{engine}です。",
    cliUsage: `使い方: domino <コマンド> [オプション]

ドミノとメキシカントレイン。同じシードなら、どの環境でも同じ配りになります。

  domino deal --seed 2026 --players 4      シードが作る配り（全員の手牌とハブのダブル）
  domino play --seed 2026 --players 4      コンピューターだけで最後まで遊び、得点を表示
  domino play --seed 2026 --moves          ...さらに、すべての手を言葉で表示
  domino play --seed 2026 --save           ...さらに、保存したゲームをテキストで表示
  domino check "<保存したゲーム>"          保存したゲームをルールどおりに読み直し、状況を表示
  domino replay "<保存したゲーム>"         保存したゲームのすべての手を言葉で表示

オプション:
      --set <9|12|15>        セット（最大のダブルで指定。指定なしは12）
      --players <2..8>       卓の人数（指定なしは4）
  -s, --seed <n>             整数（指定がなければ決めて、標準エラーに表示します）
      --length <full|short>  すべてのラウンド、またはその半分（指定なしは full）
      --doubles <one|chain>  ダブルをすぐ覆う、または連続で出せる（指定なしは one）
      --mexican <any|own-first>
                             メキシカントレインを誰でも使える、または自分の道に置いたあと
      --moves                play: すべての手を表示
      --save                 play: 最後の行に保存したゲームを表示
      --stdin                check, replay: 保存したゲームを標準入力から読む
  -j, --json                 deal, play, check の結果をJSON（形式1）で表示
      --lang <en|ja>         英語または日本語（指定なしはシステムの言語）
  -h, --help                 このヘルプ
  -v, --version              バージョン

終了コード: 0 完了、1 できなかった（ルールが受け付けない保存ゲーム）、
2 コマンドの誤り。
`,
    cliUnknown: "不明なオプションです: {part}",
    cliNeeds: "{part} には値が必要です",
    cliTryHelp: "`domino --help` をご覧ください。",
    cliLangBad: "--lang は en か ja です",
    cliNoCommand: "コマンドを指定してください: deal, play, check, replay",
    cliCommandBad: "「{part}」はコマンドではありません: deal, play, check, replay",
    cliSetBad: "--set は 9、12、15 のいずれかです",
    cliPlayersBad: "--players は2〜8の整数です",
    cliSeedBad: "--seed は0〜4294967295の整数です",
    cliValueBad: "{part} は次のいずれかです: {choices}",
    cliNoSaved: "読む保存ゲームがありません。コマンドの後ろに書くか、--stdin を使ってください",
    cliSavedBad: "このルールでは最後まで再現できないゲームです",
    cliFresh: "シード {seed}（--seed {seed} で同じ結果を再現できます）",
    cliDeal: "{set}、{players}人、シード {seed}",
    cliSeat: "{who}: {tiles}",
    cliBoneyard: "山: {n}枚",
    cliPlayed: "{set}、{players}人、シード {seed}、{rounds}ラウンド、手数: {moves}",
    cliWinner: "勝者: {who}（{pips}点）。",
    cliWinners: "勝者: {who}（それぞれ{pips}点）。",
    cliSaved: "保存したゲーム:",
    cliPhasePlaying: "第{n}ラウンド（全{total}）の途中です。{who}の番です。",
    cliPhaseRoundOver: "第{n}ラウンド（全{total}）が終わりました。次のラウンドを配ります。",
    cliPhaseFinished: "ゲームは終了しています。",
  },
};

/** A string with its braces filled in from `values`; a brace with no value is left as it is. */
export function dominoSay(text: string, values: Readonly<Record<string, string | number>> = {}): string {
  return text.replace(/\{(\w+)\}/g, (whole, name: string) => (name in values ? String(values[name]) : whole));
}

/** The language a person asked for, by `en` or `ja` or a tag that begins with one: English for anything else. */
export function dominoLanguage(tag: string | undefined): Language {
  return (tag ?? "en").toLowerCase().startsWith("ja") ? "ja" : "en";
}
