import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
    name:"tripInfo",
    initialState:{
        trip:{
            duration:0,
            distance:0,
            weight:0,
            weight_name:'',
            country_crossed:false,
        },
    },
    reducers:{
        updateMapData:(state,action)=>{
            state.trip = action.payload
        }
    }
})
export const {updateMapData} = mapSlice.actions;
export default mapSlice.reducer;