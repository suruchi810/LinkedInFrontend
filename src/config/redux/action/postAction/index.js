import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllPosts = createAsyncThunk(
    "post/getAllPosts",
    async (_, thunkAPI) => {
        try {
            const response = await clientServer.get('/posts')
            return thunkAPI.fulfillWithValue(response.data)

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const createPost = createAsyncThunk(
    "post/createPost",
    async (userData, thunkAPI) => {
        const {file, body} = userData;

        try {
            const formData = new FormData();
            formData.append('token', localStorage.getItem('token'));
            formData.append('body', body);
            formData.append('media', file);

            const response = await clientServer.post('/post', formData, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            });

            if(response.status == 200){
                return thunkAPI.fulfillWithValue("Post Uploaded");
            }else{
                return thunkAPI.rejectWithValue("Error uploading post");
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data); 
        }
    }
)

export const deletePost = createAsyncThunk(
    "post/deletePost",
    async (post_id, thunkAPI) => {
        try {
            const response = await clientServer.delete(`deletePosts`, {
                data:{
                    token: localStorage.getItem('token'),
                    post_id: post_id.post_id,
                }
            });
            return thunkAPI.fulfillWithValue(response.data)
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const incrementLikes = createAsyncThunk(
    "post/incrementLikes",
    async (post, thunkAPI) => {
        try {
            const response = await clientServer.post(`/incLikes`, {
                data:{
                    token: localStorage.getItem('token'),
                    post_id: post.post_id,
                }
            });
            return thunkAPI.fulfillWithValue(response.data)
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const getAllComments = createAsyncThunk(
    "post/getAllComments",
    async (post_id, thunkAPI) => {
        try {
            const response = await clientServer.get(`/get_comments_by_posts`, {
                params:{
                    post_id: post_id.post_id,
                }
            });
            return thunkAPI.fulfillWithValue({
                comments: response.data,
                post_id: post_id.post_id,
            })
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const commentPost = createAsyncThunk(
    "post/commentPost",
    async (commentData, thunkAPI) => {
        try {
            const response = await clientServer.post(`/comments`, {
                    token: localStorage.getItem('token'),
                    post_id: commentData.post_id,
                    commentBody: commentData.body,
            });
            return thunkAPI.fulfillWithValue(response.data)
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)