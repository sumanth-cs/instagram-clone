import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../css/Home.css"
import { toast } from 'react-toastify';

const Home = () => {
  let picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("")
  const [show, setShow] = useState(false)
  const [item, setItem] = useState("")

  //Toast function
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if (!token) {
      navigate("/signup")
    }
    //fetching all post
    fetch("/allpost", {
      headers: {
        "Authorization": "bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => setData(result))
      .catch(error => console.log(error))
  }, [])

  // to show and hide comments 
  const toggleComments = (posts) => {
    if (show) {
      setShow(false)
    } else {
      setShow(true)
      setItem(posts)
    }
  }

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    })
      .then(res => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result
          }
          else {
            return posts
          }
        })
        setData(newData)
        console.log(result)
      })
  }
  const disLikePost = (id) => {
    fetch("/dislike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    })
      .then(res => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result
          }
          else {
            return posts
          }
        })
        setData(newData)
        console.log(result)
      })
  }

  //function to make comment
  const makeComment = (text, id) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      })
    })
      .then(res => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result
          }
          else {
            return posts
          }
        })
        setData(newData)
        setComment("")
        notifyB("comment posted")
      })
  }


  return (
    <div className='home'>
      {/* card */}
      {data.map((posts) => {
        return (
          <div className="card">
            {/* card header  */}
            <div className="card_header">
              <div className="card_pic">
                <img src={posts.postedBy.Photo ?posts.Photo :picLink} alt="profile-pic" />
              </div>
              <h5>
                <Link to={`/profile/${posts.postedBy._id}`}>
                  {posts.postedBy.name}
                </Link>
              </h5>
            </div>
            {/* card images */}
            <div className="card_image">
              <img src={posts.photo} alt="posts" />
            </div>
            {/* card content  */}
            <div className="card_content">
              {
                posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
                  ? (<span className="material-symbols-outlined material-symbols-outlined-red" onClick={() => { disLikePost(posts._id) }}>favorite </span>)
                  : (<span className="material-symbols-outlined" onClick={() => { likePost(posts._id) }}>favorite </span>)
              }

              <p>{posts.likes.length} Like</p>
              <p>{posts.body}</p>
              <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => { toggleComments(posts) }}>view all comments</p>
            </div>
            {/* add comment  */}
            <div className="add_comment">
              <span className="material-symbols-outlined">
                mood
              </span>
              <input type="text" placeholder='add a comment' value={comment} onChange={(e) => { setComment(e.target.value) }} />
              <button className='comment' onClick={() => { makeComment(comment, posts._id) }}> post </button>
            </div>
          </div>
        )
      })}

      {/* show comments   */}
      {
        show && (
          <div className="show_comment">
            <div className="container">
              <div className="post_pic">
                <img src={item.photo} alt="" />
              </div>
              <div className="details">
                {/* card header  */}
                <div className="card_header" style={{ borderBottom: "1px solid #00000029" }}>
                  <div className="card_pic">
                    <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="profile-pic" />
                  </div>
                  <h5>{item.postedBy.name}</h5>
                </div>
                {/* comment section  */}
                <div className="comment_section" style={{ borderBottom: "1px solid #00000029" }}>
                  {
                    item.comments.map((comment) => {
                      return (<p className='comm'>
                        <span className='commenter' style={{ fontWeight: "bolder" }}>
                          {comment.postedBy.name}{" "} </span>
                        <span className='comment_text'>{comment.comment}</span>
                      </p>)
                    })
                  }
                </div>
                {/* card content  */}
                <div className="card_content">
                  <p>{item.likes.length} Like</p>
                  <p>{item.body}</p>
                </div>
                {/* add comment  */}
                <div className="add_comment">
                  <span className="material-symbols-outlined">
                    mood
                  </span>
                  <input type="text" placeholder='add a comment' value={comment} onChange={(e) => { setComment(e.target.value) }} />
                  <button className='comment'
                    onClick={() => { makeComment(comment, item._id); toggleComments() }}
                  > post </button>
                </div>
              </div>
            </div>
            <div className="close_comment" onClick={() => { toggleComments() }}>
              <span className="material-symbols-outlined material-symbols-outlined-comment" >
                close
              </span>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Home