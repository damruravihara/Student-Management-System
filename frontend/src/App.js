import './App.css';
import React,{useContext} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import Header from "./components/Header/Header";
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Updateprofile from './components/Updateprofile';
import Allusers from './components/Allusers';
import Createclass from './components/Createclass';
import Allclasses from './components/Allclasses';
import Updateclass from './components/Updateclass';
import Addstudent from './components/Addstudent';
import Allstudentclass from './components/Allstudentclass';
import Updatestudent from './components/Updatestudent';




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
        <Route path="/user/update/:id" component={Updateprofile}/>
        <Route path="/admin/alluser" component={Allusers}/>
        <Route path="/student/createclass" component={Createclass}/>
        <Route path="/student/allclasses" component={Allclasses}/>
        <Route path="/student/updateclass/:id" component={Updateclass}/>
        <Route path="/student/addstudent/:id" component={Addstudent}/>
        <Route path="/student/allstudents/:id" component={Allstudentclass}/>
        <Route path="/student/updatestudent/:id" component={Updatestudent}/>
      </div>
    </Router>
    
  );
}

export default App;
