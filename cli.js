#!/usr/bin/env node
'use strict'
const meow = require('meow')
const chalk = require('chalk')
const {commands} = require('./')

const cli = meow(`
	Usage
    $ dear-diary write
    $ dear-diary read
	
  Examples
    $ dear-diary write
    $ 💖   ${chalk.yellow('what\'s on your mind angel?')}

    $ dear-diary read
    $ ${chalk.bold('Tue Feb 14 2017 hating love today')}
    $ ${chalk.bold('Mon Apr 24 2017 what is love even')}
    $ ${chalk.bold('Mon Apr 24 2017 thinking of you today')}

    $ dear-diary read 04/24/2017
    $ ${chalk.bold('Mon Apr 24 2017 thinking of you today')}

    $ dear-diary read love
    $ ${chalk.bold('Tue Feb 14 2017 hating love today')}
    $ ${chalk.bold('Mon Apr 24 2017 what is love even')}
`, {
})

const [input, ...etc] = cli.input

try {
  commands[input](etc)
} catch (err) {
  console.log(chalk.dim('i don\'t have anything for that, dear'))
  process.exit(1)
}

