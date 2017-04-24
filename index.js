'use strict'
const prompt = require('prompt')
const Promise = require('bluebird')
const chalk = require('chalk')

const _get = Promise.promisify(prompt.get)

function write() {
  prompt.message = '💖'
  const properties = {
    data: {
      description: chalk.yellow('what\'s on your mind dear')
    }
  }
  prompt.start()

  return _get({properties})
    .then(result => {
      console.log(chalk.magenta('thanks for sharing love'))
      return result.data
    })
    .catch(() => {
      console.log(chalk.red('hm, i didn\'t quite get that'))
    })
}

exports.commands = {
  write
}
