import React, { useEffect, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { UserActions  } from "../../../Store/userAuth";
import { Button } from "react-bootstrap";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies(["jwt"]);
 const[userName,setUserName]=useState('')
  let user = useSelector((state) => state.user.useToken);
  
  let userDatas= useSelector((state) => state.user.userName);
  useEffect(()=>{

    setUserName(userDatas)
  },[])
console.log(userName);

console.log(userName);
  const UserLogout = () => {
    removeCookie("jwt");
    dispatch(UserActions.userLogout());
    navigate("/login");
  };
  // user = "subi";
  // userName = "subi";
  return (
    <header className="nav_header">
       <div>
       
       <img
         className="logo"
         src="https://img.freepik.com/premium-vector/bird-colorful-concept-illustration_84302-259.jpg?size=626&ext=jpg&ga=GA1.2.2004014413.1685858004&semt=ais"
         alt="logo"
       />
      
     <div>
     <Button  onClick={() => {
               navigate("/login");
             }} style={{ backgroundColor: "green", border: "none",fontWeight:'bold' ,justifyContent:"end",alignItems:'flex-end' }}>
              HOME
             </Button>
     </div>
     <div style={{padding:'0%',margin:'0%'}}>
     <img  onClick={(e) => {
               e.preventDefault();
               navigate("/profile");
             }} style={{height:"40px"}} src="https://tse3.mm.bing.net/th?id=OIP.PvaOWr5oV7Poj4Enmi_NxgHaHa&pid=Api&P=0&h=180" alt="profile" />
     </div >
     <div style={{paddingRight:'450px'}}>
         <p style={{ color: "green",fontWeight:'bold' ,width:'100px'}}>{userName}</p>
         </div>
     </div>
      <div className="heading-middle">
       
        <ul className="nav">
          {userName ? (
            <li onClick={UserLogout}>
              <Button style={{ backgroundColor: "red", border: "none",fontWeight:'bold' ,justifyContent:"end",alignItems:'flex-end' ,marginTop:'30px' }}>
                Logout
              </Button>
              
            </li>
          ) : (
            <li
              onClick={() => {
                navigate("/login");
              }}
            >
              <Button style={{ backgroundColor: "green", border: "none",fontWeight:'bold' }}>
                Login
              </Button>
            </li>
          )}
          {userName && 
            <li
              onClick={(e) => {
                e.preventDefault();
                navigate("/profile");
              }}
            >
            
               
            </li>
          }
        </ul>
      </div>
    </header>
  );
}

export default Header;
