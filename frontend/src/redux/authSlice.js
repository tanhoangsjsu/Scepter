import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState:{
        login:{
            currentUser: null,
            isFetching: false,
            error: false,
            success: false,
            message: null,
        },
        register:{
            isFetching: false,
            error:false,
            success: false,
            message:null,
        },
        logout: {
            error: false,
            isFetching: false,
            success: false,
        },
    },
    reducers:{
        loginStart: (state) =>{
            state.login.isFetching = true
            state.login.success = false;
            state.login.error = false;
        },
        loginSuccess: (state, action)=>{
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.success = true;
            state.login.error = false;
        },
        loginFailed :(state, action)=>{
            state.login.isFetching = false;
            state.login.error = true;
            state.login.success = false;
            state.login.message = action.payload;
        },
        registerStart: (state) =>{
            state.register.isFetching = true
        },
        registerSuccess: (state)=>{
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = true;
        },
        registerFailed :(state, action)=>{
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
            state.register.message = action.payload;
        },
        logoutStart: (state) => {
            state.logout.isFetching = true;
        },
        logoutSuccess: (state) => {
            state.logout.isFetching = false;
            state.logout.currentUser= null;
            state.logout.error=false;
        },
        logoutFailed: (state) => {
            state.logout.isFetching = false;
            state.logout.error = true;
            state.logout.success = false;
        },
         // New action for Google login
        loginWithGoogle: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.success = true;
            state.login.error = false;
        },
        logoutWithGoogle: (state) => {
            // Set state properties to reflect a successful Google logout
            state.login.currentUser = null;
            state.login.success = false;
            // ...
        },
        resetAuthState :(state) => {
            state.login.currentUser = null;
            state.login.isFetching = false;
            state.login.error = false;
            state.login.success = false;
            state.login.message = null;
            // Reset other state properties as needed
        }
    }
});
export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
    loginWithGoogle,
    logoutWithGoogle,
    resetAuthState
} = authSlice.actions;
export default authSlice.reducer