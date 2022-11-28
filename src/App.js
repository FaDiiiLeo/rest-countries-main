import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
// Components
import Home from './Home';
import Country from './components/Country';
import Header from './components/Header';

export default function App() {

  const [theme, setTheme] = useState('dark');

  return (
    <div className={theme === 'dark' ? 'app-container' : 'app-container light-theme'}>
      <Header theme={theme} setTheme={setTheme}/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/:countryName' element={<Country />}></Route>
      </Routes>
    </div>
  );
}