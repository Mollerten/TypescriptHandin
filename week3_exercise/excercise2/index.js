"use strict";
class Person {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}
const populator = () => {
    const persons = [];
    persons.push(new Person("John", 25, "Male"));
    persons.push(new Person("Emily", 30, "Female"));
    persons.push(new Person("Michael", 40, "Male"));
    persons.push(new Person("Sarah", 35, "Female"));
    persons.push(new Person("David", 27, "Male"));
    persons.push(new Person("Jessica", 32, "Female"));
    persons.push(new Person("Daniel", 38, "Male"));
    persons.push(new Person("Olivia", 29, "Female"));
    persons.push(new Person("Christopher", 42, "Male"));
    persons.push(new Person("Sophia", 31, "Female"));
    return persons;
};
const createTable = (persons) => {
    const table = document.createElement("table");
    const thead = table.createTHead();
    const tbody = table.createTBody();
    const headerRow = thead.insertRow();
    const headers = ["Name", "Age", "Gender"];
    headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });
    persons.forEach((person) => {
        const row = tbody.insertRow();
        const nameCell = row.insertCell();
        const ageCell = row.insertCell();
        const genderCell = row.insertCell();
        nameCell.textContent = person.name;
        ageCell.textContent = person.age.toString();
        genderCell.textContent = person.gender;
    });
    return table;
};
let sortOrder = "asc";
const toggleSortOrderAsc = (persons) => {
    persons.sort((a, b) => a.age - b.age);
    sortOrder = "asc";
    const table = document.getElementById("personTable");
    table.remove();
    const rootElement = document.getElementById("root");
    rootElement.appendChild(createTable(persons));
    const ascButton = document.getElementById("sortAscButton");
    const descButton = document.getElementById("sortDescButton");
    ascButton.disabled = true;
    descButton.disabled = false;
};
const toggleSortOrderDesc = (persons) => {
    persons.sort((a, b) => b.age - a.age);
    sortOrder = "desc";
    const table = document.getElementById("personTable");
    table.remove();
    const rootElement = document.getElementById("root");
    rootElement.appendChild(createTable(persons));
    const ascButton = document.getElementById("sortAscButton");
    const descButton = document.getElementById("sortDescButton");
    ascButton.disabled = false;
    descButton.disabled = true;
};
const attachTable = (persons) => {
    const table = createTable(persons);
    table.setAttribute("id", "personTable");
    const rootElement = document.getElementById("root");
    rootElement.appendChild(table);
    const ascButton = document.createElement("button");
    ascButton.setAttribute("id", "sortAscButton");
    ascButton.innerHTML = "Sort Ascending";
    ascButton.addEventListener("click", () => toggleSortOrderAsc(persons));
    rootElement.appendChild(ascButton);
    const descButton = document.createElement("button");
    descButton.setAttribute("id", "sortDescButton");
    descButton.innerHTML = "Sort Descending";
    descButton.addEventListener("click", () => toggleSortOrderDesc(persons));
    rootElement.appendChild(descButton);
};
const persons = populator();
attachTable(persons);
