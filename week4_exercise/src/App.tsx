import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
    console.log("App component is rendered")
    const [name, setName] = useState<string>("initial name")

    return (
        <div className="App">
            <In name={name} setName={setName}/>
            <Out name={name}/>
            <PeopleViewer />
        </div>
    )
}

const In = ({name, setName}:{name:string, setName:React.Dispatch<React.SetStateAction<string>>}) => {
    return (
        <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
        </div>
    )
};
const Out = ({name}:{name:string}) => {
    console.log("In component is rendered")
    return (
        <div>
            <p>{name}</p>
        </div>
    )
};
const PeopleViewer = () => {
    type Person = {
        id: number
        name: string
        age: number
        city: string
    }
    const [people, setPeople] = useState<Person[]>([]);
    const [newPerson, setNewPerson] = useState<Person>({ id: 0, name: "", age: 0, city: "" });
    const [updatePerson, setUpdatePerson] = useState<Person>({ id: 0, name: "", age: 0, city: "" });

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPerson({ ...newPerson, name: e.target.value });
    };

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPerson({ ...newPerson, age: Number(e.target.value) });
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPerson({ ...newPerson, city: e.target.value });
    };

    const handleUpdateNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatePerson({ ...updatePerson, name: e.target.value });
    };

    const handleUpdateAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatePerson({ ...updatePerson, age: Number(e.target.value) });
    };

    const handleUpdateCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatePerson({ ...updatePerson, city: e.target.value });
    };

    const addPerson = () => {
        const newPersonWithId: Person = {
            ...newPerson,
            id: people.length + 1
        };
        setPeople([...people, newPersonWithId]);
        setNewPerson({ id: 0, name: "", age: 0, city: "" });
    };

    const removePerson = () => {
        setPeople(people.slice(0, -1));
    };

    const sortByAge = () => {
        const sortedPeople = [...people].sort((a, b) => a.age - b.age);
        setPeople(sortedPeople);
    };

    const updatePersonDetails = (id: number) => {
        const updatedPeople = people.map(person => {
            if (person.id === id) {
                return { ...person, ...updatePerson };
            }
            return person;
        });
        setPeople(updatedPeople);
        setUpdatePerson({ id: 0, name: "", age: 0, city: "" });
    };

    useEffect(() => {
        fetch("http://localhost:3001/person")
            .then(response => response.json())
            .then(json => setPeople(json));
    }, []);

    return (
        <div>
            <h1>People</h1>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>City</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {people.map((person) => (
                    <tr key={person.id}>
                        <td>{person.id}</td>
                        <td>{person.name}</td>
                        <td>{person.age}</td>
                        <td>{person.city}</td>
                        <td>
                            <button onClick={() => setUpdatePerson(person)}>Update</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <form>
                <h2>Add person</h2>
                <div>
                    <label>
                        Name:
                        <input type="text" value={newPerson.name} onChange={handleNameChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Age:
                        <input type="number" value={newPerson.age} onChange={handleAgeChange} />
                    </label>
                </div>
                <div>
                    <label>
                        City:
                        <input type="text" value={newPerson.city} onChange={handleCityChange} />
                    </label>
                </div>
                <button onClick={addPerson}>Add Person</button>
            </form>

            <form>
                <h2>Update person</h2>
                <div>
                    <label>
                        Name:
                        <input type="text" value={updatePerson.name} onChange={handleUpdateNameChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Age:
                        <input type="number" value={updatePerson.age} onChange={handleUpdateAgeChange} />
                    </label>
                </div>
                <div>
                    <label>
                        City:
                        <input type="text" value={updatePerson.city} onChange={handleUpdateCityChange} />
                    </label>
                </div>
                <button onClick={() => updatePersonDetails(updatePerson.id)}>Update Details</button>
            </form>

            <button onClick={removePerson} disabled={people.length === 0}>Remove Last Person</button>
            <button onClick={sortByAge}>Sort by Age</button>
        </div>
    )
}


export default App;
