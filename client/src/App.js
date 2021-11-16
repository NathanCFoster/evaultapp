import './App.scss';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NoUserPage from './components/NoUserPage';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import TheVault from './components/TheVault';
import Nav from './components/Nav';


function App() {
  const results = localStorage.getItem("uid");
  const [uid, setUid] = useState(
    results != "" ? results : ""
    );
    const [darkMode, setDarkMode] = useState(async () => {
    let darkModeRes = await(localStorage.getItem("darkMode"));
    return darkModeRes ? darkModeRes : false

    }
  );

  const login = id => {
    setUid(id);
    localStorage.setItem("uid", id);
  }

  const setMode = (mode) => {
    localStorage.setItem("darkMode", mode);
    setDarkMode(mode);
  }



  return (
    <div className="App">
      {uid ?
        <div>
          <BrowserRouter>
            <Nav uid={uid} setMode={setMode} darkMode={darkMode} />
            <Routes>
              <Route path="/" element={<TheVault uid={uid} mode={darkMode} />} />
            </Routes>
          </BrowserRouter>
        </div>
        :
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NoUserPage />} />
            <Route path="/login" element={<Login login={login} />} />
            <Route path="/register" element={<Register login={login} />} />
            <Route path="/logout" element={<Logout login={login} />} />
          </Routes>
        </BrowserRouter>
      }

    </div>
  );
}

export default App;
