import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost, addPosts } from './postSlice';
import { SelectAllUsers } from '../users/userSlice';

function AddPosts() {
    const[post,setPost]=useState({
        title:'',
        content:'',
    });
    const [userId,setUserId]=useState()
    
    const users=useSelector(SelectAllUsers)

    const usersOption= users?.map((user)=>(
      <option key={user.id} value={user.id}>
        {user.name}

      </option>
    ))

const isSave= Boolean(post.title) && Boolean(post.content) && userId

const dispatch=useDispatch()
    function handleSubmit(e){
        e.preventDefault();

       if(Boolean(post.title && post.content)){
        dispatch(addNewPost({title:post.title,body:post.content,userId}))
        setPost({title:'',
          content:''
        })
       }else{
        alert('khaalio hai bhai')
       }


    }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={post.title}
        onChange={(e) => setPost((prev)=>({...prev, title:e.target.value}))}
          placeholder="Enter post title"
        />
      </div>
      <label htmlFor="Authname">
        <select value={userId} name="Authname" id="" onChange={(e)=>setUserId(e.target.value)}>
        {usersOption}
        </select>
      </label>
      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={post.content}
          onChange={(e) => setPost(prev=>({...prev,content:e.target.value}))}
          placeholder="Enter post content"
        />
      </div>
      <button className='button' type="submit" disabled={!isSave}>Add Post</button>
    </form>
  )
}

export default AddPosts