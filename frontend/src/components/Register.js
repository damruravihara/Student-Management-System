import React,{useEffect,useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
const eye = <FontAwesomeIcon icon={faEye} />;

export default function Register(){

  const [passwordShown, setPasswordShown] = useState(false);

  const { register, handleSubmit, formState: { errors }} = useForm();

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [contactno, setContactNo] = useState("");
  const [institute,setInstitute] = useState("");
  const [qulification, setQulification] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");

  function sendData(e){
   
    // e.preventDefault();
    
    const newUser ={

      name,
      address,
      gender,
      contactno,
      institute,
      qulification,
      subject,
      grade,
      email,
      username,
      password,
      // role="user"
    }

    axios.post("http://localhost:8070/user/Tregister",newUser).then(()=>{
     // refresh()
      swal({
      title: "Success!",
      text: "Supplier Successfully registered",
      icon: "success",
      button: "Ok",
    });setTimeout(function(){
      window.location.reload();
     },2500);
    }).catch(()=>{
      swal("Please fill Form correctly");
    })


  };
  

  return(
    <>
    <div className="container">
      <form onSubmit={handleSubmit(sendData)} className="needs-validation" noValidate>
        <div className="row g-2">
          <div className="col-md-6">
            <input type="text" className="form-control" {...register("name", { maxLength: 20 })} id="name" placeholder="Name"
              onChange={(e) => {setName(e.target.value);
              }} required/>
              {errors?.name?.type === "maxLength" && (<p>*Name cannot exceed 20 characters</p> )}
          </div>

          <div className="col-md-6">
                    <input type="number" {...register("contactno", { minLength:10, maxLength:12 })} className="form-control" id="contactno" placeholder="Contact Number"
                      onChange={(e) => {
                        setContactNo(e.target.value);
                      } } required/>
                      {errors?.contactno?.type === "minLength" && (<p className="damrureq">*Contact No must be contain Min 10 numbers</p>)}
                      {errors?.contactno?.type === "maxLength" && (<p className="damrureq">*Contact No must be contain Max 12 numbers</p>)}
                  </div>
        </div>

        <br/>
        <div className="row g-2">
          <div className="col-md-6">
            <input type="text" className="form-control" {...register("gender")} id="gender" placeholder="Gender"
              onChange={(e) => {setGender(e.target.value);
              }} required/>
             
          </div>

          <div className="col-md-6">
                    <input type="text" className="form-control" id="institute" placeholder="Institute Name"
                      onChange={(e) => {
                        setInstitute(e.target.value);
                      } } required/>
                  </div>
        </div>
        <br/>
        <div className="row g-2">
          <div className="col-md-6">
            <textarea rows="3" className="form-control" id="address" placeholder="Address"
              onChange={(e) => {setAddress(e.target.value);
              }} required/>
             
          </div>

          <div className="col-md-6">
                    <textarea className="form-control" rows="3" id="qulification" placeholder="Qulifications"
                      onChange={(e) => {
                        setQulification(e.target.value);
                      } } required/>
                  </div>
        </div>

        <br/>
        <div className="row g-2">
          <div className="col-md-6">
            <input type="text" className="form-control" id="subject" placeholder="Subjects"
              onChange={(e) => {setSubject(e.target.value);
              }} required/>
             
          </div>

          <div className="col-md-6">
                    <input type="text" className="form-control" id="grade" placeholder="Grade"
                      onChange={(e) => {
                        setGrade(e.target.value);
                      } } required/>
                  </div>
        </div>

        <br/>

        <div className="row g-2">
        <div className="col-md-6">
                    <input type="text" className="form-control" {...register("email",{ pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/})} id="email" placeholder="Email Address"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      } } required/>
                      {errors.email && (<p>*email format is Incorrect</p> )}
                  </div>

                  <div className="col-md-6">
                    <input type="text" className="form-control" {...register("username", { minLength: 6, maxLength: 15 })} id="username" placeholder="Username"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      } } required/>
                      {/* {errors.username && (<p>*Username must be minimum 6 letters and maximum 15 letters </p>)} */}
                      {errors?.username?.type=== "minLength" && (<p>*Username must be minimum 6 letters</p>)}
                      {errors?.username?.type=== "maxLength" && (<p>*Username must be maximum 15 letters</p>)}

                  </div>
        </div>

        <br/>
        <div className="input-group col-md-6">
                    <input type={passwordShown ? "text" : "password"} {...register("password", { minLength: 8})} className="form-control" id="" placeholder="Enter Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      } } required />
                      <span class="input-group-text" id="basic-addon2"><i className="eye1" onClick={togglePasswordVisiblity}>{eye}</i></span>
                      
                      {/* <button class="btn bg-white text-muted"> <span class="far fa-eye-slash"></span> </button> */}
                      {errors?.password?.type === "minLength" && (<p>*Password must contain minimum 8 characters </p> )}
                    </div>

                    <button type="submit" className="btn btn-success" id="regsubmit">Submit</button>
                <button type="reset" className="btn btn-danger" id="regreset">Reset</button>

      </form>
    </div>
    </>
  )
}