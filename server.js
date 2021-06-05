const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');


const mainMenu = function(){
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'Welcome! What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update Employee Role', 'Exit'], 
        }
    ])
    .then(data => {
        if (data.choices === 'View All Departments') {
            console.log("Departments");
            allDepartments();
        }
        else if (data.choices === 'View All Roles') {
            console.log("All Roles");
            allRoles();
        }
        else if (data.choices === 'View All Employees') {
            console.log("All Employees")
            allEmployees();
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
        else if (data.choices === 'Exit') {
            console.log("GOODBYE!! :)")
        }
    })
}

async function allDepartments() {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('============');
        console.table(rows);
        console.log('============');
        mainMenu();
    })
};

async function allRoles() {
    const sql = `SELECT roles.title, roles.id, departments.depname AS department, roles.salary FROM roles LEFT JOIN departments ON roles.department_id = departments.id`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('============');
        console.table(rows);
        console.log('============');
        mainMenu();
    })
};

async function allEmployees() {
    const sql = ` SELECT
                    employees.id,
                    employees.first_name,
                    employees.last_name,
                    roles.title AS title,
                    roles.salary,
                    departments.depname AS department,
                    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                 FROM employees
                 LEFT JOIN employees manager on manager.id = employees.manager_id
                 LEFT JOIN roles ON employees.role_id = roles.id
                 LEFT JOIN departments ON departments.id = roles.department_id
    `;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('============');
        console.table(rows);
        console.log('============');
        mainMenu();
    })
};






function start() {
    console.log("============================");
    console.log("      WELCOME MANAGER,      ");
    console.log("           TO THE           ");
    console.log("      EMPLOYEE TRACKER      ");
    console.log("============================");
    mainMenu();
}

start();
