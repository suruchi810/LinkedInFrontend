// steps for state manager 
// submic action
// handle action in its reducer 
// register here -> reducer
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import postsReducer from "./reducer/postReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer
    },
});
