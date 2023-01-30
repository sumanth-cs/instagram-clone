import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import logo from "../assests/instagram_logo.svg";
import "../css/Navbar.css"
import { LoginContext } from '../context/LoginContext';


const Navbar = ({ login }) => {
    const { setModalOpen } = useContext(LoginContext);
    const navigate = useNavigate();

    const loginStatus = () => {
        const token = localStorage.getItem("jwt");

        if (login || token) {
            return [
                <>
                    <Link to="/followingpost">
                        <li><span class="material-symbols-outlined">
                            home
                        </span></li>
                    </Link>
                    <Link to="/createPost">
                        <li><span class="material-symbols-outlined">
                            add_circle
                        </span></li>
                    </Link>
                    <Link to="/profile">
                        <li><span class="material-symbols-outlined">
                            account_circle
                        </span></li>
                    </Link>
                    <Link to={""}>
                        <button className="primaryBtn" onClick={() => { setModalOpen(true) }}>logout</button>
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

    const loginStatusMobile = () => {
        const token = localStorage.getItem("jwt");

        if (login || token) {
            return [
                <>
                    <Link to="/">
                        <li>
                            <span class="material-symbols-outlined">
                                home
                            </span>
                        </li>
                    </Link>
                    <Link to="/followingpost">
                        <li>
                            <span class="material-symbols-outlined">
                                explore
                            </span>
                        </li>
                    </Link>
                    <Link to="/createPost">
                        <li>
                            <span class="material-symbols-outlined">
                                add_circle
                            </span>
                        </li>
                    </Link>
                    <Link to="/profile">
                        <li>
                            <span class="material-symbols-outlined">
                                account_circle
                            </span>
                        </li>
                    </Link>
                    <Link to={""}>
                        <li onClick={() => { setModalOpen(true) }}>
                            <span class="material-symbols-outlined">
                                logout
                            </span>
                        </li>
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
            <img src={logo} alt="logo" id='insta_logo' onClick={() => { navigate("/") }} />
            <ul className="nav_menu">
                {loginStatus()}
            </ul>
            <ul className="nav_mobile">
                {loginStatusMobile()}
            </ul>
        </div>
    )
}

export default Navbar