import { dirname, sep } from "node:path";

import { Project } from "@yarnpkg/core";

import { ProcessEnvironment } from "../types/processEnvironment";
import { mapEnvFile } from "../helpers/mapEnvFile";
import { replaceEnvVars } from "../helpers/replaceEnvVars";

export const setupScriptEnvironment = async (project: Project, env: ProcessEnvironment) => {
  const valueEnvVarContainVariables = new Set<string>();
  const rootPath = [process.cwd().split(sep)[0], ""].join(sep);
  let path = process.cwd();
  const envObject = {};

  while (path.split(sep).length > 1 && (process.platform === "win32" ? path !== rootPath : path !== sep)) {
    await mapEnvFile(envObject, path, valueEnvVarContainVariables, env.NODE_ENV);
    path = dirname(path);
  }

  if (valueEnvVarContainVariables.size > 0) {
    replaceEnvVars(envObject, valueEnvVarContainVariables);
  }

  Object.assign(env, envObject);
};
