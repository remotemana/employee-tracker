USE department_db;

INSERT INTO department (department_name)
VALUES ("Front End"),
       ("Programming"),
       ("Developer");

INSERT INTO role (title, salary)
VALUES ("Developer", "100");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lucas", "Roman", "1", "3"),
       ("Ron", "Swanson", "1", "1"),
       ("Ricky", "Bobby", "1", "2");