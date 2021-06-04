const inquirer = require('inquirer');


const mainMenu = function(){
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'Welcome! What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update Employee Role']
        }
    ])
    .then(data => {
        if (data.choices === 'View All Departments') {
            console.log("Departments")
        }
        else if (data.choices === 'View All Roles') {
            console.log("All Roles")
        }
        else if (data.choices === 'View All Employees') {
            console.log("All Employees")
        }
        else if (data.choices === 'Add A Department') {
            console.log("Add Department")
        }
        else if (data.choices === 'Add A Role') {
            console.log("Add Role")
        }
        else if (data.choices === 'Add An Employee') {
            console.log("Add Employee")
        }
        else if (data.choices === 'Update Employee Role') {
            console.log("Update Employee")
        }
    })
}

mainMenu();