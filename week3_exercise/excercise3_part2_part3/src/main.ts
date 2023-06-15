import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { Person } from './person.ts';
import { getPeople } from './people.ts';
import { renderPeopleList } from './peopleList.ts';
import { container } from "./app";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`
// *******************************************************************************************************************
// Excercise3_part3 is demonstrated below, run "npm run dev" to see results
getPeople()
    .then((people: Person[]) => {
        renderPeopleList(container, people);
    })
    .catch((error) => {
        console.error(error);
    });
// *******************************************************************************************************************

// *******************************************************************************************************************
// For excercise3_part2, uncomment the following lines and run "npm run dev" to see the result in the browser console:

// const john = new Person("John Smith", 30, "software developer");
// console.log(john.introduce()); // "Hello, my name is John Smith and I am a software developer. I earn 0$"
// console.log(john.age); // 30
// john.incrementAge();
// console.log(john.age); // 31
// john.setSalary(100000);
// console.log(john.getSalary()); // 100000
// console.log(john.introduce()); // "Hello, my name is John Smith and I am a software developer. I earn 100000$"
// *******************************************************************************************************************



// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
