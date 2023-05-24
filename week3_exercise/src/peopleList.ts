import { Person } from "./main";

export function renderPeopleList(container: HTMLElement, people: Person[]): void {
    container.innerHTML = '';

    for (const person of people) {
        const personElement = document.createElement('div');
        personElement.classList.add('person');

        const nameElement = document.createElement('h2');
        nameElement.classList.add('person__name');
        nameElement.textContent = person.name;

        const occupationElement = document.createElement('p');
        occupationElement.classList.add('person__occupation');
        occupationElement.textContent = person.occupation;

        const ageElement = document.createElement('p');
        ageElement.classList.add('person__age');
        ageElement.textContent = person.age.toString();

        const salaryElement = document.createElement('p');
        salaryElement.classList.add('person__salary');
        salaryElement.textContent = person.salary.toString();

        personElement.appendChild(nameElement);
        personElement.appendChild(occupationElement);
        personElement.appendChild(ageElement);
        personElement.appendChild(salaryElement);

        container.appendChild(personElement);
    }
}