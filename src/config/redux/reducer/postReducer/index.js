import { createSlice } from "@reduxjs/toolkit"
import { getAllPosts, getAllComments } from "../../action/postAction";

const initialState = {
    posts: [],
    isError: false,
    postFetched: false,
    isLoading: false,
    loggedIn: false,
    message: "",
    comment: [],
    postId: "",
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        reset:() => initialState,
        resetPostId: (state) => {
            state.postId = "";
        },
    },
    extraReducers: (builder) =>{
        builder
        .addCase(getAllPosts.pending, (state) =>{
            state.message = "Fetching posts...";
            state.isLoading = true;
        })
        .addCase(getAllPosts.fulfilled, (state, action) =>{
            state.posts = action.payload.posts.reverse();
            state.isLoading = false;
            state.isError = false;
            state.postFetched = true;
        })
        .addCase(getAllPosts.rejected, (state, action) =>{
            state.message = action.payload;
            state.isLoading = false;
            state.isError = true;
        })
        .addCase(getAllComments.fulfilled, (state, action) => {
            state.postId = action.payload.post_id;
            state.comment = Array.isArray(action.payload.comments.comments) ? action.payload.comments.comments : [];
        })
        
    }
})
export const {resetPostId } = postSlice.actions;
export default postSlice.reducer
