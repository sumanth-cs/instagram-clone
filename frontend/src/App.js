import './App.css';
import React, { useState } from "react"
import Navbar from './components/Navbar';
import {
  BrowserRouter, Routes, Route
} from "react-router-dom"
import Home from "./screens/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./screens/Profile";
import CreatePost from "./screens/CreatePost";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { LoginContext } from "./context/LoginContext";
import Modal from "./components/Modal"
import UserProfile from './components/UserProfile';
import MyFollowingPost from './screens/MyFollowingPost';

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{ setUserLogin, setModalOpen }}>
          <Navbar login={userLogin} />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route exact path="/profile" element={<Profile />}></Route>
            <Route path="/createPost" element={<CreatePost />}></Route>
            <Route path="/profile/:userid" element={<UserProfile />}></Route>
            <Route path="/followingpost" element={<MyFollowingPost />}></Route>
          </Routes>
          <ToastContainer theme='dark' />
          {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
