import React from 'react';

const Form = ({
  name,
  number,
  handleSubmit,
  handleNewNumber,
  handleNewName,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={name} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={number} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
