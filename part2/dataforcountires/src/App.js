import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchFilter from './SearchFilter';
import Countries from './Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    try {
      const fetchCountries = async () => {
        const res = await axios.get(`https://restcountries.eu/rest/v2/all`);
        const data = await res.data;
        setCountries(
          data.filter((country) =>
            country.name.toLowerCase().includes(search.toLowerCase())
          )
        );
      };
      fetchCountries();
    } catch (err) {
      console.log(err);
    }
  }, [search]);

  const handleCountrySearch = (e) => {
    setSearch(e.target.value);
  };

  const handleShowClick = (e) => {
    const countryName = e.target.parentNode.innerText.split(' ')[0];
    setSearch(countryName);
  };

  return (
    <>
      <SearchFilter value={search} handleChange={handleCountrySearch} />
      {countries.length > 10 ? (
        <p>Too many matches,specify anotherfiler</p>
      ) : (
        <Countries searchResults={countries} handleClick={handleShowClick} />
      )}
    </>
  );
}

export default App;
