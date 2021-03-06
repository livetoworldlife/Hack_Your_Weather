import React, { useState, useEffect } from "react";
import { useInput } from './InputCustomHook';
import CityData from './WeatherCards';
import Loader from 'react-loader-spinner';

export default function WeatherForm({ list }) {
  const { value, bind, reset } = useInput('');
  const [dataState, setDataState] = useState([])
  const [isError, setError] = useState(false);
  const [descError, setDescError] = useState('');
  const [isLoading, setLoading] = useState(false);

  console.log(list);
  const fetchCity = async (cityName) => {
    try {
      setLoading(true);
      const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
      const response = await fetch(URL);
      const data = await response.json();
      const {
        id,
        name,
        sys: { country },
        weather: [{ main, description }],
        main: { temp_min, temp_max },
        coord: { lat, lon } } = data;

      const newWeather = { id, name, country, main, description, temp_min, temp_max, lat, lon };
      setDataState([...dataState, newWeather]);
      setError(false);
    } catch (error) {
      setError(true);
      setDescError(error.message);
    } finally {
      setLoading(false)
    }

  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetchCity(value);
    reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" {...bind} placeholder="Search City..." />
        <input type="submit" value="Submit" disabled={value.length < 1} />
      </form>
      <div>
        {(dataState.length === 0) && <p style={{ color: "green" }}>There are no cities searched for yet!</p>}
        {isLoading && <Loader type="ThreeDots" color="blue" height="100" width="40" />}
        {isError && <p style={{ color: "red" }}>Alert! {descError}.</p>}
      </div>
      <CityData dataState={dataState} />
    </>
  );
}

/**
Any time a user searches for a new city, add it to a list of already searched cities
Hints:

Think about what data structure makes most sense to use
Make use of filter() when removing cities
 */