import React from 'react';
import Country from './Country';

const Countries = ({ searchResults, handleClick }) => {
  return (
    <>
      {searchResults.length === 1 ? (
        <Country country={searchResults[0]} />
      ) : (
        searchResults.map((country) => (
          <p key={country.numericCode}>
            {country.name} <button onClick={handleClick}>show</button>
          </p>
        ))
      )}
    </>
  );
};

export default Countries;
