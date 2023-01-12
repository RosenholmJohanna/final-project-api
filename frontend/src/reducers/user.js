import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name:"user",
    initialState:{
        loggedInUser: localStorage.getItem('loggedInUser') 
        ? JSON.parse(localStorage.getItem('loggedInUser'))
        : null,
        error: null,
        username: null,
        role: null,
        userId: null,
        accessToken: null,
        collections: [],
    },
    reducers: {
        setloggedInUser: (store, action) => {
            store.loggedInUser = action.payload
            window.localStorage.setItem('loggedInUser', JSON.stringify(action.payload))
        },
        setUsername: (store, action) => {
            store.username = action.payload;
        },
        setRole: (store, action) => {
            store.role = action.payload;
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

