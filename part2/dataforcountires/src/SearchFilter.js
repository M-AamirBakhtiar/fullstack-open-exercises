import React from 'react';

const SearchFilter = ({ handleChange }) => {
  return (
    <>
      <h1>Find Countries</h1>
      <input onChange={handleChange} />
    </>
  );
};

export default SearchFilter;
