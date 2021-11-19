import './App.scss';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NoUserPage from './components/NoUserPage';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import TheVault from './components/TheVault';
import Nav from './components/Nav';
import AccountPage from './components/AccountPage';
import axios from 'axios';
import Display from './components/Display';
import AddPassword from './components/AddPassword';

function App() {
  const results = localStorage.getItem("uid");
  const [uid, setUid] = useState(
    results != "" ? results : ""
  );
  const [user, setUser] = useState({});
  const darkModeRes = JSON.parse(localStorage.getItem("darkMode"));
  const [darkMode, setDarkMode] = useState(
    darkModeRes ? darkModeRes : false
  );

  const [currentTab, setTab] = useState("Settings");
  const [showPass, setShowPass] = useState( user.showpass );

  const [navScroll, setNav] = useState(false);

  const login = id => {
    setUid(id);
    localStorage.setItem("uid", id);
  }

  const setMode = () => {
    localStorage.setItem("darkMode", !darkMode);
    setDarkMode(!darkMode);
  }

  const handleSetPass = () => {
    axios.put("http://localhost:8000/api/user/update/" + uid + "/", { "showpass": !showPass }).then(() => setShowPass(!showPass)).catch(e => console.log(e));
  }

  useEffect(() => {
    if (uid != "") {
      axios.get("http://localhost:8000/api/user/" + uid + "/").then(e => {setUser(e.data);setShowPass(e.data.showpass)}).catch(e => console.log(e));
    }
  }, [uid])

  const handleScroll = () => {
    if(window.pageYOffset > window.innerHeight) {
      setNav(true);
    } else {
      setNav(false);
    }
  }

  return (
    <div className="App" style={darkMode ? { backgroundColor: "#575757", color: "white" } : { backgroundColor: "", color: "black" }}>
      {uid != null ?
        <div onScroll={handleScroll}>
          <BrowserRouter>
            <Nav uid={uid} darkMode={darkMode} scroll={navScroll} />
            <Routes>
              <Route path="/" element={<TheVault uid={uid} mode={darkMode} />} />
              <Route path="/account" element={
                <div className="row container">
                  <p className="display-2">{user.username}'s account</p>
                  <AccountPage uid={uid} mode={darkMode} setDisplay={setTab} />
                  <Display 
                    display={currentTab} 
                    darkMode={darkMode} 
                    setMode={setMode}
                    setPass={handleSetPass}
                    pass={showPass} />
                </div>
              } />
            <Route path="/logout" element={<Logout login={login} />} />
            </Routes>
          </BrowserRouter>
        </div>
        :
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NoUserPage />} />
            <Route path="/login" element={<Login login={login} />} />
            <Route path="/register" element={<Register login={login} />} />
          </Routes>
        </BrowserRouter>
      }

    </div>
  );
}

export default App;
