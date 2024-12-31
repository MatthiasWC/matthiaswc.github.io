import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './routes/Home';
import Bloom from './routes/projects/Bloom';
import Caduceus from './routes/projects/Caduceus';
import Calaverita from './routes/projects/Calaverita';
import HackAttack from './routes/projects/HackAttack';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects/bloom' element={<Bloom />} />
        <Route path='/projects/caduceus' element={<Caduceus />} />
        <Route path='/projects/calaverita' element={<Calaverita />} />
        <Route path='/projects/hackattack' element={<HackAttack />} />
      </Routes>
    </>
  );
}

export default App;
