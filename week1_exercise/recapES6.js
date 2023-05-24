class Employee {
  constructor(name, salary, hireDate) {
    this.name = name;
    this.salary = salary;
    this.hireDate = hireDate;
  }
  toString() {
    return `Employee: ${this.name}, ` + `salary: ${this.salary}, ` + `hire date: ${this.hireDate}`;
  }
}


class Manager extends Employee {

  constructor(name, salary, hireDate, jobTitle, descriptionOfJob, employeesManaged) {
    super(name, salary, hireDate)
    this.jobTitle = jobTitle;
    this.descriptionOfJob = descriptionOfJob;
    this.employeesManaged = employeesManaged;
  }
  toString() {
    return super.toString() + `\nJob Title: ${this.jobTitle}, ` + `Job Description: ${this.descriptionOfJob}, ` + `Number of Employees Managed: ${this.employeesManaged}`;
  }
}


class Department extends Manager{
  constructor(name, salary, hireDate, jobTitle, descriptionOfJob, employeesManaged, departmentName, employees) {
    super(name, salary, hireDate, jobTitle, descriptionOfJob, employeesManaged);
    this.departmentName = departmentName;
    this.employees = employees;
  }
  toString() {
    return super.toString() + `\nDepartment Name: ${this.departmentName}, ` + `Employees: ${this.employees}`;
  }
}


class Contract {
  constructor(name, salary, hireDate, jobTitle, descriptionOfJob, employeesManaged, departmentName, employees){
  }
  // Employee.call(this, name, salary, hireDate);
  // Manager.call(this, jobTitle, descriptionOfJob, employees.length);
  // Department.call(this, departmentName, employees);
}


const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const employee1 = new Employee(`Marc Hamilton`, 35000, `2023-01-01`);
const employee2 = new Employee(`Steve Aoka`, 30000, `2010-03-03`)
const manager = new Manager(`Marc Hamilton`, 35000, `2023-01-01`, `Manager`, `Manager of the Sales Department`, [`Steve`, `Marc`]);
const department = new Department(`Marc Hamilton`, 35000, `2023-01-01`, `Manager`, `Manager of the Sales Department`, [`Steve`, `Marc`], `Sales`, 2)

// Exercise 3.b
//console.log(department.toString());


// Exercise 3.c
// for (var value in employee1) {
//   console.log(`employee1.${value} = ${employee1[value]}`);
// }
//
// for (var number of numbers) {
//   console.log(number);
// }


// Exercise 3.d
const calculator = ((...numbers) => {
  result = 0;
  for (let number of numbers) {
    result += number;
  }
  return result});

// console.log(calculator(1, 3, 6));


// Exercise 3.e


const {jobTitle, descriptionOfJob} = manager;
console.log(`Job Title: ` + jobTitle + ", Job Description: " + descriptionOfJob);

