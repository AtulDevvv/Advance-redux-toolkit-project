import { useDispatch } from "react-redux";

import { reactionAdded } from "./postSlice";

 const reactions={
    thumbsup:'👍',
    wow:"😲",
    heart:'💖',
    rocket:'🚀',
    coffee:'🍵'
}



function ReactionButtons({post}) {

    const dispatch=useDispatch()

     const reactionsButton= Object.entries(reactions).map(([name,emoji])=>(
        <button key={name} type="button" onClick={()=>dispatch(reactionAdded({postId:post.id,reaction:name}))}> {emoji} {post.reactions[name]}</button>
    ))
  return (
    <div style={{display:'flex' ,gap:'4px'}} >{reactionsButton}</div>
  )
}

export default ReactionButtons