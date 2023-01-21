import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../css/PostDetail.css"
import {  toast } from 'react-toastify';



const PostDetail = ({ item, toggleDetails }) => {
  const navigate = useNavigate();
  //Toast function
  const notifyA =(msg)=> toast.error(msg)
  const notifyB =(msg)=> toast.success(msg)

  const removePost = (postId) => {
    if (window.confirm("Do you really want to delete this post?")) {

      fetch(`/deletepost/${postId}`, {
        method: "delete",
        headers: {
          Authorization: "bearer " + localStorage.getItem("jwt")
        },
      })
        .then((res) => { res.json() })
        .then(result => {
          console.log(result)
          toggleDetails()
          navigate("/")
          notifyB("post deleted successfully")
        })
    }
  }

  return (
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
            <div className="delete_post" onClick={() => { removePost(item._id) }}>
              <span className="material-symbols-outlined">
                delete
              </span>
            </div>

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
            <input type="text" placeholder='add a comment'
            //   value={comment} 
            //   onChange={(e) => { setComment(e.target.value) }} 
            />
            <button className='comment'
            //   onClick={() => { makeComment(comment, item._id);toggleComments() }}
            > post </button>
          </div>
        </div>
      </div>
      <div className="close_comment" onClick={() => { toggleDetails() }}>
        <span className="material-symbols-outlined material-symbols-outlined-comment" >
          close
        </span>
      </div>
    </div>
  )
}

export default PostDetail