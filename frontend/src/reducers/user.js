import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name:"user",
    initialState:{
        error: null,
        username: null,
        userId: null,
        accessToken: null,
    },
    reducers: {
        setloggedInUser: (store, action) => {
            store.loggedInUser = action.payload
            window.localStorage.setItem('loggedInUser', JSON.stringify(action.payload))
        },
        setUsername: (store, action) => {
            store.username = action.payload;
        },
        setError: (store, action) => {
            store.error = action.payload;
        },
        setUserId: (store, action) => {
            store.userId = action.payload;
        },
        setAccessToken: (store, action) => {
            store.accessToken = action.payload;
        },
    }
});

export default user;

