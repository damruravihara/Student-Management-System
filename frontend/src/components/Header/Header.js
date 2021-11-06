import React,{useContext} from "react";
import Authentication from "../../Services/Authentication";
import {AuthContext} from '../../Context/AuthContext';
import {useHistory} from 'react-router-dom';
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
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link" href="/user/login">login</a>
      <a class="nav-item nav-link" href="/user/register">Register</a>
      <a class="nav-item nav-link" onClick={onClickLogoutHandler}>Logout</a>
      <a class="nav-item nav-link disabled" href="#">Disabled</a>
    </div>
  </div>
</nav>
  )
}

export default Header;