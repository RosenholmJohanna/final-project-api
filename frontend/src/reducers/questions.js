import { createSlice } from "@reduxjs/toolkit";

//from backend
const questions = createSlice({
    name:"questions", 
    initialState:{
        items: [],
        error: null,
    }, 
    reducers: {
        setItems: (store, action) => {
            store.items = action.payload;
        },
        setError: (store, action) => {
            store.error = action.payload;
        },
        
        // setIsCollected: (store, action) => {
        //     store.collected = action.payload;
        // }
        setUser: (store, action) => {
          store.user = action.payload;
        }
     }
});

export default questions;