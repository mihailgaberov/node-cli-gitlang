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

// prompt the user input
getInput(validateInput);

function getInput(callback) {
  var questions = [
    {
      name: 'username',
      type: 'input',
      message: 'Enter a valid account name of a Github user:'
    }
  ];

  inquirer.prompt(questions).then(callback);
}

function validateInput(input) {
  var name = input.username;
  if (typeof name === 'string' && name.length > 2 && name.match(/[^a-zA-Z0-9]/g) === null) {
    console.log('success!');
  } else {
    console.log('Failed!');
  }
}
// validate the user input - should be a valid user name

// make a GET request to Github API and get all user's repos

// Iterate thgrough the repos and get the language property

// Implement some logic to verify which is the most used language and return it as output to the user's console