import React, { useState, useEffect,useRef } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import axios from 'axios'
import {adminApi }from "../../../Store/Api"
import "./AdminHome.css"

function AdminHome(e) {
  const inputRef=useRef(null)
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteUser, setDeleteUser] = useState(false);
 
  
  useEffect(()=>{
    axios.get(`${adminApi}alluser`,{withCredentials:true}).then((response)=>{
      console.log(response,'alluser');
      setUserData(response.data.userData)
     
    }).catch((error)=>{
      console.log(error);
    })
    
  },[deleteUser])
  
 

  const handleChange = (event) => {
    console.log(inputRef.current.value);
    setSearch(inputRef.current.value);
    setDeleteUser(false);

    const updatedData = userData.filter((item) =>
      item.fname.toLowerCase().includes(inputRef.current.value)
    );
    setUserData(updatedData)
   
  };


  const editUser = (UserId,firstName,lastName,userEmail) => {
    navigate('/admin/editUser',{state:{_id:UserId,firstName:firstName,lastName:lastName,email:userEmail}})
  };

   const DeleteUser = async(id) => {
    
    await axios.delete(`${adminApi}removeuser/${id}`,{withCredentials:true}).then((res)=>{ 

        if(res.status){

          setDeleteUser(!deleteUser)
      
        } })
        
       }

  
 

  return (
    <div className="table-wrapper">
      
      <div className="buttonclass">
     <div className="adduserClass">
     <Button onClick={() => navigate('/admin/adduser')} variant="success" > ADD-USER </Button>
    
      </div>
      <div className="search2">
        
        <input
          className="mt-5"
          type="text"
          placeholder="Search here"
          onChange={handleChange}
          value={search}
        />
      </div>

<div className="search2">



  <input
    className=""
    type="text"
    ref={inputRef}
    placeholder="Search here"
    onChange={handleChange}
    value={search}
  />
</div>
     </div>
    <div className="table">
    

      <Table className="mt-3 "  bordered >
        <thead style={{ color: "black" }}>
          <tr>
            <th>Sl.no</th>
            <th>Name</th>
            <th>L-Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete </th>
          </tr>
        </thead>
        <tbody className="values " style={{ color: "black" }}>
          {userData.map((obj, index) => {
            return (
              <tr key={obj._id}>
                <td style={{color:"black"}}>{index + 1}</td>
                <td>{obj.fname}</td>
                <td>{obj.lname}</td>
                <td>{obj.email}</td>
                <td>
                  <Button
                    onClick={() => editUser(obj._id, obj.fname,obj.lname, obj.email)}
                    variant="primary"
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button onClick={() => DeleteUser(obj._id)} variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
          </div>
  );
}

export default AdminHome;
