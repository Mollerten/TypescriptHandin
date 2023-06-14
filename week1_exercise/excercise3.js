class Employee {
    constructor(name, salary, hireDate) {
        this.name = name;
        this.salary = salary;
        this.hireDate = hireDate;
    }

    toString() {
        return `Employee: ${this.name}, Salary: ${this.salary}, Hire Date: ${this.hireDate}`;
    }
}

class Manager extends Employee {
    constructor(name, salary, hireDate, jobTitle, descriptionOfJob, employeesManaged) {
        super(name, salary, hireDate);
        this.jobTitle = jobTitle;
        this.descriptionOfJob = descriptionOfJob;
        this.employeesManaged = employeesManaged;
    }

    toString() {
        return `${super.toString()}\nJob Title: ${this.jobTitle}, Description of Job: ${this.descriptionOfJob}, Employees Managed: ${this.employeesManaged}`;
    }
}

class Department extends Manager {
    constructor(name, salary, hireDate, jobTitle, descriptionOfJob, employeesManaged, departmentName, employees) {
        super(name, salary, hireDate, jobTitle, descriptionOfJob, employeesManaged);
        this.departmentName = departmentName;
        this.employees = employees;
    }

    toString() {
        const employeesString = this.employees.join(",");
        return `${super.toString()}\nDepartment Name: ${this.departmentName}, Employees: ${employeesString}`;
    }
}

const employee = new Employee("Steve Taylor", 50000, "01/01/2015");
const manager = new Manager("John Doe", 60000, "01/01/2010", "Manager", "Manager of the Sales Department", 2);
const department = new Department("Sales Department", 2, "01/01/2010", "Manager", "Manager of the Sales Department", 2, "Sales", ["Steve", "Marc"]);

console.log(employee.toString());
console.log("");
console.log(manager.toString());
console.log("");
console.log(department.toString());
console.log("");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


console.log("Numbers Array (for-of):");
for (const number of numbers) {
    console.log(number);
}

console.log("");


console.log("Employee Object (for-in):");
for (const property in employee) {
    console.log(`${property}: ${employee[property]}`);
}

const calculator1 = function (num1, num2) {
    return num1 + num2;
}

const calculator2 = (num1, num2) => {
    return num1 + num2;
};

const calculator3 = (num1, num2) => num1 + num2;

const calculator4 = (num1, num2 = 2) => num1 + num2;

const calculator5 = (...numbers) => {
    return numbers.reduce((sum, number) => sum + number, 0);
};

const { jobTitle, descriptionOfJob } = manager;

console.log("");
console.log('Use destructuring to get the jobTitle and descriptionOfJob properties from the manager object')
console.log(`Job Title: ${jobTitle}`);
console.log(`Description of Job: ${descriptionOfJob}`);

