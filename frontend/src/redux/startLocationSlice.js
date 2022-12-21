import { createSlice } from "@reduxjs/toolkit";

const startLocationSlice = createSlice({
    name: "pickup",
    initialState:{
        longtitude: 0,
        lattitude:0,
    },
    reducers:{
        updateStartLongtitude:(state,action)=>{
            state.longtitude = action.payload
        },
        updateStartLatitude:(state,action)=>{
            state.lattitude = action.payload
        }
    }
})
export const {updateStartLongtitude, updateStartLatitude} = startLocationSlice.actions
export default startLocationSlice.reducer