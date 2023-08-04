import { resolve } from "node:path";
import { existsSync, promises } from "node:fs";
import { parse } from "dotenv";

import { ENV_VAR_RE } from "../constants/regex";

const parseAndMapEnvFile = (envObject: Record<string, string>, valueEnvVarContainVariables: Set<string>) => {
  return async (envFile: string) => {
    const envFileContent = await promises.readFile(envFile, "utf8");
    const envData = parse(envFileContent);
    Object.entries(envData).forEach(([key, value]) => {
      if (value.match(ENV_VAR_RE)) {
        valueEnvVarContainVariables.add(key);
      }
    });
    Object.assign(envObject, envData);
  };
};

export const mapEnvFile = async (
  envObject: Record<string, string>,
  projectCwd: string,
  valueEnvVarContainVariables: Set<string>,
  NODE_ENV?: string
) => {
  const envFile = resolve(projectCwd, ".env");
  const isEnvFileExists = existsSync(envFile);

  const prodEnvFile = resolve(projectCwd, ".env.prod");
  const productionEnvFile = resolve(projectCwd, ".env.production");
  const isProdEnvFileExists = existsSync(prodEnvFile);
  const isProductionEnvFileExists = existsSync(productionEnvFile);

  const devEnvFile = resolve(projectCwd, ".env.dev");
  const developmentEnvFile = resolve(projectCwd, ".env.development");
  const isDevEnvFileExists = existsSync(devEnvFile);
  const isDevelopmentEnvFileExists = existsSync(developmentEnvFile);

  const testEnvFile = resolve(projectCwd, ".env.test");
  const testingEnvFile = resolve(projectCwd, ".env.testing");
  const isTestEnvFileExists = existsSync(testEnvFile);
  const isTestingEnvFileExists = existsSync(testingEnvFile);

  const map = parseAndMapEnvFile(envObject, valueEnvVarContainVariables);

  if (isEnvFileExists) {
    await map(envFile);
  }

  envObject.NODE_ENV = envObject.NODE_ENV || NODE_ENV || "production";

  if (envObject.NODE_ENV === "production") {
    isProdEnvFileExists && (await map(prodEnvFile));
    isProductionEnvFileExists && (await map(productionEnvFile));
  }

  if (envObject.NODE_ENV === "development") {
    isDevEnvFileExists && (await map(devEnvFile));
    isDevelopmentEnvFileExists && (await map(developmentEnvFile));
  }

  if (envObject.NODE_ENV === "test") {
    isTestEnvFileExists && (await map(testEnvFile));
    isTestingEnvFileExists && (await map(testingEnvFile));
  }

  return envObject;
};
