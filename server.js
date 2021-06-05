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
            console.log("All Employees");
            allEmployees();
        }
        else if (data.choices === 'Add A Department') {
            console.log("Add Department")
            addDepartment();
        }
        else if (data.choices === 'Add A Role') {
            console.log("Add Role");
            addRole();
        }
        else if (data.choices === 'Add An Employee') {
            console.log("Add Employee")
            addEmployee();
        }
        else if (data.choices === 'Update Employee Role') {
            console.log("Update Employee");
            update();
        }
        else if (data.choices === 'Exit') {
            end();
        }
    })
}

async function end() {
    console.log("GOODBYE!! :)");
    process.exit(1)
};

// View all functions
async function allDepartments() {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('========================================================================');
        console.table(rows);
        console.log('========================================================================');
        mainMenu();
    })
};
async function allRoles() {
    const sql = `SELECT roles.title, roles.id, departments.depname AS department, roles.salary FROM roles LEFT JOIN departments ON roles.department_id = departments.id`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('===========================================================================');
        console.table(rows);
        console.log('===========================================================================');
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
        console.log('==========================================================================');
        console.table(rows);
        console.log('==========================================================================');
        mainMenu();
    })
};

// Add functions
async function addDepartment() {
    inquirer
    .prompt({
        type: 'input',
        name: 'depname',
        message: 'What is the name of the new department that you would like to add?'
    }).then(answer => {
        return addDepTable(answer);
    })
};
async function addDepTable (answer) {
    const sql = `INSERT INTO departments (depname) VALUES (?)`;
    const params = [answer.depname];

    db.query(sql, params, (err, result) => {
        if (err) throw err;
        console.log(params);
        console.log("===============================");
        console.log("You have added a new department");
        console.log("===============================");
        mainMenu();
    });
};
async function addRole () {
    const depInfo = await db.promise().query(`SELECT * FROM departments`);
    let deptList = depInfo[0].map((names) => {
        return {
            name: names.depname,
            value: names.id
        }
    })
    const roleInf = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of the new role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary for this role?"
        },
        {
            type: "list",
            name: "department",
            message: "What department is this role in?",
            choices: deptList
        }
    ]);
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
    const params = [roleInf.title, roleInf.salary, roleInf.department];
    await db.promise().query(sql, params);
    
    console.log("============================================");
    console.log(`The role of ${roleInf.title} has been added.`);
    console.log("============================================");
    mainMenu();
};
async function addEmployee() {
    const manInfo = await db.promise().query('SELECT * FROM employees WHERE manager_id IS NULL;');
    let manList = manInfo[0].map((names) => {
        return {
            name: names.first_name.concat(" ", names.last_name),
            value: names.id
        }
    });
    const rolesInfo = await db.promise().query('SELECT * FROM roles;');
    let rolesList = rolesInfo[0].map((role) => {
        return {
            name: role.title,
            value: role.id
        }
    });

    const newEmp = await inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the new employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the new employee's last name?"
        },
        {
            type: "list",
            name: "role",
            message: "What is this employee's role?",
            choices: rolesList
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: manList
        }
    ]);

    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [newEmp.first_name, newEmp.last_name, newEmp.role, newEmp.manager];
    await db.promise().query(sql, params);

    console.log('=======================================================================');
    console.log(`${newEmp.first_name} ${newEmp.last_name} has been added as an employee.`);
    console.log('=======================================================================');
    mainMenu();
};

async function update() {
    const empInfo = await db.promise().query(`SELECT * FROM employees;`);
    let empList = empInfo[0].map((name) => {
        return {
            name: name.first_name.concat(" ", name.last_name),
            value: name.id
        }
    })
    const rolesInfo = await db.promise().query(`SELECT * FROM roles;`);
    let rolesList = rolesInfo[0].map((role) => {
        return {
            name: role.title,
            value: role.id
        }
    });

    const {empId, roleId} = await inquirer.prompt([
        {
            type: "list",
            name: "empId",
            message: "What is the name of the employee you would like to update?",
            choices: empList
        },
        {
            type: "list",
            name: "roleId",
            message: "What would you like their new role to be?",
            choices: rolesList
        }
    ]);

    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
    const params = [roleId, empId];
    await db.promise().query(sql, params);

    console.log("========================================");
    console.log("The employee has had their role updated.");
    console.log("========================================");
    mainMenu();
}

function start() {
    console.log("============================");
    console.log("      WELCOME MANAGER,      ");
    console.log("           TO THE           ");
    console.log("      EMPLOYEE TRACKER!      ");
    console.log("============================");
    mainMenu();
}

start();
