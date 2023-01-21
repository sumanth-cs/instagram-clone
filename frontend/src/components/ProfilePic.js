import React, { useState, useEffect, useRef } from 'react'

const ProfilePic = ({ changeProfile }) => {
    const hiddenFileInput = useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click()
    }

    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    const postDetails = () => {
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

    const postPic = () => {
        //saving post to mongodb
        fetch("/uploadprofilepic", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                pic: url
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                changeProfile()
                window.location.reload()
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        if (image) {
            postDetails()
        }
    }, [image])

    useEffect(() => {
        if (url) {
            postPic()
        }
    }, [url])



    return (
        <div className='profile_pic darkBg'>
            <div className="changePic centered">
                <div>
                    <h2> change profile photo </h2>
                </div>
                <div style={{ borderTop: "1px solid #00000030" }}>
                    <button className='upload_btn' style={{ color: "#1EA1F7" }} onClick={handleClick}> upload photo </button>
                    <input type="file" accept='image/*' ref={hiddenFileInput} style={{ display: "none" }} onChange={(e) => { setImage(e.target.files[0]) }} />
                </div>
                <div style={{ borderTop: "1px solid #00000030" }}>
                    <button className="upload_btn" style={{ color: "#ED4956" }}
                    onClick={()=>{
                        setUrl(null)
                        postPic()
                    }}> remove current photo </button>
                </div>
                <div style={{ borderTop: "1px solid #00000030" }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "15px" }} onClick={changeProfile}> cancel </button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePic