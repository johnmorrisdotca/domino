// The Domino demo: a game of Mexican Train against the computer, set up with a few presses. Every rule, the
// legal plays, the computer's move and the words of the table (in English or Japanese) are the package's own;
// this page draws the state it is given and passes the person's choices on.
import { DOMINO_STRINGS, computerMove, dominoSay, encodeTrain, endsOf, handPips, laidEnds, legalPlays, mexicanOf, openEnd, playTrain, startTrain, tileWords, trainMoves, trainName, trainNews, trainSeatName, trainStatus, trainTotals } from "./dist/index.js";
import { createTileSounds } from "./dist/tile-sounds.js";

const $ = (id) => document.getElementById(id);

// The page's own words, beside the table's (DOMINO_STRINGS). The Japanese has not yet been read by a native reader: the page says so in Japanese only.
const PAGE = {
  en: {
    pitch: "Mexican Train for one against the computers: lay a train of dominoes out from the hub, and be first to empty your hand. Double-nine, double-twelve or double-fifteen, two to eight players.",
    name: "Domino is ドミノ, the word Japanese borrowed for dominoes.",
    nameLink: "About the name",
    pageApi: "API reference",
    pageBack: "The table",
    pageApiIntro: "Every export of every entry point, with its signature and its doc comment. Made from the source when the site is built, so it cannot fall behind the code.",
    pageSetup: "Set up the table",
    pageSet: "Set",
    pagePlayers: "Players",
    pageLength: "Rounds",
    pageDoubles: "Doubles",
    pageMexican: "Mexican Train",
    pageDeal: "Deal again",
    pageSound: "Sound",
    pageYourHand: "Your hand",
    pageScores: "Scores",
    pageRulesTitle: "How it plays",
    pageRulesText: "Each round starts from a hub double. Lay a tile whose end matches the end of a train: your own, the Mexican Train, or another player's that is open. A double must be covered before anything else is played. If you cannot lay, draw once; if that tile will not go either, pass, and your train opens for everyone until you next lay on it. Whoever empties their hand first ends the round, and the fewest pips over the game wins.",
    usingTitle: "Using it",
    usingText: "The table above is this package: every rule, every legal play and every computer move comes from it. This is all it takes to make the game you are looking at.",
    usingCode: "In code",
    usingCli: "From a terminal",
    usingCliText: "The same deal from the command line, with nothing to install; the language follows your system, or --lang ja.",
    usingSaved: "The game so far, as text",
    usingSavedText: "Everything the package keeps of a game: its table, its seed and its moves. Read it back with decodeTrain, or domino check.",
    usingCopy: "Copy the code",
    usingCopyLink: "Copy link to this deal",
    usingCopySaved: "Copy the game",
    usingCopied: "Copied",
    usingCopyFailed: "Copy it by hand",
    foot: "Open source under the MIT licence. Nothing here is stored or sent anywhere.",
  },
  ja: {
    pitch: "コンピューターを相手に遊ぶメキシカントレイン。ハブのドミノから牌を並べて道を伸ばし、手牌を最初に出し切りましょう。ダブルナイン、ダブルトゥエルブ、ダブルフィフティーン、2〜8人。",
    name: "「ドミノ」は、英語の domino をそのまま日本語に取り入れた言葉です。",
    nameLink: "名前について（英語）",
    pageApi: "API リファレンス",
    pageBack: "テーブル",
    pageApiIntro: "すべてのエントリポイントのすべてのエクスポートを、シグネチャとドキュメントコメントつきで載せています。サイトをビルドするときにソースから作るので、コードとずれません。",
    pageSetup: "テーブルの設定",
    pageSet: "セット",
    pagePlayers: "人数",
    pageLength: "ラウンド",
    pageDoubles: "ダブル",
    pageMexican: "メキシカントレイン",
    pageDeal: "配り直す",
    pageSound: "音",
    pageYourHand: "あなたの手牌",
    pageScores: "得点",
    pageRulesTitle: "遊び方",
    pageRulesText: "各ラウンドは、ハブのダブルから始まります。道の端と同じ数の端を持つ牌を置きます。置ける道は、自分の道、メキシカントレイン、そして開いている他のプレイヤーの道です。ダブルを置いたら、ほかの何よりも先に覆わなければなりません。置けないときは1枚引き、それも置けなければパスします。パスすると、次に自分の道に置くまで、その道は全員に開きます。手牌を最初に出し切った人がラウンドを終え、ゲーム全体でピップ（点）がいちばん少ない人が勝ちです。",
    usingTitle: "使い方",
    usingText: "上のテーブルは、このパッケージそのものです。ルール、置ける牌、コンピューターの手は、すべてパッケージが決めています。いま見ているゲームは、下のコードだけで作れます。",
    usingCode: "コードで",
    usingCli: "ターミナルで",
    usingCliText: "同じ配りをコマンドラインで。インストールは不要です。言語はシステムに従います（--lang ja でも指定できます）。",
    usingSaved: "ここまでのゲーム（テキスト）",
    usingSavedText: "パッケージがゲームについて保存するすべて（卓、シード、手）です。decodeTrain または domino check で読み直せます。",
    usingCopy: "コードをコピー",
    usingCopyLink: "この配りのリンクをコピー",
    usingCopySaved: "ゲームをコピー",
    usingCopied: "コピーしました",
    usingCopyFailed: "手でコピーしてください",
    foot: "MITライセンスのオープンソースです。ここでは何も保存せず、どこにも送りません。",
  },
};
const WORDS = { en: { ...DOMINO_STRINGS.en, ...PAGE.en }, ja: { ...DOMINO_STRINGS.ja, ...PAGE.ja } };

