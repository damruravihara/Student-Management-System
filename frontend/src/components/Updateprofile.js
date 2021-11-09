import React, {useEffect,useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Updateprofile(){

  let history = useHistory();
  let path = '/user/login';
  let path2 = '/user/profile';
  const{ id } = useParams();


  const { register, handleSubmit, formState: { errors }} = useForm();

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

  useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await axios.get('/user/userprofile').then((res)=>{
      setUser(res.data)
      setName(res.data.name)
      setGender(res.data.gender)
      setAddress(res.data.address)
      setContactNo(res.data.contactno)
      setInstitute(res.data.institute)
      setQulification(res.data.qulification)
      setSubject(res.data.subject)
      setEmail(res.data.email)
      setGrade(res.data.grade)
      }).catch(()=>{
        history.push(path);
        swal({title: "unauthorized",
        text: "Please Login First",
        icon: "warning"} ); 
    })
  }
    fetchUser();
  },[]);

  function updateData(e) {
    // e.preventDefault();
if(e!=null){
    const userupdate = {
      name,
      address,
      contactno,
      gender,  
      institute,
      qulification,
      subject,
      grade,
      email}

  axios.put(`http://localhost:8070/user/userupdate/${id}`,userupdate).then(()=>{


    swal({          
  title: "Success!",
  text: "Profile Successfully Updated",
  icon: "success",
  button: "Ok",
});history.push(path2);
    }).catch((e)=>{
       swal("Please fill Form correctly" +e);
      })}else{
        swal("Please fill Form correctly");
      }
  
};

  return(
    <>
    <br/>

<form className="needs-validation" noValidate>
        <div className="row g-2">
          <div className="col-md-6">
            <input type="text" className="form-control" {...register("name", { maxLength: 20 })} id="name" placeholder="Name" defaultValue={user.name}
              onChange={(e) => {setName(e.target.value);
              }} required/>
              {errors?.name?.type === "maxLength" && (<p>*Name cannot exceed 20 characters</p> )}
          </div>

          <div className="col-md-6">
                    <input type="number" {...register("contactno", { minLength:10, maxLength:12 })} className="form-control" id="contactno" placeholder="Contact Number" defaultValue={user.contactno}
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
            <input type="text" className="form-control" {...register("gender")} id="gender" placeholder="Gender" defaultValue={user.gender}
              onChange={(e) => {setGender(e.target.value);
              }} required/>
             
          </div>

          <div className="col-md-6">
                    <input type="text" className="form-control" id="institute" placeholder="Institute Name" defaultValue={user.institute}
                      onChange={(e) => {
                        setInstitute(e.target.value);
                      } } required/>
                  </div>
        </div>
        <br/>
        <div className="row g-2">
          <div className="col-md-6">
            <textarea rows="3" className="form-control" id="address" placeholder="Address" defaultValue={user.address}
              onChange={(e) => {setAddress(e.target.value);
              }} required/>
             
          </div>

          <div className="col-md-6">
                    <textarea className="form-control" rows="3" id="qulification" placeholder="Qulifications" defaultValue={user.qulification}
                      onChange={(e) => {
                        setQulification(e.target.value);
                      } } required/>
                  </div>
        </div>

        <br/>
        <div className="row g-2">
          <div className="col-md-6">
            <input type="text" className="form-control" id="subject" placeholder="Subjects" defaultValue={user.subject}
              onChange={(e) => {setSubject(e.target.value);
              }} required/>
             
          </div>

          <div className="col-md-6">
                    <input type="text" className="form-control" id="grade" placeholder="Grade" defaultValue={user.grade}
                      onChange={(e) => {
                        setGrade(e.target.value);
                      } } required/>
                  </div>
        </div>

        <br/>

        <div className="col-md-6">
                    <input type="text" className="form-control" {...register("email",{ pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/})} id="email" placeholder="Email Address" defaultValue={user.email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      } } required/>
                      {errors.email && (<p>*email format is Incorrect</p> )}
                  </div>

        <br/>

                    <button type="submit" onClick={handleSubmit((e) =>updateData(e))} className="btn btn-success" id="regsubmit">Submit</button>

      </form>
    </>
  )
}