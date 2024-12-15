import { createAsyncThunk, createSelector, nanoid ,createSlice,createEntityAdapter} from "@reduxjs/toolkit";
import axios from 'axios';

import {sub} from 'date-fns'
import { act } from "react";
const postsAdapter=createEntityAdapter({
    sortComparer:(a,b)=>b.date.localeCompare(a.date)
    
})

const initialState=postsAdapter.getInitialState({
   
    status:'idle',
    error:null,
    count:0
})
const POST_URL='https://jsonplaceholder.typicode.com/posts'; 



 export const addNewPost= createAsyncThunk('posts/adding',async(initialPost)=>{
    try {
        const response = await axios.post(POST_URL,initialPost);

        console.log(response)
       
        return response.data
      } catch (err) {
        return console(err.message)
      }
})
 export const fetchPosts= createAsyncThunk('posts/fetching',async()=>{
    try {
        const response = await axios.get(POST_URL);
    
        return [...response.data];
      } catch (err) {
        return console(err.message)
      }
})

export const updatePost=createAsyncThunk('posts/updatePost',async(initialPost)=>{
    const {id}=initialPost;
    // console.log(id)
    try{
        const response=await axios.put(`${POST_URL}/${id}`,initialPost)
        console.log(response)
        return response.data

    }
    catch(error){
        return initialPost
        
    }
})

export const deletePost= createAsyncThunk('posts/deletePost',async(initialPost)=>{
    const {id}=initialPost;
    try{
        const response= await axios.delete(`${POST_URL}/${id}`)
        if(response.status===200)return initialPost
        return `${response?.status}:${response?.statusText}`;

    }
    catch(err){
        console.log(err)
    }
})



 export const postsSlice=createSlice({
    name:'posts',
    initialState,
    reducers:{
        addPosts:{
            reducer(state,action){
                state.posts.push(action.payload)
            },
            prepare(title,content,userId){
                return {
                    payload:{
                        id:nanoid(),
                        title,
                        content,
                        userId,
                        date:new Date().toISOString(),
                        reactions:{
                            thumbsup:0,
                            wow:0,
                            heart:0,
                            rocket:0,
                            coffee:0
                        }
                    }
                }
            }
        },
        reactionAdded(state,action){
            const {postId,reaction}=action.payload 

            //this is BEFORE USING ENTITY ADAPTOR //
            
            // const existingPost=state.posts.find(post=>post.id===postId)

            // AFTER USING ADAPTOR
               const existingPost=state.entities[postId]

            if(existingPost){
                existingPost.reactions[reaction]++

            }

        },
        increseCount(state,action){
            // console.log(action.payload)
            let count=state.count
            const newState={...state,count:count+action.payload}
            return newState
        }


    },
    extraReducers(builder){
        builder
        .addCase(fetchPosts.pending,(state)=>{
            state.status='Loading'
        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
            state.status='succeeded'
            let min=1;
            const loadedPosts=action.payload.map(post=>{
                post.date=sub(new Date(),{minutes:min++}).toISOString();
                post.id=nanoid()
                post.reactions={
                    thumbsup:0,
                            wow:0,
                            heart:0,
                            rocket:0,
                            coffee:0

                }
                return post;
            })
            // Before using adaptorEntity👇
            // state.posts=state.posts.concat(loadedPosts)

            // ? After using EntityAdaptor 👇
            postsAdapter.upsertMany(state,loadedPosts);
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.status='failed'
            state.error=action.error.message

        })
        .addCase(addNewPost.fulfilled,(state,action)=>{
            console.log(action)
            action.payload.userId=Number(action.payload.userId)
            action.payload.date=new Date().toISOString();
            action.payload.reactions={
                thumbsup:0,
                wow:0,
                heart:0,
                rocket:0,
                coffee:0

            }
            console.log(action.payload)
           // Before using EntityAdaptor
            state.posts.push(action.payload)

            // After EntityAdaptor 
            postsAdapter.addOne(state,action.payload)

        })
        .addCase(updatePost.fulfilled,(state,action)=>{
            console.log(action.payload)
            if(!action.payload?.id){
                console.log('Update could not complete')
                console.log(action.payload)
                return;

            }
            const {id}=action.payload
            action.payload.date=new Date().toISOString()
            // Before entityAdaptor 

            // const posts= state.posts.filter(post=>post.id!==id)
            // state.posts=[...posts,action.payload];


            // After EnitityAdator

            postsAdapter.updateOne(state,{
                id,
                changes:action.payload
            })


        })
        .addCase(deletePost.fulfilled,(state,action)=>{
            if(!action.payload?.id){
                console.log('Delete could not complete')
                 console.log(action.payload)
                  return 
            }
            const {id}= action.payload;
            // Before the entityAdaptor

            // const posts=state.posts.filter(post=>post.id!==id)
            //  state.posts=posts;

            // After the entityAdaptor
            postsAdapter.removeOne(state,id)
        })
    }
    
})

// before EntityAdaptor
// getSeelector creates these selector and reanme them with aliese using destructuring.

export const {
    selectAll:selectAllPosts,
    selectById:getPostById,
    selectIds:selectPostIds,
    
}=postsAdapter.getSelectors(state=>state.posts)




// export const selectAllPosts= (state)=>state.posts.posts    // before entityAdator


export const getPostStatus= (state)=>state.posts.status
export const getPostsError= (state)=>state.posts.error



// this is happening before EnitityAdaptor
// export const getPostById=(state,postId)=>state.posts.posts.find(post=>post.id===postId)
// export const selectAllPosts= (state)=>state.posts.posts
export const {addPosts,reactionAdded,increseCount}=postsSlice.actions

export const selectPostByUser=createSelector(
    [selectAllPosts,(state,userId)=>userId],
    (posts,userId)=>posts.filter((post)=>post.userId===userId)
)
export default postsSlice.reducer;