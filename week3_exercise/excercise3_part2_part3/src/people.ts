import { Person } from './person';

export function getPeople(): Promise<Person[]> {
    return new Promise((resolve, reject) => {
        fetch('people.json')
            .then(response => response.json())
            .then(data => {
                const people: Person[] = data.map((personData: any) => {
                    const { name, age, occupation, salary } = personData;
                    return new Person(name, age, occupation, salary);
                });
                resolve(people);
            })
            .catch(error => reject(error));
    });
}