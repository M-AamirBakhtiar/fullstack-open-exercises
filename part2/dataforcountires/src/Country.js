import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  const { name, capital, population, languages, flag } = country;
  useEffect(() => {
    const fetchWeather = async () => {
      const api_key = process.env.REACT_APP_API_KEY;
      const res = await axios.get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
      );
      const data = await res.data;
      setWeather(data);
    };
    fetchWeather();
  }, [capital]);
  return (
    <>
      <h2>{name}</h2>
      <p>Capital {capital}</p>
      <p>Population {population}</p>
      <ul>
        {languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img src={flag} alt="country flag" style={{ width: 150, height: 150 }} />
      {weather && (
        <>
          <h3>Weather in {capital}</h3>
          <p>
            <strong>temperature:</strong> {weather.current.temperature} Celcius
          </p>
          <img src={weather.current.weather_icons[0]} alt="" />
          <p>
            <strong>wind:</strong> {weather.current.wind_speed} mph direction{' '}
            {weather.current.wind_dir}
          </p>
        </>
      )}
    </>
  );
};

export default Country;
