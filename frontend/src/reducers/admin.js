import { createSlice } from "@reduxjs/toolkit";

const admin = createSlice({
    name:"admin",
    initialState:{
        error: null,
        adminname: null,
        adminId: null,
        accessToken: null,
        
    },
    reducers: {
        setAdminname: (store, action) => {
            store.adminname = action.payload;
        },
        setError: (store, action) => {
            store.error = action.payload;
        },
        setAdminId: (store, action) => {
            store.userId = action.payload;
        },
        setAccessToken: (store, action) => {
            store.accessToken = action.payload;
        }
    }
});

export default admin;