import './App.css';
import React,{useContext} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";





function App() {

  const {user,setUser,isAuthenticated,setIsAuthenticated} = useContext(AuthContext);
  console.log(user);
  console.log(isAuthenticated);
  return (
    <Router>
      <div>

      </div>
    </Router>
    
  );
}

export default App;
