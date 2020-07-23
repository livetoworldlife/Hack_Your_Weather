// This file includes ;
// 1- search city into the input field
// 2- submit the city name
// 3- fetch the city name weather data from API and add action
// 4- loading and error info

import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Loader from 'react-loader-spinner';

export const AddCity = () => {
  // loading, error and error description states
  const [isError, setError] = useState(false);
  const [descError, setDescError] = useState('');
  const [isLoading, setLoading] = useState(false);
  // queryCity input value state
  const [queryCity, setQueryCity] = useState('');

  // add city data action
  const { addCityWeatherData } = useContext(GlobalContext);
  // to check cityWeatherList is empty and new city is in the list
  const { cityWeatherList } = useContext(GlobalContext);
  // to show error info for 3 sn-useEffect cleanup
  useEffect(() => {
    let timeoutId = null;
    if (isError !== false) {
      timeoutId = setTimeout(() => setError(false), 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [isError])

  // fetch city data asynchronously from API
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

      // add the city search to the list if it is not already searched before
      if (cityWeatherList.find(cityWeather => cityWeather.id === id)) {
        setError(true);
        setDescError("You have already searched this city before!!!");
      } else {
        const newCityWeatherData = { id, name, country, main, description, temp_min, temp_max, lat, lon };
        addCityWeatherData(newCityWeatherData);
        setError(false);
      }
    } catch (error) {
      setError(true);
      setDescError(error.message);
    } finally {
      setLoading(false)
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    fetchCity(queryCity);
    // clear input field for next search
    setQueryCity("");
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text"
          value={queryCity}
          onChange={(e) => setQueryCity(e.target.value)}
          placeholder="Search City..." />
        <button disabled={queryCity.length < 1}>Search</button>        {/* allow a user to use the "Search City" button when the input field has at least 1 character */}
      </form>
      <div className="info">
        {(cityWeatherList.length === 0) && <p style={{ color: "green" }}>There are no cities searched for yet!</p>}  {/* Check is There any cities searched for yet! */}
        {isLoading && <Loader type="ThreeDots" color="blue" height="100" width="40" />}
        {isError && <p style={{ color: "red" }}>Alert! {descError}.</p>}
      </div>
    </>
  )
}