// The table's choices, read from the address if it names them (a link to a deal), else the usual table.
const asked = new URLSearchParams(location.search);
const choice = (name, allowed, usual) => (allowed.includes(asked.get(name)) ? asked.get(name) : usual);
const settings = {
  set: Number(choice("set", ["9", "12", "15"], "12")),
  count: Number(choice("players", ["2", "3", "4", "6", "8"], "4")),
  length: choice("length", ["short", "full"], "short"),
  doubles: choice("doubles", ["one", "chain"], "one"),
  mexican: choice("mexican", ["any", "own-first"], "any") === "own-first" ? "ownFirst" : "any",
};
let seed = /^\d{1,10}$/.test(asked.get("seed") ?? "") && Number(asked.get("seed")) <= 4294967295 ? Number(asked.get("seed")) : null;
let game = null;
let chosen = null;
let timer = null;

const language = familyLanguage({
  id: "domino",
  words: WORDS,
  onChange: () => render(),
});
const t = (key, values = {}) => dominoSay(language.word(key), values);

// Seats are named by the package, in the page's language, so a switch of language renames them at once.
const who = (seat) => trainSeatName(game, seat, language.lang, 0);
const delay = () => window.dominoDelay ?? 750;
const drawSeed = () => Math.floor(Math.random() * 2147483647) + 1;

/** The address names this deal, so that copying it shares it. */
function writeAddress() {
  const query = new URLSearchParams(location.search);
  query.set("set", String(game.set));
  query.set("players", String(game.players.length));
  query.set("length", game.options.length);
  query.set("doubles", game.options.doubles);
  query.set("mexican", game.options.mexican === "ownFirst" ? "own-first" : "any");
  query.set("seed", String(game.seed));
  history.replaceState(history.state, "", `${location.pathname}?${query}${location.hash}`);
}

/** A new deal at the table as chosen. Pressing Deal again takes a new seed; changing the table keeps the one in use. */
function deal(fresh = false) {
  if (fresh || seed === null) seed = drawSeed();
  const count = settings.count;
  game = startTrain(settings.set, Array.from({ length: count }, () => ""), seed, { length: settings.length, doubles: settings.doubles, mexican: settings.mexican }, Array.from({ length: count }, (_, at) => at !== 0));
  chosen = null;
  writeAddress();
  sounds.play("shuffle");
  render();
}

// The tile sounds, off until the person turns them on: nothing is fetched before then.
const sounds = createTileSounds({ muted: true });
const SOUND_OF = { play: "lay", draw: "draw", pass: "knock", next: "shuffle" };
$("sound").addEventListener("click", () => {
  const on = $("sound").getAttribute("aria-pressed") !== "true";
  $("sound").setAttribute("aria-pressed", String(on));
  sounds.setMuted(!on);
  if (on) sounds.play("lay");
});

function play(move) {
  const next = playTrain(game, move);
  if (next === null) return;
  sounds.play(SOUND_OF[move.kind]);
  game = next;
  chosen = null;
  render();
}

/** One tile as an element: its two ends as numbers on a divided face. */
function tile(a, b, { button = false, laid = false } = {}) {
  const el = document.createElement(button ? "button" : "span");
  el.className = `tile${laid ? " laid" : ""}`;
  if (button) el.type = "button";
  el.dataset.ends = `${a}-${b}`;
  if (a === b) el.dataset.double = "true";
  const left = document.createElement("b");
  left.textContent = String(a);
  const divide = document.createElement("i");
  const right = document.createElement("b");
  right.textContent = String(b);
  el.append(left, divide, right);
  return el;
}

