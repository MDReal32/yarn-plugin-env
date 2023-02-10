import { Command } from "clipanion";

export const usage = Command.Usage({
  description: "print environment variables",
  details: `
This command will print environment variables.

Environment variables are loaded from the following files:

 - .env

For NODE_ENV=production:  

 - .env.prod
 - .env.production

For NODE_ENV=development:  

 - .env.dev
 - .env.development

For NODE_ENV=test:  

 - .env.test
 - .env.testing
`.trimStart(),
  examples: [
    ["Print environment variables", "$0 env"],
    ["Print environment variables for NODE_ENV=development", "$0 env --env dev,development"],
    ["Print environment variables for NODE_ENV=production", "$0 env --env prod,production"],
    ["Print environment variables for NODE_ENV=test", "$0 env --env test,testing"],
    ["Print environment as json", "$0 env --json"],
    ["Print environment as json-object", "$0 env --json --object"],
    ["Print environment as bash string (default)", "$0 env --text"]
  ],
  category: "Environment"
});
