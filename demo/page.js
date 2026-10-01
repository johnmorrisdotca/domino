// The Domino demo: a game of Mexican Train against the computer, set up with a few presses. Every rule, the
// legal plays and the computer's move are the package's own; this page draws the state it is given and passes
// the person's choices on. Everything it says is in English or Japanese.
import { computerMove, endsOf, handPips, laidEnds, legalPlays, mexicanOf, openEnd, playTrain, startTrain, tileWords, trainMoves, trainTotals } from "./dist/index.js";

const $ = (id) => document.getElementById(id);

// The page's own words. The Japanese has not yet been read by a native reader: the page says so in Japanese only.
const WORDS = {
  en: {
    pitch: "Mexican Train for one against the computers: lay a train of dominoes out from the hub, and be first to empty your hand. Double-nine, double-twelve or double-fifteen, two to eight players.",
    name: "Domino is ドミノ, the word Japanese borrowed for dominoes.",
    nameLink: "About the name",
    pageApi: "API reference",
    pageBack: "The table",
    pageApiIntro: "Every export of every entry point, with its signature and its doc comment. Made from the source when the site is built, so it cannot fall behind the code.",
    pageSetup: "Set up the table",
    pageSet: "Set",
    pageSet9: "Double-nine",
    pageSet12: "Double-twelve",
    pageSet15: "Double-fifteen",
    pagePlayers: "Players",
    pageLength: "Rounds",
    pageShort: "Short",
    pageFull: "Every double",
    pageDoubles: "Doubles",
    pageOne: "Cover one",
    pageChain: "Chain",
    pageMexican: "Mexican Train",
    pageAny: "Anyone, any time",
    pageOwnFirst: "After your own",
    pageDeal: "Deal again",
    pageYourHand: "Your hand",
    pageScores: "Scores",
    pageRulesTitle: "How it plays",
    pageRulesText: "Each round starts from a hub double. Lay a tile whose end matches the end of a train: your own, the Mexican Train, or another player's that is open. A double must be covered before anything else is played. If you cannot lay, draw once; if that tile will not go either, pass, and your train opens for everyone until you next lay on it. Whoever empties their hand first ends the round, and the fewest pips over the game wins.",
    you: "You",
    computer: "Computer {n}",
    mexican: "Mexican Train",
    open: "open",
    closed: "closed",
    tilesLeft: "{n} left",
    boneyard: "Boneyard: {n}",
    round: "Round {n} of {total}, hub double {engine}",
    needs: "Next: {n}",
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
    trainOf: "{who}'s train",
    trainYours: "Your train",
    round_col: "Hub",
    total: "Total",
    pips: "{n} pips",
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
    pageSet9: "ダブルナイン",
    pageSet12: "ダブルトゥエルブ",
    pageSet15: "ダブルフィフティーン",
    pagePlayers: "人数",
    pageLength: "ラウンド",
    pageShort: "短め",
    pageFull: "すべてのダブル",
    pageDoubles: "ダブル",
    pageOne: "1枚で覆う",
    pageChain: "連続",
    pageMexican: "メキシカントレイン",
    pageAny: "いつでも誰でも",
    pageOwnFirst: "自分の道のあと",
    pageDeal: "配り直す",
    pageYourHand: "あなたの手牌",
    pageScores: "得点",
    pageRulesTitle: "遊び方",
    pageRulesText: "各ラウンドは、ハブのダブルから始まります。道の端と同じ数の端を持つ牌を置きます。置ける道は、自分の道、メキシカントレイン、そして開いている他のプレイヤーの道です。ダブルを置いたら、ほかの何よりも先に覆わなければなりません。置けないときは1枚引き、それも置けなければパスします。パスすると、次に自分の道に置くまで、その道は全員に開きます。手牌を最初に出し切った人がラウンドを終え、ゲーム全体でピップ（点）がいちばん少ない人が勝ちです。",
    you: "あなた",
    computer: "コンピューター{n}",
    mexican: "メキシカントレイン",
    open: "開放",
    closed: "閉鎖",
    tilesLeft: "残り{n}枚",
    boneyard: "山: {n}枚",
    round: "第{n}ラウンド（全{total}）、ハブのダブル {engine}",
    needs: "次: {n}",
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
    trainOf: "{who}の道",
    trainYours: "あなたの道",
    round_col: "ハブ",
    total: "合計",
    pips: "{n}点",
    foot: "MITライセンスのオープンソースです。ここでは何も保存せず、どこにも送りません。",
  },
};

