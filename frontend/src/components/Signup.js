import React, { useState } from 'react'
import logo from "../assests/instagram_logo.svg"
import "../css/Signup.css";
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

const Signup = () => {
    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    //Toast function
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    // IwiCcR!7fOdIiNkE?6 - test3 password

    const postData = () => {
        //checking email
        if (!emailRegex.test(email)) {
            notifyA("invalid email");
            return
        }
        else if (!passRegex.test(password)) {
            notifyA("Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!")
            return
        }

        //sending data to server
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                userName: userName,
                email: email,
                password: password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    notifyA(data.error);
                } else {
                    notifyB(data.message)
                    navigate("/login")
                }
                console.log(data)
            })
    }

    return (
        <div className="signup">
            <div className="form_container">
                <div className="form">
                    <img src={logo} alt="logo" className='signup_logo' />
                    <p className="login_para">
                        signup to connect to your friends
                    </p>
                    <div>
                        <input type="text" name='name' id='name' placeholder='full name' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <input type="text" name='username' id='username' placeholder='username' value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div>
                        <input type="email" name='email' id='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <input type="password" name='password' id='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <p className="login_para" style={{ fontSize: "12px", margin: "3px 0px" }}>
                        by signing up,you agree to our terms and policies.
                    </p>
                    <input type="submit" id='submit-btn' value="signup" onClick={() => { postData() }} />
                </div>

                <div className="form2">
                    already have an account?
                    <Link to="/login">
                        <span style={{ color: "#1773EA", cursor: "pointer" }}> login </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signup