/** Should be optimized */
export const replaceEnvVars = (envObject: Record<string, string>, valueEnvVarContainVariables: Set<string>) => {
  valueEnvVarContainVariables.forEach((key) => {
    Object.entries(envObject).forEach(([envKey, envValue]) => {
      if (envObject[key].includes(envKey)) {
        envObject[key] = envObject[key].replace(new RegExp(`\\$${envKey}|\\$\{${envKey}}`, "g"), envValue);
      }
    });

    return envObject;
  });
};
