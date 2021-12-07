import React,{useEffect,useState} from "react";
import axios from "axios";
import { useHistory , useParams } from "react-router-dom";
import swal from "sweetalert";
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import jspdf from 'jspdf'
import "jspdf-autotable"
import { Link } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';

export default function Viewpayment(){

  let history = useHistory();
  let path = '/public/login';
  const {id} = useParams();

  const [searchTerm, setsearchTerm] = useState("");
  const [payment, setPayment] = useState([]);
  const [student, setStudent] = useState([]);

  useEffect(()=>{
    axios.get(`/student/getstudent/${id}`).then((res)=>{
    setStudent(res.data.student)
    }).catch((e)=>{
      alert("getstudent " +e); 
  })
}, [])

  useEffect(()=>{
    const getPayment = async()=>{
     const res = await axios.get(`/student/allpayment/${id}`).then((res)=>{
      setPayment(res.data);
      }).catch(()=>{
        history.push(path);
        swal({title: "unauthorized",
        text: "Please Login First",
        icon: "warning"} ); 
    })
    }
    getPayment();
  }, [])

  function addpayment(){
    history.push(`/user/addpayment/${id}`);
  }

  return(
    <>
    <br/>
    <div className="container">
    <br/>
      <center><h1 style={{fontFamily:"be vietnam" , fontSize:"30px" , fontWeight:"800"}}>{student.stname}'s Payment Details</h1></center>
      <br/>
      <input className="search" type="text" placeholder="Search" aria-label="Search"  
      onChange={(e) => {
          setsearchTerm(e.target.value)
      }}/>
      <br/>
      <div style={{padding:"5px"}}></div>
      <button className="btnregister" id="regsubmit" onClick={addpayment}>Add Payment</button>
      <br/><br/>
      <table className="table table-bordered table-hover">
          <thead>
            <tr>
                  <th>Payment Date</th>
                  <th>Month</th>
                  <th>Special Note</th>
            </tr>
          </thead>
          <tbody>
          {payment.filter(val=>{
                          if (searchTerm === ''){
                              return val;
                          } else if(
                              val.currentDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              val.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              val.note.toLowerCase().includes(searchTerm.toLowerCase()) 
                          ){
                              return val;
                          }
                      }).map((payment,key)=>(
                        <tr key={key}>
                            <td className="damfont">{payment.currentDate}</td>
                            <td className="damfont">{payment.month}</td>
                            <td className="damfont">{payment.note}</td>
                            <td>
                              {/* <Link to={"/student/updatestudent/" + payment._id}>
                          <IconButton aria-label="delete">
                         <EditIcon fontSize="small" color="primary"/> 
                         </IconButton></Link> */}
                         {/* <IconButton aria-label="delete"  onClick={() =>deleteStudent(payment._id)}>
                         <DeleteForeverIcon fontSize="small" color="secondary"/> 
                         </IconButton> */}
                         {/* <Link to={"/student/addstudent/" + classroom._id}><button className="btnregister" id="regsubmit">Add Student</button></Link> */}
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