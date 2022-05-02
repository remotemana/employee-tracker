const inquirer = require('inquirer');

function menu() {
inquirer.prompt([
    {
        type: 'list',
        name: 'addList',
        message: 'What would you like to do?',
        choices: ['View All Employees','Add Employee','Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'quit']
    },
])
}

function addEmployee() {}
funtion 