# Yarn env plugin

This plugin adds environment variables to your Yarn run scripts.

## Table of contents

- [Why?](#why)
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Contributing](#contributing)
- [Show your support](#show-your-support)
- [License](#license)
- [Author](#author)

## Why?

When you run your scripts with `yarn run` command, Yarn doesn't load environment variables from `.env` file. This is creating some discomfort when you need use `dotenv` externally when yarn can do it. With this plugin you not need use it anymore. Just add your environment variables to `.env` file and run your scripts with `yarn run <script>` or `yarn <script>` commands. If you want to use environment variables in your code, you can use `process.env` object. If you want to watch environment variables which will be used in your script, define `NODE_ENV` and call `yarn env` command or just call `yarn env --env <NODE_ENV>` command for specific situations. It defines `NODE_ENV` automatically if not defined yet.

## Installation

```bash
yarn plugin import https://github.com/MDReal32/yarn-plugin-env/releases/download/refs/heads/master/plugin-env.js
```

## Usage

On each running of scripts plugin automatically loads .env file and one of below files depending on NODE_ENV value:

- For production - `.env.production` and/or `.env.prod`
- For development - `.env.development` and/or `.env.dev`
- For test - `.env.test` and/or `.env.testing`

## Options

Different type usage of `yarn env` command:

- `--env` - Set NODE_ENV to given value. Default value is `production`.
- `--text` - Print environment variables in text format. Default value.
- `--json` - Print environment variables in JSON format.
- `--object` - Works only with `--json` option. Print environment variables like javascript object.

## Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page]().

## Show your support

Give a ⭐️ if this project helped you!  
Open a pull request with improvements.

## License

This project is [MIT](LICENSE) licensed.

## Author

👤 **MDReal32**

- Github: [@MDReal32](https://github.com/MDReal32)
- LinkedIn: [@veysaliyev](https://linkedin.com/in/veysaliyev)

Open to work. Contact me if you need help with your project.
