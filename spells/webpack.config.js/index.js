const docopt = require('docopt').docopt;
const colors = require('colors/safe');

let USAGE = `
Webpack options

Usage:
  webpack [--prod | --dev]
  webpack -h | --help | --version

Arguments:
  -h --help             Show this message.
  --version             Show the version of this tool.
  --prod                Force a production compilation.
  --dev                 Force a dev environment.
`;

let options = docopt(USAGE, {version: "1.0.0"});
let mode = process.env.NODE_ENV;

if (options['--prod']) {
  console.log(colors.bold("Forcing production mode"));
  mode = 'prod';
} else if (options['--dev']) {
  console.log(colors.bold.yellow("Forcing development mode"));
  mode = 'dev';
}

switch (mode) {
    case 'prod':
    case 'production':
        module.exports = require('./prod.js');
        break;
    case 'dev':
    case 'development':
    default:
        module.exports = require('./dev.js');
}
