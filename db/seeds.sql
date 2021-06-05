
INSERT INTO departments (depname)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Customer Support');


INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales Manager', 130000, 1),
    ('Sales Lead', 85000, 1),
    ('Sales Rep', 75000, 1),
    ('Chief Product Officer', 150000, 2),
    ('Product Manager', 135000, 2),
    ('Lead Developer', 120000, 2),
    ('Architect', 120000, 2),
    ('Senior Developer', 100000, 2),
    ('Junior Developer', 80000, 2),
    ('Chief Financial Officer', 150000, 3),
    ('Management Accountant', 1300000, 3),
    ('Financial Accountant', 120000, 3),
    ('Internal Auditor', 100000, 3),
    ('Credit Controller', 100000, 3),
    ('Accounts Payable Clerk', 90000, 3),
    ('Account Clerk', 80000, 3),
    ('Chief Legal Officer', 150000, 4),
    ('VP of Legal Affairs', 140000, 4),
    ('Legal Director', 130000, 4),
    ('Legal Manager', 100000, 4),
    ('Legal Assistant', 80000, 4),
    ('Legal Writer', 75000, 4),
    ('Junior Legal Counsel', 60000, 4),
    ('Chief Relations Officer', 150000, 5),
    ('CX Director', 130000, 5),
    ('CX Manager', 100000, 5),
    ('CX Lead', 65000, 5),
    ('CX Senior', 48000, 5),
    ('CX Representative', 37000, 5);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES
    ('Donald', 'James', 1, null),
    ('Frank', 'Williams', 2, 1),
    ('Fannie', 'May', 3, 1),
    ('Luke', 'Skywalker', 4, null),
    ('Jason', 'Due', 5, 4),
    ('Michael', 'Jordan', 6, 4),
    ('Donnovan', 'Mitchel', 7, 4),
    ('Sam', 'Johnson', 8, 4),
    ('Charles', 'Barkly', 9, 4),
    ('Leia', 'Organa', 10, null),
    ('Han', 'Solo', 11, 10),
    ('David', 'McDonald', 12, 10),
    ('Kendall', 'McGrath', 13, 10),
    ('Jessica', 'James', 14, 10),
    ('Savanna', 'Lopez', 15, 10),
    ('Emily', 'Johnston', 16, 10),
    ('Lisa', 'Solo', 17, null),
    ('Ryan', 'Kartchner', 18, 17),
    ('Quin', 'Snyder', 19, 17),
    ('Marnie', 'Smith', 20, 17),
    ('Joseph', 'Michaelson', 21, 17),
    ('Maddy', 'Monson', 22, 17),
    ('Taylor', 'Franz', 23, 17),
    ('Israel', 'Thomas', 24, null),
    ('Rudy', 'Gobert', 25, 24),
    ('Bruce', 'Evans', 26, 24),
    ('Michael', 'Scott', 27, 24),
    ('Holly', 'Holland', 28, 24),
    ('Philip', 'Johnson', 29, 24);
   


