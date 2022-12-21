import { createSlice } from "@reduxjs/toolkit";

const endLocationSlice = createSlice({
    name: "location",
    initialState:{
        longtitude: 0,
        lattitude:0,
    },
    reducers:{
        updateEndLongtitude:(state,action)=>{
            state.longtitude = action.payload
        },
        updateEndLatitude:(state,action)=>{
            state.lattitude = action.payload
        }
    }
})
export const {updateEndLongtitude, updateEndLatitude} = endLocationSlice.actions
export default endLocationSlice.reducer