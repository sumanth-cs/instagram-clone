import React, { useState, useEffect } from 'react'
import "../css/CreatePost.css"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [body, setBody] = useState("")
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("")

    const navigate = useNavigate();

    //Toast function
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)

    useEffect(() => {
        if (url) {
            //saving post to mongodb
            fetch("/createPost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    body,
                    pic: url
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        notifyA(data.error)
                    } else {
                        notifyB("successfully posted")
                        navigate("/")
                    }
                })
                .catch(err => console.log(err))
        }
    }, [url])


    //posting image to cloudinary
    const postDetails = () => {
        console.log(body, image)
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-cloud")
        data.append("cloud_name", "sumanthcloud2")
        fetch("https://api.cloudinary.com/v1_1/sumanthcloud2/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json())
            .then(data => setUrl(data.url))
            .catch(err => console.log(err))
    }

    const loadFile = (event) => {
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src) // free memory
        }
    };

    return (
        <div className='create_post'>
            {/* header  */}
            <div className="post_header">
                <h4 style={{ margin: "3px auto" }}>create new post</h4>
                <button id='post_btn' onClick={() => { postDetails() }}>share</button>
            </div>
            {/* image preview  */}
            <div className="main_div">
                <img id="output" src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png' />
                <input type="file" accept='image/*' onChange={(event) => { loadFile(event); setImage(event.target.files[0]) }} />
            </div>
            {/* details  */}
            <div className="details">
                <div className="card_header">
                    <div className="card_pic">
                        <img src="https://images.unsplash.com/photo-1673913817353-52d3bb7392a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
                    </div>
                    <h5>hero</h5>
                </div>
                <textarea type="text" value={body} onChange={(e) => { setBody(e.target.value) }} placeholder='write a caption'></textarea>
            </div>
        </div>
    )
}


export default CreatePost