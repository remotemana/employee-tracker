SELECT department.department_name
FROM department
LEFT JOIN employee on employee.role_id = department.department_name;