import React, { useContext } from 'react';
import { CityCard } from './CityCard';

import { GlobalContext } from '../context/GlobalState';

export const CityList = () => {
  // i used GlobalContext which was imported in GlobalState file
  const { cityWeatherList } = useContext(GlobalContext);

  return (
    <div className="city-cards">
      {cityWeatherList
        .map(cityWeather =>
          (<CityCard
            key={cityWeather.id}
            cityWeather={cityWeather} />))}
    </div>
  )
}
