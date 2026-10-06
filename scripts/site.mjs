// Builds the static demo for GitHub Pages into ./site: the table's page and the API reference, each put together
// from the family's shared header and footer (scripts/family-template.mjs, which every package shares unchanged)
// and this package's own body, the two stylesheets, and the compiled library.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

import { apiBody } from "./api.mjs";
import { FAMILY_SCRIPT, familyFooter, familyHead, familyHeader, familyUnreviewed } from "./family-template.mjs";

const id = "domino";
const icon = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect x='8' y='22' width='84' height='56' rx='10' fill='%23fffdf8' stroke='%232f5d4a' stroke-width='6'/%3E%3Cpath d='M50 22V78' stroke='%232f5d4a' stroke-width='5'/%3E%3Ccircle cx='28' cy='50' r='6' fill='%231f2320'/%3E%3Ccircle cx='66' cy='38' r='6' fill='%231f2320'/%3E%3Ccircle cx='78' cy='62' r='6' fill='%231f2320'/%3E%3C/svg%3E`;
const frame = ({ title, description, links, body, scripts }) => `<!doctype html>
<html lang="en">
  <head>
    ${familyHead({ id, title, description, ogTitle: "Domino ドミノ: Mexican Train", ogDescription: "Play Mexican Train against the computers, with dominoes in three sizes of set." })}
    <link rel="icon" href="${icon}" />
    <link rel="stylesheet" href="family.css" />
    <link rel="stylesheet" href="domino.css" />
  </head>
  <body>
    <main>
      ${familyHeader({ id, links })}
${body}
      ${familyFooter({ id })}
    </main>
    <script>${FAMILY_SCRIPT}</script>
    ${scripts}
  </body>
</html>
`;

rmSync("site", { recursive: true, force: true });
mkdirSync("site", { recursive: true });
for (const file of ["family.css", "domino.css", "page.js"]) cpSync(`demo/${file}`, `site/${file}`);
cpSync("dist", "site/dist", { recursive: true });

writeFileSync(
  "site/index.html",
  frame({
    title: "Domino · Mexican Train, against computers",
    description: "Play Mexican Train against one to seven computers with double-nine, double-twelve or double-fifteen dominoes, every rule and house rule the Domino package plays by, in English and Japanese. Free and open source.",
    links: [{ href: "api.html", say: "pageApi" }],
    body: readFileSync("demo/body.html", "utf8").replace("__UNREVIEWED__", familyUnreviewed({ id })).trimEnd(),
    scripts: `<script type="module" src="page.js"></script>`,
  }),
);

const api = apiBody();
writeFileSync(
  "site/api.html",
  frame({
    title: "Domino API reference: every export, with its signature",
    description: "The API reference of the Domino package: every export of every entry point, with its signature and its documentation, made from the source.",
    links: [{ href: "./", say: "pageBack" }],
    body: `      ${api.html}\n      ${familyUnreviewed({ id })}`,
    scripts: `<script type="module">
      const words = (pitch, back, name, nameLink, foot) => ({ pitch, pageBack: back, name, nameLink, foot });
      familyLanguage({
        id: "domino",
        words: {
          en: words("Every export of every entry point, with its signature and its doc comment. Made from the source when the site is built, so it cannot fall behind the code.", "The table", "Domino is ドミノ, the word Japanese borrowed for dominoes.", "About the name", "Open source under the MIT licence."),
          ja: words("すべてのエントリポイントのすべてのエクスポートを、シグネチャとドキュメントコメントつきで載せています。サイトをビルドするときにソースから作るので、コードとずれません。", "テーブル", "「ドミノ」は、英語の domino をそのまま日本語に取り入れた言葉です。", "名前について（英語）", "MITライセンスのオープンソースです。"),
        },
      });
    </script>`,
  }),
);
console.log(`site/ is ready (${api.total} exports in api.html): serve it, or let the Pages workflow publish it.`);
