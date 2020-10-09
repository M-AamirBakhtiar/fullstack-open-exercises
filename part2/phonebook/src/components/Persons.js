import React from 'react';
import Person from './Person';

const Persons = ({
  regularResults,
  filteredResults,
  removePerson,
  searchInput,
}) => {
  return (
    <>
      {searchInput.length > 0
        ? filteredResults.map((person) => (
            <Person
              key={person.name}
              person={person}
              handleDelete={removePerson}
            />
          ))
        : regularResults.map((person) => (
            <Person
              key={person.name}
              person={person}
              handleDelete={removePerson}
            />
          ))}
    </>
  );
};

export default Persons;
