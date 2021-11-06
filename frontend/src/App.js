import './App.css';
import React,{useContext} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import Header from "./components/Header/Header";
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';




function App() {

  // const {user,setUser,isAuthenticated,setIsAuthenticated} = useContext(AuthContext);
  // console.log(user);
  // console.log(isAuthenticated);
  return (
    <Router>
      <div>

        <Route path="/" component={Header}/>
        <Route path="/user/login" component={Login}/>
        <Route path="/user/register" component={Register}/>
        <Route path="/user/profile" component={Profile}/>
      </div>
    </Router>
    
  );
}

export default App;
