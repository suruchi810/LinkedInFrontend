import { clientServer } from '@/config';
import {createAsyncThunk} from '@reduxjs/toolkit';
export const loginUser = createAsyncThunk(
    'user/login',
    async(user, thunkAPI) => {
        try {
           const response = await clientServer.post("/login", {
            email: user.email,
            password: user.password
           });
           if(response.data.token){
               localStorage.setItem("token", response.data.token);
           }else{
            return thunkAPI.rejectWithValue({
                message: "token is required"
            }); 
           }

           return thunkAPI.fulfillWithValue(response.data.token)
        }catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const registerUser = createAsyncThunk(
    'user/register',
    async (user, thunkAPI) => {
        try {
            const response = await clientServer.post("/register", {
                username: user.username,
                name: user.name,
                email: user.email,
                password: user.password,
            });

            return response.data; 
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getAboutUser = createAsyncThunk(
    'user/getAboutUser',
    async (user, thunkAPI) => {
        try {
            const response = await clientServer.get(`/get_usr_and_profile`, {
                params: {
                    token: user.token,
                }
            });
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async (_, thunkAPI) => {
        try {
            const response = await clientServer.get("/user/getAllUsersProfile");
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const sendConnectionRequest = createAsyncThunk(
    'user/sendConnectinRequest',
    async (user, thunkAPI) => {
        try {
            const response = await clientServer.post("/user/sendConnectionRequest", {
                token: user.token,
                connectionId: user.user_id
            });
            thunkAPI.dispatch(getConnectionRequest({ token: user.token }));
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Error sending request");
        }
    }
);

export const getConnectionRequest = createAsyncThunk(
    'user/getConnectionRequest',
    async (user, thunkAPI) => {
        try {
            const response = await clientServer.get("/user/getConnectionRequest", {
                params: {
                    token: user.token,
                }
            });
            return Array.isArray(response.data.connections) ? response.data.connections : [response.data.connections]; 
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getMyConnectionRequest = createAsyncThunk(
    'user/getMyConnectionRequest',
    async (user, thunkAPI) => {
        console.log(user.token)
        try {
            const response = await clientServer.get("/user/user_connection_request", {
                params: {
                    token: user.token,
                }
            });
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const AcceptConnection = createAsyncThunk(
    'user/accep_connection_request',
    async (user, thunkAPI) => {
        try {
            const response = await clientServer.post("/user/accep_connection_request", {
                token: user.token,
                requestId: user.connectionId,
                action_type: user.action,
            });
            thunkAPI.dispatch(getConnectionRequest({token: user.token}))
            thunkAPI.dispatch(getMyConnectionRequest({token:user.token}))
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)