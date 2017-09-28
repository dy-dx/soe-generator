/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const rollup = require('rollup');
const notifier = require('node-notifier');
const chalk = require('chalk');
const config = require('./rollup.config.dev');

chalk.enabled = !!process.stderr.isTTY;
const stderr = console.error.bind(console); // eslint-disable-line no-console

function notify(_title, _message) {
  notifier.notify({
    title: _title || 'Rollup',
    message: _message,
    sound: true, // Only Notification Center or Windows Toasters
    group: 'Rollup', // terminal-notifier
  });
}

// https://github.com/rollup/rollup/blob/master/bin/src/logging.js
function handleError(err) {
  let description = err.message || err;
  description = err.name ? `${err.name}: ${description}` : description;
  notify(err.plugin, description);
  const message = err.plugin ? `(${err.plugin} plugin) ${description}` : description;

  stderr(chalk.bold.red(`[!] ${chalk.bold(message)}`));

  if (err.url) {
    stderr(chalk.cyan(err.url));
  }

  if (err.frame) {
    stderr(chalk.dim(err.frame));
  } else if (err.stack) {
    stderr(chalk.dim(err.stack));
  }

  stderr('');
}

const watcher = rollup.watch(config);

watcher.on('event', (event) => {
  switch (event.code) {
    case 'START': // the watcher is (re)starting
      // stderr(chalk.underline(`rollup v${rollup.VERSION}`));
      break;
    case 'BUNDLE_START': // building an individual bundle
      stderr(chalk.cyan('bundling...'));
      break;
    case 'BUNDLE_END': // finished building a bundle
      stderr(chalk.green(`created ${chalk.bold(event.output)} in ${chalk.bold(event.duration)}ms`));
      break;
    case 'END': // finished building all bundles
      stderr(`\n[${new Date().toLocaleTimeString()}] waiting for changes...`);
      break;
    case 'ERROR': // encountered an error while bundling
      handleError(event.error);
      break;
    case 'FATAL': // encountered an unrecoverable error
      handleError(event.error);
      process.exit(1);
      break;
    default:
      break;
  }
});
