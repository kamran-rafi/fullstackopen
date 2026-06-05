import { useEffect, useState } from "react";

import Notification from "./components/Notification";
import personsService from "./services/persons";

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

const Persons = ({ persons, handleDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  const showNotification = (notificationObj) => {
    setNotification(notificationObj);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
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
      if (
        window.confirm(`${personExist.name} already exists. Update number?`)
      ) {
        personsService
          .update(personExist.id, { ...personExist, number: number })
          .then((updatedPerson) => {
            console.log(updatedPerson);
            setPersons((previous) =>
              previous.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person,
              ),
            );
          });
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: number,
    };

    personsService
      .create(newPerson)
      .then((savedPerson) => {
        setPersons(persons.concat(savedPerson));
        setNewName("");
        setNumber("");
        setNotification({
          message: `Added ${savedPerson.name} to phonebook`,
          error: false,
        });
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      })
      .catch((error) => {
        console.log(error.response.data.error)
        showNotification({
          message: error.response.data.error,
          error: true,
        });
      });
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${personToDelete.name} from phonebook?`)) {
      personsService
        .remove(id)
        .then((deletedPerson) =>
          setPersons(
            persons.filter((person) => person.id !== personToDelete.id),
          ),
        )
        .catch((err) => {
          console.log(err);
          setNotification({
            message: `Info about ${personToDelete.name} is already deleted.`,
            error: true,
          });
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        });
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
