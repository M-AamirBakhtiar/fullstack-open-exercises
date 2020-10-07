import React, { useState, useEffect } from 'react';

import Filter from './components/Filter';
import Form from './components/Form';
import Persons from './components/Persons';
import personService from './service/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchPerson, setSearchPerson] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationSuccess, setNotificationSucess] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  }, []);

  const handleFilterChange = (e) => {
    setSearchPerson(e.target.value.toLowerCase());
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(searchPerson)
      )
    );
  };

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const person = persons.find(({ name }) => name === newName);
    if (person) {
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one ?`
        )
      ) {
        const updatedContact = { ...person, number: newNumber };
        personService
          .update(person.id, updatedContact)
          .then((returnedContact) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : returnedContact))
            );
            setNewName('');
            setNewNumber('');
            setNotification(
              `Updated the Number of ${person.name} to ${newNumber}`
            );
            setNotificationSucess(true);
            setTimeout(() => {
              setNotification(null);
              setNotificationSucess(null);
            }, 5000);
          })
          .catch((error) => {
            setNotification(
              `Contact ${person.name} was already deleted from the server`
            );
            setNotificationSucess(false);
            setTimeout(() => {
              setNotification(null);
              setNotificationSucess(null);
            }, 5000);
          });
      }
    } else {
      const newContact = {
        name: newName,
        number: newNumber,
      };
      personService.create(newContact).then((returnedContact) => {
        setPersons(persons.concat(returnedContact));
        setNewName('');
        setNewNumber('');
        setNotification(`Added ${newName}`);
        setNotificationSucess(true);
        setTimeout(() => {
          setNotification(null);
          setNotificationSucess(null);
        }, 5000);
      });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(id).then((returnedContact) => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification}
        messageStatus={notificationSuccess}
      />
      <Filter handleChange={handleFilterChange} search={searchPerson} />
      <h3>Add a new</h3>
      <Form
        name={newName}
        number={newNumber}
        handleSubmit={addPerson}
        handleNewNumber={handleNewNumberChange}
        handleNewName={handleNewNameChange}
      />
      <h3>Numbers</h3>
      <Persons
        regularResults={persons}
        filteredResults={filteredPersons}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
