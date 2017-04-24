'use strict'
const prompt = require('prompt')
const Promise = require('bluebird')
const chalk = require('chalk')
const Conf = require('conf')

const _get = Promise.promisify(prompt.get)
const config = new Conf()

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
      config.set(`diary.${Date.now()}`, result.data)
      console.log(chalk.magenta('thanks for sharing love'))
      return result.data
    })
    .catch(() => {
      console.log(chalk.red('hm, i didn\'t quite get that'))
    })
}

function read() {
  const diary = config.get('diary')
  const entries = Object.keys(diary)
    .map(timestamp => {
      const writing = diary[timestamp]
      const d = new Date(Number(timestamp)).toDateString()
      console.log(chalk.bold(`${d} | ${writing}`))
      return diary[timestamp]
    })

  if (entries.length === 0) {
    console.log(chalk.bold('hmm couldn\'t find anything like that xo'))
  }
}

exports.commands = {
  write,
  read
}
