import { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from 'containers/Login/Login.js';
import Preferences from 'containers/Preferences/Preferences';
import Dashboard from 'containers/Dashboard/Dashboard';

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      <h1>Application</h1>
    </div>
  );
}

export default App;
