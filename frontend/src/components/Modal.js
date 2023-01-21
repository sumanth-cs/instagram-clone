import React from 'react'
import { RiCloseLine } from "react-icons/ri";
import "../css/Modal.css"
import { useNavigate } from 'react-router-dom';

const Modal = ({ setModalOpen }) => {
    const navigate = useNavigate();
    return (
        <div className="darkBg" onClick={() => setModalOpen(false)}>
            <div className="centered">
                <div className='modal'>
                    <div className="modalHeader">
                        <h5 className='heading'>confirm</h5>
                    </div>
                    <button className="closeBtn" onClick={() => setModalOpen(false)}>
                        <RiCloseLine></RiCloseLine>
                    </button>

                    {/* modal content  */}
                    <div className="modalContent">
                        are you really want to log out
                    </div>
                    <div className="modalActions">
                        <div className="actionsContainer">
                            <button className="logoutBtn" onClick={()=>{setModalOpen(false);localStorage.clear();navigate("/login")}}>logout</button>
                            <button className="cancelBtn" onClick={() => setModalOpen(false)}>cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal