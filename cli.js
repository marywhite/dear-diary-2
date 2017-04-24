#!/usr/bin/env node
'use strict'
const meow = require('meow')

const cli = meow(`
	Usage
    $ dear-diary write
	Examples
    $ dear-diary write
`, {
})

const [input] = cli.input

console.log(input)
