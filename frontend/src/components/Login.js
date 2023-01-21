import React, { useState,useContext } from 'react'
import "../css/Login.css"
import logo from "../assests/instagram_logo.svg"
import { Link,useNavigate} from "react-router-dom"
import {  toast } from 'react-toastify';
import { LoginContext } from '../context/LoginContext';


const Login = () => {
  const {setUserLogin} = useContext(LoginContext);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();
  //Toast function
  const notifyA =(msg)=> toast.error(msg)
  const notifyB =(msg)=> toast.success(msg)

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData = () =>{
    //checking email
    if(!emailRegex.test(email)){
        notifyA("invalid email");
        return
    }

    //sending data to server
    fetch("/login",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:email,
            password:password
        })
    }).then(res => res.json())
    .then(data =>{
        if(data.error){
            notifyA(data.error);
        }else{
            notifyB("login successfully");
            console.log(data)
            localStorage.setItem("jwt",data.token);
            localStorage.setItem("user",JSON.stringify(data.user));
            setUserLogin(true)
            navigate("/");
        }
        console.log(data)})

}
  return (
    <div className='login'>
      <div>
        <div className="login_form">
          <img src={logo} alt="logo" className='login_logo' />
          <div>
            <input type="email" name='email' id='email' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div>
            <input type="password" name='password' id='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <input type="submit" value="login" id='login_btn' onClick={()=>{postData()}} />
        </div>
        <div className="login_form2">
          don't have an account?
          <Link to="/signup">
            <span style={{ color: "#1773EA", cursor: "pointer" }}> signup </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login