import React, { useEffect, useState } from 'react'
import PostDetail from '../components/PostDetail'
import "../css/Profile.css"
import ProfilePic from '../components/ProfilePic'


const Profile = () => {
  let picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const [pic, setPic] = useState([])
  const [show, setShow] = useState(false)
  const [posts, setPosts] = useState([])
  const [changePic, setChangePic] = useState(false)
  const [user, setUser] = useState("")

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false)
    } else {
      setShow(true)
      setPosts(posts)
    }
  }

  const changeProfile = () => {
    if (changePic) {
      setChangePic(false)
    }
    else {
      setChangePic(true)
    }
  }

  useEffect(() => {
    fetch(`/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then((result) => {
        setPic(result.post)
        setUser(result.user)
      })
  }, [])

  return (
    <div className='profile'>
      {/* profile frame  */}
      <div className="profile_frame">
        {/* profile pic  */}
        <div className="profile_pic">
          <img src={user.Photo ? user.Photo : picLink} alt=""
          onClick={changeProfile}
          />
        </div>
        {/* profile data  */}
        <div className="profile_data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile_info" style={{ display: "flex" }}>
            <p>{pic ? pic.length : "0"} post</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
          </div>
        </div>
      </div>
      <hr style={{ width: "90%", opacity: "0.8", margin: "25px auto" }} />
      {/* gallery  */}
      <div className="gallery">
        {pic.map((pics) => {
          return <img key={pics._id} src={pics.photo} className="item" onClick={() => { toggleDetails(pics) }}></img>
        })}
      </div>
      {
        show &&
        <PostDetail item={posts} toggleDetails={toggleDetails} />
      }
      {
        changePic &&
        (
          <ProfilePic changeProfile={changeProfile} />
        )
      }
    </div>
  )
}

export default Profile