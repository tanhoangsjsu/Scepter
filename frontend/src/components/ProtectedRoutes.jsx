import React from 'react'
import { useSelector } from 'react-redux'
import {Navigate, Outlet} from 'react-router-dom'
const ProtectedRoutes=()=> {
    const user = useSelector((state)=> state.auth.login.currentUser);
    const useAuth=()=>{
        if(user){
            return true
        } else {
            return false
        }
    }
    const auth = useAuth()
    return auth?<Outlet/>: <Navigate to="/login"/>

}

export default ProtectedRoutes