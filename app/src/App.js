import React from 'react';
import GlobalStyle from './globalStyles'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import RankingPage from './pages/RankingPage';

function App() {
  return (
    <Router>
      <GlobalStyle/>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/me' element={<ProfilePage />}></Route>
        <Route path='/rank' element={<RankingPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
