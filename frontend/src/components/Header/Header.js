import React,{useContext} from "react";
import Authentication from "../../Services/Authentication";
import {AuthContext} from '../../Context/AuthContext';
import {useHistory , Link} from 'react-router-dom';
import swal from 'sweetalert';

function Header(){

  const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);

  let history = useHistory();
  let path = '/user/login';
  const authContext = useContext(AuthContext);

  const onClickLogoutHandler = ()=>{
    Authentication.logout().then(data=>{
      
      if(data.success){
        swal({
          title: "Log Out",
          text: "Are you Sure?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            setUser(data.user);
            setIsAuthenticated(false);
             history.push(path);
            swal("Success", 
              "Successfully Logout",
            );  setTimeout(function(){
              window.location.reload();
             },1000);}
          // } else {
          //   swal("File Is Not Deleted");}

      })
      }
  })
}

  return(
    <nav class="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"#222831"}}>
      <div class="container-fluid">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <div class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" href="#">Home </a>
      </li>
      <li class="nav-item">
      <Link to={"/user/login"}><a class="nav-link">login</a></Link>
      </li>
      <li class="nav-item">
      <Link to={"/user/register"}><a class="nav-link">Register</a></Link>
      </li>
      <li class="nav-item">
      <a class="nav-link" onClick={onClickLogoutHandler}>Logout</a>
      </li>
    </div>
    </div>
  </div>
</nav>
  )
}

export default Header;