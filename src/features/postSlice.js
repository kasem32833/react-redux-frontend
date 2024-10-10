import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const API = "https://jsonplaceholder.typicode.com/users"

const initialState = {
    posts: [],
    isLoading: false,
    isSuccess: false,
    isError : false,
    message: ''

}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async( thunkAPI)=>{
    try {
        const response = await axios.get(API);
        return response.data;
    } catch (error) {
        const message =  (error.response && error.response.data && error.response.data.message) || error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
const postsSlice = createSlice({
    name: "posts",
    initialState,
    extraReducers: (builder)=>{
        builder
        .addCase(fetchPosts.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(fetchPosts.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.posts = action.payload;
            state.isSuccess = true;
        })
        .addCase(fetchPosts.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true,
            state.message = action.payload,
            state.posts = []
        })
    }
})

const postsReducer = postsSlice.reducer;
 export default postsReducer;