const settings = { set: 12, count: 4, length: "short", doubles: "one", mexican: "any" };
let game = null;
let chosen = null;
let timer = null;
const asked = new URLSearchParams(location.search);

const language = familyLanguage({
  id: "domino",
  words: WORDS,
  onChange: () => render(),
});
const t = (key, values = {}) => language.word(key).replace(/\{(\w+)\}/g, (whole, name) => (name in values ? String(values[name]) : whole));

const names = () => [t("you"), ...Array.from({ length: settings.count - 1 }, (_, at) => t("computer", { n: at + 1 }))];
const who = (seat) => (seat === 0 ? t("you") : t("computer", { n: seat }));
const trainName = (train) => (train === mexicanOf(game) ? t("mexican") : train === 0 ? t("trainYours") : t("trainOf", { who: who(train) }));
const delay = () => window.dominoDelay ?? 750;

function deal() {
  const seed = /^\d{1,10}$/.test(asked.get("seed") ?? "") ? Number(asked.get("seed")) : Math.floor(Math.random() * 2147483647);
  game = startTrain(settings.set, names(), seed, { length: settings.length, doubles: settings.doubles, mexican: settings.mexican }, names().map((_, seat) => seat !== 0));
  chosen = null;
  render();
}

function play(move) {
  const next = playTrain(game, move);
  if (next === null) return;
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

  // The status line: whose move it is, and what is wanted of a person.
  let status;
  if (game.phase === "finished") status = t("gameOver", { who: game.winners.map(who).join(" & "), pips: Math.min(...trainTotals(game)) });
  else if (game.phase === "roundOver") {
    const last = game.results[game.results.length - 1];
    status = t("roundOver", { why: last.ending === "domino" ? t("outBy", { who: who(last.out) }) : t("blocked") });
  } else if (!mine) status = t("thinking", { who: who(game.toPlay) });
  else if (moves[0]?.kind === "draw") status = t("yourTurnDraw");
  else if (moves[0]?.kind === "pass") status = t("yourTurnPass");
  else if (chosen !== null) status = t("yourTurnChoose");
  else if (game.uncovered.length > 0) status = t("yourTurnCover");
  else status = t("yourTurn");
  $("status").textContent = status;

  // What just happened.
  const last = game.last;
  let news = "";
  if (last !== null) {
    if (last.move.kind === "play") {
      news = t("laid", { who: who(last.seat), tile: tileWords(last.move.tile), train: trainName(last.move.train) });
    } else if (last.move.kind === "draw") news = t("drew", { who: who(last.seat) });
    else if (last.move.kind === "pass") news = t("passed", { who: who(last.seat) });
  }
  $("news").textContent = news;

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
    name.textContent = trainName(index);
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
    again.addEventListener("click", deal);
    bar.push(again);
  } else if (mine && moves[0]?.kind === "draw") press(t("draw"), { kind: "draw" }, true);
  else if (mine && moves[0]?.kind === "pass") press(t("pass"), { kind: "pass" }, true);
  $("moves").replaceChildren(...bar);

  drawScores();

  // A computer's move after a pause, so that a person can follow it.
  if (game.phase === "playing" && game.toPlay !== 0) {
    const at = game.history?.count ?? 0;
    timer = setTimeout(() => {
      if ((game.history?.count ?? 0) === at) play(computerMove(game));
    }, delay());
  }
}

function drawScores() {
  const table = $("scores");
  const head = document.createElement("tr");
  const corner = document.createElement("th");
  corner.textContent = t("round_col");
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
$("deal").addEventListener("click", deal);

deal();
document.documentElement.dataset.ready = "true";
