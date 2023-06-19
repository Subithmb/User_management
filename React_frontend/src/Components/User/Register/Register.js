import React,{useState} from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import {userApi} from "../../../Store/Api"

function Register() {
    const [fname,setFname] = useState('')
    const [lname,setLname] = useState('')
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('')
    const [errorMessage,setErrorMessage]= useState('')
    const navigate = useNavigate()
    
    function validatePassword() {



      console.log(password.length);
      if(password.length>=6){
        if(password === confirmPassword){
            const user={
            fname,
            lname,
            email,
            password
            };
            console.log('Data submitted successfully');
            axios.post(`${userApi}signup`,user).then((response)=>{
              console.log(response.data);
              const result = response.data.userSignUp;
              if(result){
                navigate("/login");
                console.log('ready...',result);
              }else{
                setErrorMessage(result.message)
              }
            }).catch((error)=>{
              console.log(error);
            })
           
        }else{
          alert("Passwords do not match")
        }
      }else{
        alert('Password should be at least 6 characters long')
      }
    }
  const registerHandler = (e) => {
    e.preventDefault();
    validatePassword() 
 
  };
  return (
    <div className="register">
      <form className="form-a" onSubmit={registerHandler}>
        <p className="title">Register </p>
        <p className="message">Signup now and get full access to our app. </p>
        <div className="flex">
          <label>
              <span>Firstname</span>
            <input required="" 
            placeholder="" 
            value={fname} 
            onChange={(e)=>{setFname(e.target.value)}} 
            name="name" 
            type="text" 
            className="input" />
          </label>

          <label>
              <span>Lastname</span>
            <input required=""
             placeholder="" 
             value={lname}
             onChange={(e)=>{setLname(e.target.value)}}
             type="text" 
             className="input" />
          </label>
        </div>

        <label>
          <span>Email</span>  
          <input required="" 
          placeholder="" 
          name='email' 
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          type="email" 
          className="input" />
        </label>

        <label>
        <span>Password</span>
          <input required=""
           placeholder="" 
           type="password"
           value={password}
           onChange={(e)=>{setPassword(e.target.value)}} 
           className="input" />
        </label>
        <label>
            <span>Confirm password</span>
          <input required="" 
          placeholder="" 
          type="password" 
          value={confirmPassword}
          onChange={(e)=>{setConfirmPassword(e.target.value)}}
          className="input" />
        </label>
        <button className="submit">Submit</button>
        {errorMessage && <p style={{color:'red'}}>{errorMessage}</p>}

        <div className="signin">
          Already have an acount ? <p href="#">Signin</p>{" "}
        </div>
      </form>
    </div>
  );
}

export default Register;
