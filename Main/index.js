
const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'department_db'
    },
    console.log("You are connected to the department_db database")
);

menu();
function menu() {
inquirer.prompt([
    {
        type: 'list',
        name: 'addList',
        message: 'What would you like to do?',
        choices: ['View All Employees','Add Employee','Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    },
]).then(ans =>{
    console.log(ans);
    switch(ans.addList) {
        case 'View All Employees':
            viewAllEmployees();
            break;

        case 'Add Employee':
            addEmployee();
            break;
        
        case 'Update Employee Role':
            updateEmployeeRole();
            break;
    
        case 'View All Roles':
            viewAllRoles();
            break;

        case 'Add Role':
            addRole();
            break;

        case 'View All Departments':
            viewAllDepartments();
            break;

        case 'Add Department':
            addDepartment();
            break;

        case 'Quit':
            quit();
            break;
        
        default:
            break;
    }
})
};



const viewAllEmployees = () => {
    db.query('SELECT * FROM employee', async function (err, results) {
        console.log(results);
    })
};
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeFirstName',
            message: 'Enter Employee First Name:',
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: 'Enter Employee Last Name:',
        },
        {
            type: 'input',
            name: 'employeeRole',
            message: 'Enter Employee Employee Role:',
        },
        {
            type: 'input',
            name: 'employeeManager',
            message: 'Enter Employee Employee Manager:',
        },
    ]).then(res => {
        db.query(`INSERT INTO employee (first_name, last_name) VALUES (?,?)`)
        menu()
    })
};
const updateEmployeeRole = () => {
    
};
const viewAllRoles = () => {
    
};
const addRole = () => {
    
};
const viewAllDepartments = () => {
    
};
const addDepartment = () => {
    
};
const quit = () => {
    
};
