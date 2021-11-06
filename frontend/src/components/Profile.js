import React,{useState,useEffect} from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom"; 


const Profile = props=>{

  let history = useHistory();
  let path = '/user/login';

  const [user, setUser] = useState([]);

  useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await axios.get('/user/userprofile').then((res)=>{
      setUser(res.data);
      }).catch(()=>{
        history.push(path);
        swal({title: "unauthorized",
        text: "Please Login First",
        icon: "warning"} ); 
    })
  }
    fetchUser();
  },[]);

  return(
    <>
    <br/>
    <div className="container">
    <div className="border border-primary">
      <br/>

      <table className="table">
        <tbody>
          <tr>
            <td>Name</td>
            <td>{user.name}</td>
          </tr>

          <tr>
            <td>Address</td>
            <td>{user.address}</td>
          </tr>

          <tr>
            <td>Contact Number</td>
            <td>{user.contactno}</td>
          </tr>

          <tr>
            <td>Gender</td>
            <td>{user.gender}</td>
          </tr>

          <tr>
            <td>Institute</td>
            <td>{user.institute}</td>
          </tr>

          <tr>
            <td>Qulification</td>
            <td>{user.qulification}</td>
          </tr>

          <tr>
            <td>Subject</td>
            <td>{user.subject}</td>
          </tr>

          <tr>
            <td>Grade</td>
            <td>{user.grade}</td>
          </tr>

          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
    </>
  )
}

export default Profile;