import React from 'react'
import { useSelector } from 'react-redux'
import { SelectAllUsers } from '../users/userSlice'



function PostAuthor({id}) {

    const users=useSelector(SelectAllUsers)
    const author=users.find((user)=>user.id===id)
  return (
    <div>
        <span>by {author?author.name:'Unknown author'}</span>
    </div>
  )
}

export default PostAuthor