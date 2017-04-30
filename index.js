/**
 * Created by Mihail on 4/30/2017.
 */
'use strict';

var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var CLI = require('clui');
var inquirer = require('inquirer');
var Spinner = CLI.Spinner;

clear();
console.log(chalk.yellow(figlet.textSync('Git Lang', {horizontalLayout: 'full'})));

getInput(validateInput);

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

function validateInput(input) {
  console.log(input)
}

// make a GET request to Github API and get all user's repos

// Iterate thgrough the repos and get the language property

// Implement some logic to verify which is the most used language and return it as output to the user's console