// import React,{useState,useEffect} from "react";
// import "./AdminLogin.css";
// import { useNavigate } from "react-router";
// import axios  from 'axios'
// import { adminApi } from "../../../Store/Api";
// import {useDispatch} from "react-redux"
// import { AdminAction } from "../../../Store/AdminAuth";

// function AdminLogin() {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const [email,setEmail]=useState('')
//     const [password,setPassword] = useState('')
//     const [errorMessage,setErrorMessage]=useState('')
//     const [errMessage,setErrMessage]=useState('')
//     const [passwordIsValid, setPasswordIsValid] = useState(true);
//     const [emailIsValid, setEmailIsValid] = useState(true);
    
//     useEffect(()=>{setEmailIsValid(email.includes('@'))},[email])
//     useEffect(()=>{setPasswordIsValid(password.trim().length>3)},[password])
    
//     const submitHandler = (e) => {
//     e.preventDefault();
//     if(email === ''){
//         setErrMessage("Entered Email is Empty")
//     }else{
//         if(password === ''){
//             setErrorMessage("Password Field is Empty")
//         }else{
//             axios.post(`${adminApi}login`,{email,password},{withCredentials:true}).then((response)=>{
//                 const result = response.data.adminData
//                 console.log(result);
//                 if(result){
//                   console.log('ready');
//                     dispatch(AdminAction.AddAdmin({token:result.token}))
//                     navigate("/admin")
//                 }else{
//                     setErrMessage(result.message)
//                 }
//             })
//         }
//     }
//   };
//   return (
//     <div className="wrapper">
//       <div className="container mt-4">
//         <form action="" className="form-signin" onSubmit={submitHandler}>
//           <h2 className="form-heading text-center">Admin Login Form</h2>
//           <input
//             type="email"
//             className="form-control"
//             name="username"
//             placeholder="Email Address"
//             required=""
//             autoFocus=""
//             value={email}
//             onChange={(e)=>{setEmail(e.target.value) 
//             setErrMessage('')}}
//           />
//             {errMessage && <p style={{color:"red"}}>{errMessage}</p>}
//           <input
//             type="password"
//             className="form-control"
//             name="password"
//             placeholder="Password"
//             required=""
//             autoFocus=""
//             value={password}
//             onChange={(e)=>{setPassword(e.target.value)
//             setErrorMessage('')}}
//           />
//           {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}
//           <button type="submit" className="btn btn-lg btn-primary btn-block">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdminLogin;







import React, { useState, useEffect } from 'react';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { adminApi } from '../../../Store/Api';
import { useDispatch } from 'react-redux';
import { AdminAction } from '../../../Store/AdminAuth';

function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);

  useEffect(() => {
    setEmailIsValid(email.includes('@'));
  }, [email]);

  useEffect(() => {
    setPasswordIsValid(password.trim().length > 3);
  }, [password]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (email === '') {
      setErrMessage('Entered Email is Empty');
    } else {
      if (password === '') {
        setErrorMessage('Password Field is Empty');
      } else {
        axios
          .post(`${adminApi}/login`, { email, password }, { withCredentials: true })
          .then((response) => {
           
            const result = response.data.adminSignup;

          
            if (result.Status) {
              console.log('ready',result);
              dispatch(AdminAction.AddAdmin({ token: result.token}));
              navigate('/admin/adminhome');
              return; // Add this line to exit the function after navigation
            } else {
              setErrMessage(result.message);
            }
          });
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="container mt-4">
        <form action="" className="form-signin" onSubmit={submitHandler}>
          <h2 className="form-heading text-center">Admin Login Form</h2>
          <input
            type="email"
            className="form-control"
            name="username"
            placeholder="Email Address"
            required=""
            autoFocus=""
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrMessage('');
            }}
          />
          {errMessage && <p style={{ color: 'red' }}>{errMessage}</p>}
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            required=""
            autoFocus=""
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage('');
            }}
          />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button type="submit" className="btn btn-lg btn-primary btn-block">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;