const plays = () => (game.phase === "playing" && game.toPlay === 0 ? legalPlays(game) : []);

function tapTile(domino) {
  const options = plays().filter((one) => one.tile === domino);
  if (options.length === 0) return;
  if (options.length === 1) return play({ kind: "play", tile: domino, train: options[0].train });
  chosen = chosen === domino ? null : domino;
  render();
}

function render() {
  if (game === null) return;
  clearTimeout(timer);
  const mine = game.toPlay === 0 && game.phase === "playing";
  const legal = plays();
  const moves = game.phase === "finished" ? [] : trainMoves(game);
  const mexican = mexicanOf(game);

  $("info").textContent = `${t("round", { n: game.round + 1, total: game.rounds, engine: game.engine })} · ${t("boneyard", { n: game.boneyard.length })}`;

  // The status line: whose move it is, and what is wanted of a person. Choosing which train a tile goes on is the page's own step.
  $("status").textContent = mine && chosen !== null && moves[0]?.kind === "play" ? t("yourTurnChoose") : trainStatus(game, language.lang, 0);
  // What just happened.
  $("news").textContent = trainNews(game, language.lang, 0);

  // The trains: every seat's own, then the Mexican Train.
  const canLayTo = new Set(chosen === null ? [] : legal.filter((one) => one.tile === chosen).map((one) => one.train));
  const rows = game.trains.map((train, index) => {
    const row = document.createElement("div");
    row.className = "train";
    row.dataset.train = String(index);
    row.dataset.open = String(train.open);
    row.dataset.turn = String(game.phase === "playing" && game.toPlay === index);
    const head = document.createElement("div");
    head.className = "train-head";
    const name = document.createElement("b");
    name.textContent = trainName(game, index, language.lang, 0);
    const meta = document.createElement("span");
    meta.textContent = index === mexican ? t("open") : `${t("tilesLeft", { n: game.hands[index].length })} · ${t(train.open ? "open" : "closed")}`;
    head.append(name, meta);
    const line = document.createElement("div");
    line.className = "train-line";
    line.append(tile(game.engine, game.engine, { laid: true }));
    for (const one of train.laid) {
      const [from, to] = laidEnds(one);
      line.append(tile(from, to, { laid: true }));
    }
    const end = document.createElement("span");
    end.className = "need";
    end.textContent = t("needs", { n: openEnd(game, index) });
    line.append(end);
    if (canLayTo.has(index)) {
      const lay = document.createElement("button");
      lay.type = "button";
      lay.className = "fam-button lay";
      lay.dataset.primary = "true";
      lay.dataset.testid = "lay";
      lay.textContent = t("layHere");
      lay.addEventListener("click", () => play({ kind: "play", tile: chosen, train: index }));
      line.append(lay);
    }
    row.append(head, line);
    return row;
  });
  $("trains").replaceChildren(...rows);

  // Your hand, the tiles that may be laid lifted.
  const hand = [...game.hands[0]].sort((x, y) => {
    const [xl, xh] = endsOf(x);
    const [yl, yh] = endsOf(y);
    return xh - yh || xl - yl;
  });
  $("hand").replaceChildren(
    ...hand.map((domino) => {
      const [low, high] = endsOf(domino);
      const button = tile(high, low, { button: true });
      const playable = legal.some((one) => one.tile === domino);
      button.disabled = !playable;
      button.dataset.playable = String(playable);
      button.setAttribute("aria-label", tileWords(domino));
      if (chosen === domino) button.setAttribute("aria-pressed", "true");
      button.addEventListener("click", () => tapTile(domino));
      return button;
    }),
  );

  // The buttons the situation wants.
  const bar = [];
  const press = (label, move, strong = false) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "fam-button";
    if (strong) button.dataset.primary = "true";
    button.textContent = label;
    button.addEventListener("click", () => play(move));
    bar.push(button);
  };
  if (game.phase === "roundOver") press(t("nextRound"), { kind: "next" }, true);
  else if (game.phase === "finished") {
    const again = document.createElement("button");
    again.type = "button";
    again.className = "fam-button";
    again.dataset.primary = "true";
    again.textContent = t("again");
    again.addEventListener("click", () => deal(true));
    bar.push(again);
  } else if (mine && moves[0]?.kind === "draw") press(t("draw"), { kind: "draw" }, true);
  else if (mine && moves[0]?.kind === "pass") press(t("pass"), { kind: "pass" }, true);
  $("moves").replaceChildren(...bar);

  drawScores();
  drawUsing();

  // A computer's move after a pause, so that a person can follow it.
  if (game.phase === "playing" && game.toPlay !== 0) {
    const at = game.history?.count ?? 0;
    timer = setTimeout(() => {
      if ((game.history?.count ?? 0) === at) play(computerMove(game));
    }, delay());
  }
}

