import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from 'axios';


const USERS_URL='https://jsonplaceholder.typicode.com/users';


const initialState=[
];

export const fetchUsers= createAsyncThunk('users/fetching',async()=>{
    try {
        const response = await axios.get(USERS_URL);
       
        return [...response.data];
      } catch (err) {
        return console(err.message)
      }
})

const userSlice=createSlice({
    name:'user',
    initialState,
    reducer:{

    },
    extraReducers(builder){
        builder
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            return action.payload;

        })
    }
})


export const SelectAllUsers=(state)=>state.users
export const SelectUserById=((state,id)=>{
    return state.users.find((user)=>user.id===id)
})
// export {}=userSlice.actions
export default userSlice.reducer