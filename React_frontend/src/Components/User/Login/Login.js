import React,{useState} from "react"
import "./Login.css"
import axios from 'axios'
import { useNavigate } from "react-router";
import {userApi} from "../../../Store/Api"
import{ useDispatch} from 'react-redux'
import { UserActions } from "../../../Store/userAuth"; 


function Login() {
  const dispatch = useDispatch()
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [error,setError] = useState('')

    const navigate = useNavigate()
    const submitHandler=(e)=>{
      e.preventDefault();
      const user ={
        email,
        password
      }
      if(password.length>=6){
        console.log('enter...');
        axios.post(`${userApi}login`,user,{withCredentials:true}).then((response)=>{
          
          const result = response.data.userLogin
        
          if(result.Status){
           console.log(result.name);
            dispatch(UserActions.userAddDetails({name:result.name,token:result.token}))
           
           
            navigate('/')
          }else{
            setError(result.message)
            console.log(result.message);
          }
        }).catch((error)=>{
          console.log(error);
        })

      }else{
        alert("password at least have 6 characters")
      }
    }
  return (
    <div className="total">
      <div className="form-container">
        <p className="title">Signin</p>
        <form className="form" onSubmit={submitHandler}>
          <div className="input-group">
            <label htmlFor="username">Email</label>
            <input type="text" 
            name="email" 
            id="email" 
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder=""/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              placeholder=""
            />
            <div className="forgot">
              <p rel="noopener noreferrer" href="#">
                Forgot Password ?
              </p>
            </div>
          </div>
          <button className="sign mb-2">Sign in</button>
        </form>
        {error && <p style={{color:"red"}}>{error}</p>}

        <div className="social-message">
          <div className="line"></div>
          <p className="message">Login with social accounts</p>
          <div className="line"></div>
        </div>
        <div className="social-icons">
         
        </div>
        <p className="signup">
          Don't have an account?
          <p  rel="noopener noreferrer" href="#" className="backToSignin" onClick={()=>{navigate("/signup")}}>
            Sign up
          </p>
        </p>
      </div>
    </div>
  );
}

export default Login;
