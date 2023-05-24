import { getPeople } from "./people";
import { renderPeopleList } from "./peopleList";

const container = document.getElementById("people-container") as HTMLElement;

if (container) {
    getPeople().then((people) => {
        renderPeopleList(container, people);
    });
} else {
    console.error("Could not find container element");
}

export default "app"
