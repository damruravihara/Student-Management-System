import React,{useState,useContext} from "react";
import Authentication from "../Services/Authentication";
import { AuthContext } from "../Context/AuthContext";
import swal from 'sweetalert';
import './Login.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

const Login = props=>{
  const [user,setUser] = useState({username: "", password: ""});
  // const [message,setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const onChange = e=>{
    setUser({...user,[e.target.name] : e.target.value});
    console.log(user);
  }

  const onSubmit = e =>{
    e.preventDefault();
    Authentication.login(user).then(data=>{
      const { isAuthenticated,user,message} = data;
      if(isAuthenticated){
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push('/user/profile');
      }
      else{
        swal({title: "Login Failed",
        text: "Incorrect Username Or Password",
        icon: "warning"} );
      }
    });
  }

  return(

    <>
    <div className="logincard">
    <div className="container">
      <br/>
      <center><h1 style={{fontFamily:"Arial,Helvetica,sans-serif" , fontSize:"30px" , fontWeight:"800"}}>Login</h1></center>
    <form onSubmit={onSubmit} className="frm" noValidate>
      <div className="mb-3">
        <label htmlFor="username" className="form-label" style={{fontFamily:"Arial,Helvetica,sans-serif" , fontSize:"18px"}}>Username</label>
        <input 
          type="text" 
          name="username" 
          className="form-control logininput"
          placeholder="Username" 
          onChange={onChange} required/>


            
            <label htmlfor="password" className="form-label" style={{fontFamily:"Arial,Helvetica,sans-serif" , fontSize:"18px"}}>Password</label>
            <div className="input-group md-9">
            <input type={passwordShown ? "text" : "password"} 
                   name="password" 
                   className="form-control logininput" 
                   id="log" 
                   placeholder="Enter Password"
                   onChange={onChange}required/>
                    <span class="input-group-text" id="basic-addon2"><i className="eye" onClick={togglePasswordVisiblity}>{eye}</i></span>
          </div>
          
          </div>
          <br/>
          <center><button type="submit" 
                  className="button-18" role="button" id="dloginbtn">Login</button></center>

    </form>
    <br/>
    </div>
    </div>
    </>
  )
}
export default Login;