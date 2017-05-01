/**
 * Created by Mihail on 4/30/2017.
 */
'use strict'

var chalk = require('chalk')
var clear = require('clear')
var figlet = require('figlet')
var CLI = require('clui')
var inquirer = require('inquirer')
var util = require('util')
var Spinner = CLI.Spinner
var https = require('https')
var request = require('request')

var URL_GIT_REPOS = 'https://api.github.com/users/%s/repos'

var arrLangs = []
var user =''

clear()
console.log(chalk.yellow(figlet.textSync('Git Lang', {horizontalLayout: 'full'})))

getInput(getRepos)

function getInput(callback) {
  var questions = [
    {
      name: 'username',
      type: 'input',
      message: 'Enter a valid account name of a Github user:',
      validate: function (value) {
        if (typeof value === 'string' && value.length > 2 && value.match(/[^a-zA-Z0-9]/g) === null) {
          return true
        } else {
          return 'Please enter a valid account name of a Github user.'
        }
      }
    }
  ]

  inquirer.prompt(questions).then(callback)
}

function getRepos(input) {
  user = input.username
  var urlToFetch = util.format(URL_GIT_REPOS, user)
  var options = {
    url: urlToFetch,
    headers: {
      'User-Agent': 'Gitlang-App'
    }
  }

  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      outputPreferredLang(getMostFrequentElement(getLanguages(JSON.parse(body))))
    } else {
      console.log('Request failed. Try again.')
    }
  })
}

function getLanguages(arrRepos) {
  if (arrRepos.length === 0) {
    return []
  }

  arrRepos.forEach(function (repo) {
    arrLangs.push(repo.language)
  })
  return arrLangs
}

function getMostFrequentElement(arrLangs) {
  if (arrLangs.length === 0) {
    return null
  }

  var modeMap = {}
  var maxEl = arrLangs[0]
  var maxCount = 1

  for (var i = 0; i < arrLangs.length; i++) {
    var el = arrLangs[i]

    if (modeMap[el] === null) {
      modeMap[el] = 1
    } else {
      modeMap[el]++
    }

    if (modeMap[el] > maxCount) {
      maxEl = el
      maxCount = modeMap[el]
    }
  }
  return maxEl;
}

function outputPreferredLang(lang) {
  if (lang === null) {
    console.log(chalk.red('No such user. Please enter another username.'))
    return null
  }
  console.log(chalk.blue('The preferred language of ') + chalk.cyan(user) + chalk.blue(' is ') + chalk.cyan(lang))
}