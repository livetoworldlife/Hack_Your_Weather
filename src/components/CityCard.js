// This file includes 
// 1- city card
// 2- city weather delete action
import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const CityCard = ({ cityWeather }) => {
  const { id, name, country, main, description, temp_min, temp_max, lat, lon } = cityWeather;
  // delete CityWeatherData action which was imported from GlobalState
  const { deleteCityWeatherData } = useContext(GlobalContext);

  return (
    <div className='card'>
      <div className="close" >
        <button onClick={() => deleteCityWeatherData(cityWeather.id)}> X </button>
      </div>
      <h4>
        <a href={id}>
          {name},{country}
        </a>
      </h4>
      <h6>{main}</h6>
      <p>{description}</p>
      <p>min temp: {(temp_min - 273.15).toFixed(1)}</p>
      <p>max temp: {(temp_max - 273.15).toFixed(1)}</p>
      <p>location: {lat}, {lon}</p>
    </div>
  )
}
