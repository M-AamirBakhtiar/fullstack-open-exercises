import React from 'react';

const Filter = ({ handleChange, search }) => {
  return (
    <div>
      filter shown with <input value={search} onChange={handleChange} />
    </div>
  );
};

export default Filter;
