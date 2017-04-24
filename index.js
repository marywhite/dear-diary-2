'use strict'
const prompt = require('prompt')
const Promise = require('bluebird')
const chalk = require('chalk')
const Conf = require('conf')
const arrayShuffle = require('array-shuffle')

const _get = Promise.promisify(prompt.get)
const config = new Conf()

const petNames = [
  'angel',
  'love',
  'dear'
]
const _name = config.get('profile.name')

if (_name) {
  petNames.push(_name)
}

const usr = () => arrayShuffle(petNames).pop()

function write() {
  prompt.message = '💖'
  const properties = {
    data: {
      description: chalk.yellow(`what's on your mind ${usr()}`)
    }
  }
  prompt.start()

  return _get({properties})
    .then(result => {
      config.set(`diary.${Date.now()}`, result.data)
      console.log(chalk.magenta(`thanks for sharing ${usr()}`))
      return result.data
    })
    .catch(() => {
      console.log(chalk.red(`hm, i didn't quite get that ${usr()}`))
    })
}

function read(etc) {
  const diary = config.get('diary')
  const criteria = etc.map(query => {
    let re = new RegExp(query, 'i')
    const d = new Date(Date.parse(query))

    if (!isNaN(d)) {
      re = new RegExp(d.toDateString(), 'i')
    }

    return re
  })

  const matches = Object.keys(diary)
    .filter(timestamp => {
      const writing = diary[timestamp]
      const d = new Date(Number(timestamp)).toDateString()

      let matched
      if (criteria.length === 0 || criteria.every(c => c.test(`${writing} ${d}`))) {
        console.log(chalk.bold(`${d} | ${writing}`))
        matched = true
      }

      return matched
    })

  if (matches.length === 0) {
    console.log(chalk.dim(`hmm couldn't find anything like that ${usr()} xo`))
  }
}

function myname(etc) {
  const [name] = etc

  if (name) {
    config.set('profile.name', name)
    console.log(chalk.magenta(`nice to meet you ${name}`))
    return
  }

  if (_name) {
    console.log(chalk.green(`hi how are you ${_name}`))
  } else {
    console.log(chalk.red(`hm, i didn't quite get that ${usr()}`))
  }
}

exports.commands = {
  write,
  read,
  myname
}
