import axios from "axios";
import { useEffect, useState } from "react";

const Filter = ({ filter, handleFilter }) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={handleFilter} />
    </div>
  );
};

const PersonForm = (props) => {
  const { addPerson, newName, handleNewName, number, handleNumber } = props;

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={number} onChange={handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("a");

  useEffect(()=>{
    axios
      .get("http://localhost:3001/persons")
      .then(res => setPersons(res.data))
  }, []);

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();

    const personExist = persons.find((person) => person.name === newName);

    if (personExist) {
      alert(`${personExist.name} already exists.`);
      return;
    }

    const newPerson = {
      name: newName,
      number: number,
    };

    setPersons(persons.concat(newPerson));
    setNewName("");
    setNumber("");
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        number={number}
        handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
