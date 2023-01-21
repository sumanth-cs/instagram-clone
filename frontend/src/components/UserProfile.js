import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../css/Profile.css"

const UserProfile = () => {
    const { userid } = useParams();
    const [user, setUser] = useState("")
    const [posts, setPosts] = useState([])
    const [isFollow, setIsFollow] = useState(false)
    let picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"

    //to follow user
    const followUser = (userId) => {
        fetch("/follow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userId
            })
        })
            .then((res) => { res.json() })
            .then((data) => {
                console.log(data)
                setIsFollow(true)

            })
    }

    //to unfollow user
    const unfollowUser = (userId) => {
        fetch("/unfollow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userId
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setIsFollow(false)
            })
    }

    useEffect(() => {

        fetch(`/user/${userid}`, {
            headers: {
                Authorization: "bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then((result) => {
                setUser(result.user)
                setPosts(result.post)
                if (result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)) {
                    setIsFollow(true)
                }
            })
    }, [isFollow])

    return (
        <div className='profile'>
            {/* profile frame  */}
            <div className="profile_frame">
                {/* profile pic  */}
                <div className="profile_pic">
                    <img src={user.Photo ? user.Photo : picLink} alt="" />
                </div>
                {/* profile data  */}
                <div className="profile_data">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                        <h1>{user.name}</h1>
                        <button className='follow_btn' onClick={() => {
                            if (isFollow) {
                                unfollowUser(user._id)
                            } else {
                                followUser(user._id)
                            }
                        }}> {isFollow ? "unfollow" : "follow"}
                        </button>
                    </div>
                    <div className="profile_info" style={{ display: "flex" }}>
                        <p>{posts.length} post </p>
                        <p>{user.followers ? user.followers.length : "0"} followers </p>
                        <p>{user.following ? user.following.length : "0"} following </p>
                    </div>
                </div>
            </div>
            <hr style={{ width: "90%", opacity: "0.8", margin: "25px auto" }} />
            {/* gallery  */}
            <div className="gallery">
                {posts.map((pics) => {
                    return <img key={pics._id} src={pics.photo} className="item"
                    //   onClick={() => { toggleDetails(pics) }}
                    ></img>
                })}
            </div>
            {/* {
        show &&
        <PostDetail item={posts} toggleDetails={toggleDetails}/>
      } */}
        </div>
    )
}

export default UserProfile