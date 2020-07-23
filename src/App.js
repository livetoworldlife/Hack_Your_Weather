import React from 'react';
import { Header } from './components/Header';
import { CityList } from './components/CityList';
import { AddCity } from './components/AddCity';
import { GlobalProvider } from './context/GlobalState';

import './App.css';

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Header />
        <AddCity />
        <CityList />
      </div>
    </GlobalProvider>
  );
}

export default App;
