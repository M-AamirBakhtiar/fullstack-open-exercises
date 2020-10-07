import React from 'react';
import Person from './Person';

const Persons = ({ regularResults, filteredResults, deletePerson }) => {
  return (
    <>
      {filteredResults.length > 0
        ? filteredResults.map((person) => (
            <Person
              key={person.name}
              person={person}
              handleDelete={deletePerson}
            />
          ))
        : regularResults.map((person) => (
            <Person
              key={person.name}
              person={person}
              handleDelete={deletePerson}
            />
          ))}
    </>
  );
};

export default Persons;
