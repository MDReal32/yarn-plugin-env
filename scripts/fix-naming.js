const { readFileSync, writeFileSync, mkdirSync } = require("node:fs");
const { resolve, dirname } = require("node:path");
const rimraf = require("rimraf");

const { name, "yarn.build": yarnBuild } = require("../package.json");
const [, dirtyName] = name.split("/");
const namespace = "@mdreal";
const pureName = dirtyName.replace("yarn-", "");

const root = resolve(process.cwd(), (yarnBuild && yarnBuild?.output) || "bundles");
const outDir = resolve(root, `@yarnpkg/${pureName}.js`);
const newOutDir = resolve(root, `${namespace}/${pureName}.js`);
const fileContent = readFileSync(outDir, "utf-8");
const replacedContent = fileContent.replace(new RegExp(`@yarnpkg/${pureName}`, "g"), `${namespace}/${pureName}`);
rimraf.sync(root);
mkdirSync(dirname(newOutDir), { recursive: true });
writeFileSync(newOutDir, replacedContent, "utf-8");
