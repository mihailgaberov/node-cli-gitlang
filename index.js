/**
 * Created by Mihail on 4/30/2017.
 */
'use strict';

var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var CLI = require('clui');
var inquirer = require('inquirer');
var util = require('util');
var Spinner = CLI.Spinner;
var https = require('https');
var request = require('request');

var URL_GIT_REPOS = 'https://api.github.com/users/%s/repos';

clear();
console.log(chalk.yellow(figlet.textSync('Git Lang', {horizontalLayout: 'full'})));

getInput(getRepos);

function getInput(callback) {
  var questions = [
    {
      name: 'username',
      type: 'input',
      message: 'Enter a valid account name of a Github user:',
      validate: function (value) {
        if (typeof value === 'string' && value.length > 2 && value.match(/[^a-zA-Z0-9]/g) === null) {
          return true;
        } else {
          return 'Please enter a valid account name of a Github user.';
        }
      }
    }
  ];

  inquirer.prompt(questions).then(callback);
}

// Make a GET request to Github API and get all user's repos
function getRepos(input) {
  var urlToFetch = util.format(URL_GIT_REPOS, input.username);
  console.log('>>> url: ', urlToFetch);


  var options = {
    url: urlToFetch,
    headers: {
      'User-Agent': 'Gitlang-App'
    }
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var arrRepos = JSON.parse(body);
      console.log(arrRepos);
    }
  });
}


// Iterate thgrough the repos and get the language property


// Implement some logic to verify which is the most used language and return it as output to the user's console