import React,{useContext}from 'react'
import { Link, useNavigate } from "react-router-dom"
import logo from "../assests/instagram_logo.svg";
import "../css/Navbar.css"
import { LoginContext } from '../context/LoginContext';


const Navbar = ({login}) => {
    const {setModalOpen} = useContext(LoginContext);
    const navigate = useNavigate();

    const loginStatus = () => {
        const token = localStorage.getItem("jwt");

        if (login || token) {
            return [
                <>
                    <Link to="/followingpost">
                        <li>my following </li>
                    </Link>
                    <Link to="/createPost">
                        <li>create post</li>
                    </Link>
                    <Link to="/profile">
                        <li>profile</li>
                    </Link>
                    <Link to={""}>
                        <button className="primaryBtn" onClick={()=>{setModalOpen(true)}}>logout</button>
                    </Link>

                </>
            ]
        }
        else {
            return [
                <>
                    <Link to="/login">
                        <li>Login</li>
                    </Link>

                    <Link to="/signup">
                        <li>Signup</li>
                    </Link>
                </>
            ]
        }
    }

    return (
        <div className='navbar'>
            <img src={logo} alt="logo" onClick={() =>{navigate("/")}}/>
            <ul className="nav_menu">
                {loginStatus()}
            </ul>
        </div>
    )
}

export default Navbar