/** The code that makes the game on the table, and its saved text: made from the game itself, so they are always the table's. */
function drawUsing() {
  const names = JSON.stringify(game.players);
  const options = `{ length: "${game.options.length}", doubles: "${game.options.doubles}", mexican: "${game.options.mexican}" }`;
  $("using-code").textContent = `import { computerMove, legalPlays, playTrain, startTrain } from "@johnmorrisdotca/domino";

// ${game.players.length} at a double-${game.set} table; the seats the computers play are the ones marked true.
let game = startTrain(${game.set}, ${names}, ${game.seed}, ${options}, [${game.computers.join(", ")}]);
legalPlays(game);                           // every tile the first player may lay, and on which train
game = playTrain(game, computerMove(game)); // a move: the next game, or null for one the rules refuse`;
  const command = `npx @johnmorrisdotca/domino deal --seed ${game.seed} --players ${game.players.length} --set ${game.set}`;
  $("cli-code").textContent = command;
  $("saved-code").textContent = encodeTrain(game);
}

function drawScores() {
  const table = $("scores");
  const head = document.createElement("tr");
  const corner = document.createElement("th");
  corner.textContent = t("hub");
  head.append(corner);
  for (let seat = 0; seat < game.players.length; seat += 1) {
    const th = document.createElement("th");
    th.textContent = who(seat);
    head.append(th);
  }
  const body = game.results.map((result) => {
    const row = document.createElement("tr");
    const hub = document.createElement("th");
    hub.textContent = String(result.engine);
    row.append(hub);
    result.pips.forEach((pips, seat) => {
      const td = document.createElement("td");
      td.textContent = String(pips);
      if (result.out === seat) td.dataset.out = "true";
      row.append(td);
    });
    return row;
  });
  const totals = trainTotals(game);
  const total = document.createElement("tr");
  const label = document.createElement("th");
  label.textContent = t("total");
  total.append(label);
  totals.forEach((value, seat) => {
    const td = document.createElement("td");
    const strong = document.createElement("b");
    strong.textContent = String(value);
    td.append(strong);
    if (game.phase === "playing" && seat === 0) td.title = t("pips", { n: handPips(game.hands[0]) });
    total.append(td);
  });
  table.replaceChildren(head, ...body, total);
}

function press(group, attribute, value) {
  for (const button of $(group).children) button.setAttribute("aria-pressed", String(button.dataset[attribute] === String(value)));
}
for (const [group, attribute, key] of [["sets", "set", "set"], ["players", "count", "count"], ["lengths", "length", "length"], ["doubles", "doubles", "doubles"], ["mexicans", "mexican", "mexican"]]) {
  for (const button of $(group).children) {
    button.addEventListener("click", () => {
      settings[key] = key === "set" || key === "count" ? Number(button.dataset[attribute]) : button.dataset[attribute];
      press(group, attribute, settings[key]);
      deal();
    });
  }
}
$("deal").addEventListener("click", () => deal(true));
// The buttons show the table the address named.
for (const [group, attribute, key] of [["sets", "set", "set"], ["players", "count", "count"], ["lengths", "length", "length"], ["doubles", "doubles", "doubles"], ["mexicans", "mexican", "mexican"]]) press(group, attribute, settings[key]);

/** Put text on the clipboard and say so on the button for a moment. */
async function copy(button, text, label) {
  let said = t("usingCopied");
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    said = t("usingCopyFailed");
  }
  button.textContent = said;
  button.dataset.said = "true";
  setTimeout(() => {
    button.textContent = t(label);
    delete button.dataset.said;
  }, 1500);
}
$("copy-code").addEventListener("click", () => copy($("copy-code"), $("using-code").textContent, "usingCopy"));
$("copy-link").addEventListener("click", () => copy($("copy-link"), location.href, "usingCopyLink"));
$("copy-saved").addEventListener("click", () => copy($("copy-saved"), $("saved-code").textContent, "usingCopySaved"));

deal();
document.documentElement.dataset.ready = "true";
