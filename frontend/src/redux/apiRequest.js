import axios from "axios"
import { 
        loginFailed, 
        loginStart, 
        loginSuccess, 
        registerFailed, 
        registerStart, 
        registerSuccess,
        logoutFailed,
        logoutStart,
        logoutSuccess,
    } from "./authSlice"
import { createRequest, deleteRequest, getRequest } from "./requestSlice";
import { baseURL } from "../utils/listContainer";
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//AUTH
export const loginUser = async ( user, dispatch, navigate)=>{
    dispatch(loginStart());
    try {
        const res = await axios.post(`${baseURL}/auth/login`, user);
        dispatch(loginSuccess(res.data))
        navigate("/homepage");
    } catch (error) {
        dispatch(loginFailed(error.response.data))
        console.log(error)
    }
}
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
      await axios.post(`${baseURL}/auth/register`, user);
      dispatch(registerSuccess());
      navigate("/login");
    } catch (err) {
      console.log(err.response.data);
      dispatch(registerFailed(err.response.data));
    }
  };
export const logOutUser = async (dispatch, userId, navigate) => {
    dispatch(logoutStart());
    try {
        await axios.post(`${baseURL}/auth/logout`, userId,
            );
        dispatch(logoutSuccess());
        navigate("/login");
    } catch (err) {
        dispatch(logoutFailed());
    }
};
//REQUEST 
export const makeRequest = async(request,dispatch) =>{
    try {
        const res = await axios.post(`${baseURL}/request/`,request)
        dispatch(createRequest(res.data))
    } catch (error) {
        console.log(error)
    }
}
export const getAllRequest = async (dispatch) => {
    try {
      const res = await axios.get(`${baseURL}/request/`);
      dispatch(getRequest(res.data));
      return res; // Return the response data
    } catch (error) {
      console.error("Error fetching requests:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

export const deleteOneRequest = async(dispatch,id) =>{
    try {
        const res = await axios.delete(`${baseURL}/request/`+id,{
        })
        dispatch(deleteRequest(res.data));
    } catch (error) {
        console.log(error)
    }
 }
