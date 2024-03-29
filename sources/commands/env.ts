import { inspect } from "node:util";
import { dirname, sep } from "node:path";

import { BaseCommand } from "@yarnpkg/cli";
import { Option } from "clipanion";
import * as t from "typanion";

import { usage } from "../constants/usage";
import { mapEnvFile } from "../helpers/mapEnvFile";
import { replaceEnvVars } from "../helpers/replaceEnvVars";

export class Env extends BaseCommand {
  static paths = [["env"]];

  static usage = usage;

  text = Option.Boolean("--text", true, { description: "Print environment as json" });
  json = Option.Boolean("--json", false, { description: "Print environment as json" });
  object = Option.Boolean("--object,-o", false, {
    description: "Print environment as javascript object. Uses with --json together",
  });
  envVar = Option.String("--envVar", null, {
    description: "Print and set environment variables for NODE_ENV",
    validator: t.isEnum(["production", "development", "testing", "prod", "dev", "test"]),
  });

  async execute() {
    const NODE_ENV = process.env.NODE_ENV;
    const development = ["development", "dev"];
    const production = ["production", "prod"];
    const testing = ["testing", "test"];

    const env = development.includes(this.envVar)
      ? "development"
      : production.includes(this.envVar)
      ? "production"
      : testing.includes(this.envVar)
      ? "test"
      : null;

    const envObject: Record<string, string> = {};

    const rootPath = [process.cwd().split(sep)[0], ""].join(sep);
    let path = process.cwd();
    const valueEnvVarContainVariables = new Set<string>();
    while (path.split(sep).length > 1 && (process.platform === "win32" ? path !== rootPath : path !== sep)) {
      await mapEnvFile(envObject, path, valueEnvVarContainVariables, NODE_ENV || env);
      path = dirname(path);
    }

    if (valueEnvVarContainVariables.size > 0) {
      replaceEnvVars(envObject, valueEnvVarContainVariables);
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
