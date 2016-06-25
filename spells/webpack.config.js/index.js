const docopt = require('docopt').docopt;
const colors = require('colors/safe');
const noop = require('./util').colors_noop;
const resolve_env = require('./util').resolve_env;
const current_env = require('./util').current_env;


let USAGE = (colors) => `
${colors.bold.green('Webpack custom options')}

Those options allows to override the default values fetch using
the environment variable 'NODE_ENV'.

Your current value is:

    '${current_env()}'

Thus the environment will be:

    '${resolve_env()}'

The following options allows you to override this behavior.

${colors.bold.green('Usage:')}
  webpack [--prod | --dev]
  webpack --opt-help | --version

${colors.bold.green('Arguments:')}
  --opt-help            Show this message.
  --version             Show the version of this tool.
  --prod                Force a production compilation.
  --dev                 Force a dev environment.
`;

let options = docopt(USAGE(noop), {version: "1.0.0"});
let mode = process.env.NODE_ENV;

if (options['--opt-help']) {
    console.log(USAGE(colors));
    process.exit();
}

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
