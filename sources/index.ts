import { Hooks, Plugin } from "@yarnpkg/core";

import { setupScriptEnvironment } from "./hooks/setupScriptEnvironment";
import { Env } from "./commands/env";

const plugin: Plugin<Hooks> = {
  hooks: { setupScriptEnvironment },
  commands: [Env]
};

export default plugin;
