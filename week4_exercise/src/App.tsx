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
    const [newPerson, setNewPerson] = useState<Person>({id: 0, name: "", age: 0, city: ""});
    useEffect(() => {
        fetch("http://localhost:3001/person")
            .then(response => response.json())
            .then(json => setPeople(json));
    }, []);

    const addPerson = () => {
        const newPerson: Person = {
            id: people.length + 1,
            name: "Adam Warlock",
            age: 30,
            city: "New York City"
        };
        setPeople([...people, newPerson]);
    };

    const removePerson = () => {
        setPeople(people.slice(0, -1));
    };

    const sortByAge = () => {
        const sortedPeople = [...people].sort((a, b) => a.age - b.age);
        setPeople(sortedPeople);
    };


    return (
        <div>
            <h1>People</h1>
            <table>
                <thead> <tr> <th>Id</th> <th>Name</th> <th>Age</th> <th>City</th> </tr> </thead>
                <tbody>
                {people.map((person) => {
                        return (
                            <tr key={person.id}>
                                <td>{person.id}</td>
                                <td>{person.name}</td>
                                <td>{person.age}</td>
                                <td>{person.city}</td>
                            </tr>
                        )
                    }
                )
                }
                </tbody>
            </table>

            {/*<form onSubmit={handleSubmit}>*/}
            {/*    <h2>Add person</h2>*/}
            {/*    <div>*/}
            {/*        <label>*/}
            {/*            Name:*/}
            {/*        <input type="text" id="name" value={newPerson.name} onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })} />*/}
            {/*        </label>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <label htmlFor="age">Age:</label>*/}
            {/*        <input type="number" id="age" value={newPerson.age} onChange={(e) => setNewPerson({ ...newPerson, age: Number(e.target.value) })} />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <label htmlFor="city">City:</label>*/}
            {/*        <input type ="text" id="city" value={newPerson.city} onChange={(e) => setNewPerson({...newPerson, city: e.target.value})} />*/}
            {/*    </div>*/}
            {/*</form>*/}

            <button onClick={addPerson}>Add Person</button>
            <button onClick={removePerson} disabled={people.length === 0}>Remove Last Person</button>
            <button onClick={sortByAge}>Sort by Age</button>
        </div>
    )
}
export default App
