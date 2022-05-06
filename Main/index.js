const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'department_db'
    },
    console.log("You are connected to the department_db database")
);

menu();

function menu() {
    inquirer.prompt([{
        type: 'list',
        name: 'addList',
        message: 'What would you like to do?',
        choices: ['View All Employees','View All Roles','View All Departments', 'Add Employee',  'Add Role',  'Add Department','Update Employee Role',  'Quit']
    }, ]).then(ans => {
        console.log(ans);
        switch (ans.addList) {
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
    db.query('SELECT * FROM employee', function (err, results) {
        console.log(results);
        inquirer.prompt([{
            type: 'list',
            name: 'menuReturn',
            message: 'Select return to go back to the main menu',
            choices: ['return']
        }]).then(function () {
            menu()
        })
    })
};


const addEmployee = () => {
    db.query('SELECT title, id FROM role', function (err, results) {
        const roles = results.map(function (role) {
            return {
                name: role.title,
                value: role.id
            }
        })
        db.query('SELECT first_name, last_name, id FROM employee', function (err, results2) {
            const employees = results2.map(function (employee) {
                return {
                    name: employee.first_name + " " + employee.last_name,
                    value: employee.id
                }
            })
            inquirer.prompt([{
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
                    type: 'list',
                    name: 'employeeRole',
                    message: 'Enter Employee Role:',
                    choices: roles
                    // wanted to use the list of created roles to populate roles here.
                },
                {
                    type: 'list',
                    name: 'employeeManager',
                    message: 'Enter Employee Manager:',
                    choices: employees
                }
            ]).then(res => {
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id ) VALUES (?,?,?,?)`, [res.employeeFirstName, res.employeeLastName, res.employeeRole, res.employeeManager], function (err, results) {
                    console.log(err)
                    menu()
                })
            })
        })
    })
};
const updateEmployeeRole = () => {
    db.query('SELECT title, id FROM role', function (err, results) {
        const roles = results.map(function (role) {
            return {
                name: role.title,
                value: role.id
            }
        })
        db.query('SELECT first_name, last_name, id FROM employee', function (err, results2) {
            const employees = results2.map(function (employee) {
                return {
                    name: employee.first_name + " " + employee.last_name,
                    value: employee.id
                }
            })

            inquirer.prompt([{
                    type: 'list',
                    name: 'updateEmployee',
                    message: 'Which Employee would you like to update?',
                    choices: employees
                },
                {
                    type: 'list',
                    name: 'updateRole',
                    message: 'What is the new Role?',
                    choices: roles
                },
            ]).then(res => {
                db.query('UPDATE employee SET role_id = ? WHERE employee.id = ?', [res.updateRole, res.updateEmployee], function (err, results2) {
                    menu()
                })
            })
        })
    })
};
const viewAllRoles = () => {
    db.query('SELECT * FROM role', function (err, results) {
        console.log(results);
        inquirer.prompt([{
            type: 'list',
            name: 'menuReturn',
            message: 'Select return to go back to the main menu',
            choices: ['return']
        }]).then(function () {
            menu()
        })
    })
};
const addRole = () => {
    db.query('SELECT department_name, id FROM department', function (err, results) {
        const department = results.map(function (department) {
            return {
                name: department.department_name,
                value: department.id
            }
        })
        inquirer.prompt([{
                type: 'input',
                name: 'roleName',
                message: 'what is the Role Title?',
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'what is the Role salary?',
            },
            {
                type: 'list',
                name: 'roleDepartment',
                message: 'what is the Role department?',
                choices: department
            }
        ]).then(res => {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, [res.roleName, res.roleSalary, res.roleDepartment], function (res) {
                menu()
            })
        })
    })
};
const viewAllDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
        inquirer.prompt([{
            type: 'list',
            name: 'menuReturn',
            message: 'Select return to go back to the main menu',
            choices: ['return']
        }]).then(function () {
            menu()
        })
    })
};
const addDepartment = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'departmentName',
        message: 'what is the Department name?'
    }]).then(res => {
        db.query(`INSERT INTO department (department_name) VALUES (?)`, [res.departmentName], function(res){menu()})
        
    })
};
const quit = () => {
    process.exit()
};