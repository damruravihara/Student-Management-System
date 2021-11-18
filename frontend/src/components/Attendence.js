import React,{useEffect, useState} from "react";
import axios from "axios";
import { useHistory , useParams } from "react-router-dom";
import swal from "sweetalert";
import { Link } from "react-router-dom";


export default function Attendence(){

  let history = useHistory();
  let path = '/user/login';
  const {id} = useParams();

  const [searchTerm, setsearchTerm] = useState("");
  const [attendence, setAttendence] = useState([]);



  useEffect(()=>{
    const getAttendence = async()=>{
     const res = await axios.get(`/student/getattendence/${id}`).then((res)=>{
      setAttendence(res.data);
      }).catch(()=>{
        history.push(path);
        swal({title: "Unauthorized",
        text: "Please Login First",
        icon: "warning"} );
    })
    }
    getAttendence();
  }, []);

  function viewstudent(){
    axios.get(`/student/attendance/${id}`).then((res) => {
      // setAttendence(res.data);
          console.log(res.data)
          setTimeout(function(){
            window.location.reload();
           });
      })
  }

  function Attendencehistory(){
    history.push(`/student/historyatten/${id}`);
  }



  return(
    <>
              <br/>
    <div className="container">
    <br/>
      <center><h1 style={{fontFamily:"Arial,Helvetica,sans-serif" , fontSize:"30px" , fontWeight:"800"}}>Attendence</h1></center>
      <br/>
    <i class="fas fa-search" style={{padding: "30px"}} aria-hidden="true"></i>
      <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search Users by Nic No, Name, Role" aria-label="Search" 
      
      onChange={(e) => {
          setsearchTerm(e.target.value)
      }}/>
      <div className="reportbtn">
      <button type="button" className="btn btn-outline-info" onClick={() => viewstudent()}>View Students</button>
        </div>
        <br/>
          <button onClick={() => Attendencehistory()} className="btnregister" id="regsubmit">Attendence History</button>
        <br/>

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
                  <th>Student Name</th>
            </tr>
          </thead>
          <tbody>
          {attendence.filter(val=>{
                          if (searchTerm === ''){
                              return val;
                          } else if(
                              val.stname.toLowerCase().includes(searchTerm.toLowerCase())
                          ){
                              return val;
                          }
                      }).map((attendence,key)=>(
                        <tr key={key}>
                            <td className="damfont">{attendence.stname}</td>
                            <td>
                              {/* <Link to={"/student/updatestudent/" + student._id}>
                          <IconButton aria-label="delete">
                         <EditIcon fontSize="small" color="primary"/> 
                         </IconButton></Link> */}
                         {/* <IconButton aria-label="delete"  onClick={() =>deleteStudent(student._id)}>
                         <DeleteForeverIcon fontSize="small" color="secondary"/> 
                         </IconButton> */}
                         <Link to={"/student/mark/" +attendence._id}><button className="btnregister" id="regsubmit">Mark</button></Link>
                         </td>
                         
                        </tr>
                      ))}
          </tbody>
        </table>
        <br/>
    </div>
    </>
  )
}