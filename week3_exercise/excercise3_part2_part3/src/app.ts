import { getPeople } from './people.ts';
import { renderPeopleList } from './peopleList.ts';

// Select the container element
const container = document.querySelector<HTMLDivElement>('#app')!;

// Call the getPeople() function
getPeople()
    .then((people) => {
        // Render the list of people in the container element
        renderPeopleList(container, people);
    })
    .catch((error) => {
        console.error(error);
    });

// Export the container element for other modules to use
export { container };
