// Global state
import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  cityWeatherList: []
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component-we use it in app.js to cover other components
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions 
  function deleteCityWeatherData(id) {
    dispatch({
      type: 'DELETE_CITYWEATHERDATA',
      currentId: id
    });
  }

  function addCityWeatherData(cityWeather) {
    dispatch({
      type: 'ADD_CITYWEATHERDATA',
      currentCity: cityWeather
    });
  }

  return (<GlobalContext.Provider value={{
    cityWeatherList: state.cityWeatherList,
    deleteCityWeatherData,
    addCityWeatherData
  }}>
    {children}
  </GlobalContext.Provider>);
}