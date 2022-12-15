import { createSlice } from "@reduxjs/toolkit";

//from backend
const questions = createSlice({
    name:"questions",
    initialState:{
        items: [],
        error: null,
        collected: ''
    },
    reducers: {
        setItems: (store, action) => {
            store.items = action.payload;
        },
        setError: (store, action) => {
            store.error = action.payload;
        },
        setCollected: (store, action) => {
            store.collected = action.payload;
        }
    }
});

export default questions;