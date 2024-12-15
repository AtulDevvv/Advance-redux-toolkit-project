import React from 'react'
import {useSelector} from 'react-redux'
import {  SelectUserById } from './userSlice'
import {Link, useParams} from 'react-router-dom'
import { selectAllPosts, selectPostByUser } from '../post/postSlice'

function UserPage() {
    const {userId}=useParams()
    
      const user=useSelector((state)=>SelectUserById(state,Number(userId)))
    console.log(user)
    //   const postsForUser= useSelector(state=>{
    //     const allPosts=selectAllPosts(state)
    //     return allPosts.filter((post)=>post.userId===Number(userId))
    //   })

    // BY USING CATCHING FOR UNNECCESSERY RENDREING----->>>

     const postsForUser=useSelector(state=>selectPostByUser(state,Number(userId)))
 

      const postTitles= postsForUser.map((post)=>(
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>

        </li>
      ))
  return (
    <div>
        <h1>{user.name}</h1>
        {postTitles}
    </div>
  )
}

export default UserPage