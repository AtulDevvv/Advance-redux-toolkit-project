import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SelectAllUsers } from '../users/userSlice'
import { getPostById ,updatePost} from './postSlice'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const {postId}=useParams();
    const post=useSelector((state)=>getPostById(state,(postId)))

    const dispatch=useDispatch();

    const navigate=useNavigate()

    const users=useSelector(SelectAllUsers)
    // console.log(postId)
   

    // console.log(post)

    if(!post){
        return (
            <section> Post not Found!</section>
        )
    }

    const [data,setData]=useState({
        title:post.title,
        content:post.body,
        userId:post.userId,

    })

    const [requestStatus,setRequestStatus]=useState('idle')

    const canSave= [data.title,data.content,data.userId].every(Boolean) && requestStatus==='idle';

    const handleSubmit=(e)=>{
      e.preventDefault();
      console.log(data)
    
        if(canSave){
           try{
            setRequestStatus('pending')
            console.log(data.userId)
            dispatch(updatePost({id:post.id,title:data.title,body:data.content,userId:Number(data.userId),reactions:post.reactions})).unwrap();

                setData({
                    title:'',
                    content:'',
                    userId:''
                })
                setRequestStatus('fulfilled')
                navigate(`/post/${postId}`)
           }
            
           catch(err){
            console.log(err)

               
           }
           finally{
            setRequestStatus('idle')
           }
        }
    }


    const usersOption=users.map((user)=>(
        <option key={user.id} value={user.id}>{user.name}</option>
    ))

  return (
    <div>
        <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={data.title}
        onChange={(e) => setData((prev)=>({...prev, title:e.target.value}))}
          placeholder="Enter post title"
        />
      </div>
      <label htmlFor="Authname">
        <select value={data.userId} name="Authname" id="" onChange={(e)=>setData(prev=>({...prev,userId:e.target.value}))}>
        {usersOption}
        </select>
      </label>
      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={data.content}
          onChange={(e) => setData(prev=>({...prev,content:e.target.value}))}
          placeholder="Enter post content"
        />
      </div>
      <button className='button' type="submit" disabled={!canSave}>Save post</button>
    </form>
    </div>
  )
}

export default EditPost