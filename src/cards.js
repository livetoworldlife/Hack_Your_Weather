import React from 'react';
import CityWeather from './city-weather.json';



export default function GetCityData() {
  const newData = CityWeather.map(data => {
    const {
      id,
      name,
      sys: { country },
      weather: [{ main, description }],
      main: { temp_min, temp_max },
      coord: { lat, lon } } = data;

    return (
      <div key={id}>
        <div className='card'>
          <div className="close" ></div>
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
      </div>
    );
  });
  return (
    <div>
      {newData}
    </div>
  );
}