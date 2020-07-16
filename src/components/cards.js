import React from 'react';

export default function GetCityData({ dataState }) {
  const newData = dataState.map(data => {
    const { id, name, country, main, description, temp_min, temp_max, lat, lon } = data;

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