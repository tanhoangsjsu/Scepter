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
axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//AUTH
export const loginUser = async ( user, dispatch, navigate)=>{
    dispatch(loginStart());
    try {
        const res = await axios.post("v1/auth/login", user);
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
      await axios.post(`v1/auth/register`, user);
      dispatch(registerSuccess());
      navigate("/login");
    } catch (err) {
      console.log(err.response.data);
      dispatch(registerFailed(err.response.data));
    }
  };
export const logOutUser = async (dispatch, userId, accessToken,navigate) => {
    dispatch(logoutStart());
    try {
        await axios.post('v1/auth/logout', userId,
        {headers: {token: `Bearer ${accessToken}`}}
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
        const res = await axios.post('/v1/request/',request)
        dispatch(createRequest(res.data))
    } catch (error) {
        console.log(error)
    }
}
export const getAllRequest = async(dispatch,accessToken) =>{
    try {
        const res = await axios.get('/v1/request/',{headers: {token: `Bearer ${accessToken}`}})
        console.log(res.data)
        dispatch(getRequest(res.data))
    } catch (error) {
        console.log(error)
    }
}

export const deleteOneRequest = async(accessToken,dispatch,id) =>{
    try {
        const res = await axios.delete("/v1/request/"+id,{
            headers: {token : `Bearer ${accessToken}`}
        })
        dispatch(deleteRequest(res.data));
    } catch (error) {
        console.log(error)
    }
 }
