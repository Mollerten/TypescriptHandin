import './style.css'
import { renderPeopleList } from "./peopleList";
import { getPeople } from "./people";
import "./app";

export class Person {
    name: string;
    age: number;
    occupation: string;
    salary: number;
    constructor(name: string, age: number, occupation: string) {
        this.name = name;
        this.age = age;
        this.occupation = occupation;
        this.salary = 0;
    }
}

function introduce(person:Person):string {
    let introduction = `Hello, my name is ${person.name} and i am a ${person.occupation}.` +
        `\nI earn ${person.salary}$`
    return introduction
}
function incrementAge(person:Person):void {
    person.age ++;
}
function setSalary(person:Person, amount:number):void {
    person.salary = amount
}
function getSalary(person:Person):number {
    return person.salary;
}

let person = new Person('John', 32, 'data scientist')

console.log(introduce(person));
console.log(person.age);
incrementAge(person)
console.log(person.age);
setSalary(person, 10_000)
console.log(getSalary(person))
console.log(introduce(person));

const appContainer = document.querySelector<HTMLDivElement>("#app");

if (appContainer) {
    getPeople().then((people) => {
        renderPeopleList(appContainer, people);
    });
} else {
    console.error("Could not find app container element");
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    appContainer
    
    
  </div>
`