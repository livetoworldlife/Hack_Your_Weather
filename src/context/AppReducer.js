// app reducer - how we specify the app state changes in response to certain actions to our context

export default (state, action) => {
  switch (action.type) {
    case 'DELETE_CITYWEATHERDATA':
      return {
        ...state,
        cityWeatherList: state.cityWeatherList.filter(cityWeather => cityWeather.id !== action.currentId)
      }
    case 'ADD_CITYWEATHERDATA':
      return {
        ...state,
        cityWeatherList: [action.currentCity, ...state.cityWeatherList]
      }
    default:
      return state;
  }
}