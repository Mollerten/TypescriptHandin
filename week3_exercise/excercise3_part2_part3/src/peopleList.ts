import { Person } from './person';

export function renderPeopleList(container: HTMLElement, people: Person[]): void {
    container.innerHTML = '';

    for (const person of people) {
        const personDiv = document.createElement('div');
        personDiv.classList.add('person');

        const nameHeading = document.createElement('h2');
        nameHeading.classList.add('person__name');
        nameHeading.textContent = person.name;

        const occupationPara = document.createElement('p');
        occupationPara.classList.add('person__occupation');
        occupationPara.textContent = person.occupation;

        const agePara = document.createElement('p');
        agePara.classList.add('person__age');
        agePara.textContent = person.age.toString();

        const salaryPara = document.createElement('p');
        salaryPara.classList.add('person__salary');
        salaryPara.textContent = person.getSalary().toString();

        personDiv.appendChild(nameHeading);
        personDiv.appendChild(occupationPara);
        personDiv.appendChild(agePara);
        personDiv.appendChild(salaryPara);

        container.appendChild(personDiv);
    }
}
