import { resolve } from "node:path";
import { existsSync, promises } from "node:fs";
import { parse } from "dotenv";

export const mapEnvFile = async (projectCwd: string, NODE_ENV = "production") => {
  const envObject: Record<string, string> = {};

  envObject.NODE_ENV = NODE_ENV || "development";

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

  if (isEnvFileExists) {
    Object.assign(envObject, parse(await promises.readFile(envFile, "utf8")));
  }

  if (envObject.NODE_ENV === "production") {
    if (isProdEnvFileExists) {
      Object.assign(envObject, parse(await promises.readFile(prodEnvFile, "utf8")));
    }
    if (isProductionEnvFileExists) {
      Object.assign(envObject, parse(await promises.readFile(productionEnvFile, "utf8")));
    }
  }

  if (envObject.NODE_ENV === "development") {
    if (isDevEnvFileExists) {
      Object.assign(envObject, parse(await promises.readFile(devEnvFile, "utf8")));
    }
    if (isDevelopmentEnvFileExists) {
      Object.assign(envObject, parse(await promises.readFile(developmentEnvFile, "utf8")));
    }
  }

  if (envObject.NODE_ENV === "test") {
    if (isTestEnvFileExists) {
      Object.assign(envObject, parse(await promises.readFile(testEnvFile, "utf8")));
    }
    if (isTestingEnvFileExists) {
      Object.assign(envObject, parse(await promises.readFile(testingEnvFile, "utf8")));
    }
  }

  return envObject;
};
