import { createSlice } from "@reduxjs/toolkit";
import { getAboutUser, getAllUsers, getConnectionRequest, loginUser, registerUser, getMyConnectionRequest } from "../../action/authAction"; // Ensure these are imported correctly

const initialState = {
    user: undefined,
    isError: false,
    isSuccess: false,
    isLoading: false,
    isLoggedIn: false,
    message: "",
    isTokenThere: false,
    profileFetched: false,
    connections: [],
    connectionRequest: [],
    all_users:[],
    all_profile_fetched: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: { // FIX: changed 'reducer' to 'reducers'
        reset: () => initialState,
        handleLoginUser: (state) => {
            state.message = "hello";
        },
        emptyMessage:(state) =>{
            state.message = "";
        },
        setTokenIsThere: (state) => {
            state.isTokenThere = true;
        },
        setTokenIsNotThere: (state) => {
            state.isTokenThere = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.message = "knocking on the door...";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.isError = false;
                state.isSuccess = true;
                state.message = "Login is successful";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(registerUser.pending, (state, action) => {
                state.isLoading = true;
                state.message = "Registering the user...";
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.isError = false;
                state.isSuccess = true;
                state.message = {
                    message : "Registration is successful, please login"
                };
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAboutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.profileFetched = true;
                state.user = action.payload;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.all_profile_fetched = true;
                state.all_users = action.payload;
            })
            .addCase(getConnectionRequest.fulfilled, (state, action) => {
                state.connections = action.payload; 
            })            
            .addCase(getConnectionRequest.rejected, (state, action) => {
                state.message = action.payload;
            })
            .addCase(getMyConnectionRequest.fulfilled, (state, action) => {
                state.connectionRequest = action.payload;
            })
            .addCase(getMyConnectionRequest.rejected, (state, action) => {
                state.message = action.payload;
            });

    }
});

export default authSlice.reducer;
export const { reset, handleLoginUser, emptyMessage, setTokenIsNotThere, setTokenIsThere } = authSlice.actions; // Export actions
