// Replace "locationSlice.js" with your desired slice name, for example, "addressSlice.js"

import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
    name: "address", 
    initialState: {
        selectedFrom: null,
        selectedTo: null,
    },
    reducers: {
        setSelectedFrom: (state, action) => {
            state.selectedFrom = action.payload;
        },
        setSelectedTo: (state, action) => {
            state.selectedTo = action.payload;
        },
        // Add other address-related actions if needed
    }
});

export const {
    setSelectedFrom,
    setSelectedTo,
    // Add other action names here
} = addressSlice.actions;

export default addressSlice.reducer;
