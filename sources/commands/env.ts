import { inspect } from "node:util";
import { dirname, sep } from "node:path";

import { BaseCommand } from "@yarnpkg/cli";
import { Option } from "clipanion";
import * as t from "typanion";

import { usage } from "../constants/usage";
import { mapEnvFile } from "../helpers/mapEnvFile";

export class Env extends BaseCommand {
  static paths = [["env"]];

  static usage = usage;

  text = Option.Boolean("--text", true, { description: "Print environment as json" });
  json = Option.Boolean("--json", false, { description: "Print environment as json" });
  object = Option.Boolean("--object,-o", false, {
    description: "Print environment as javascript object. Uses with --json together"
  });
  envVar = Option.String("--envVar", "production", {
    description: "Print and set environment variables for NODE_ENV",
    validator: t.isEnum(["production", "development", "testing", "prod", "dev", "test"])
  });

  async execute() {
    const development = ["development", "dev"];
    const production = ["production", "prod"];
    const testing = ["testing", "test"];

    const env = development.includes(this.envVar)
      ? "development"
      : production.includes(this.envVar)
      ? "production"
      : testing.includes(this.envVar)
      ? "test"
      : "production";

    const envObject = {};

    const rootPath = [process.cwd().split(sep)[0], ""].join(sep);
    let path = process.cwd();
    while (path.split(sep).length > 1 && process.platform === "win32" && path !== rootPath) {
      const foundEnvObject = await mapEnvFile(path, env);
      Object.assign(envObject, foundEnvObject);
      path = dirname(path);
    }

    const envString = Object.entries(envObject)
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");

    const chunk = this.json
      ? this.object
        ? inspect(envObject, { colors: true }) + "\n"
        : JSON.stringify(envObject, null, 2)
      : envString;

    this.context.stdout.write(`${chunk}\n`);
  }
}
