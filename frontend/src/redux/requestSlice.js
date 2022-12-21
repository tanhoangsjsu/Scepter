import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:"request",
    initialState:{
        requests: [
            {
                id:1,
                socketId:1,
                username:"",
                pickup:"",
                dropoff:"",
                isFetching:false,
                error:false,
            },
        ],
    },
    reducers:{
        createRequest:(state,action)=>{
            state.requests = [...state.requests,action.payload]
        },
        deleteRequest:(state,action)=>{
            // const nextRequest = state.requests.filter(request=> request.id !== action.payload.id)
            // state.requests = nextRequest
            state.requests.isFetching = false;
            state.requests = action.payload

        },
        updateRequest:(state,action)=>{
            state.requests = action.payload
        },
        getRequest:(state,action)=>{
            state.requests = action.payload
        }
    }
})

export const {createRequest, deleteRequest,updateRequest, getRequest} = requestSlice.actions;
export default requestSlice.reducer;