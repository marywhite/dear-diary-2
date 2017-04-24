#!/usr/bin/env node
'use strict'
const meow = require('meow')
const chalk = require('chalk')
const {commands} = require('./')

const cli = meow(`
	Usage
    $ dear-diary write

	Examples
    $ dear-diary write
    $ 💖   ${chalk.yellow('what\'s on your mind angel?')}
`, {
})

const [input, ...etc] = cli.input

try {
  commands[input](etc)
} catch (err) {
  console.log('i don\'t have anything for that, dear')
  process.exit(1)
}

