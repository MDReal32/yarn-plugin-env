import { Project } from "@yarnpkg/core";
import { ProcessEnvironment } from "../types/processEnvironment";
import { mapEnvFile } from "../helpers/mapEnvFile";

export const setupScriptEnvironment = async (project: Project, env: ProcessEnvironment) => {
  const envObject = await mapEnvFile(env.PROJECT_CWD, env.NODE_ENV);
  Object.assign(env, envObject);
};
