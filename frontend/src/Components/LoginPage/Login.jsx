import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./login.css"
import { loginUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client"
import Loading from "../Loading/Loading";
const LoginPage = () => {
    const error = useSelector((state) => state.auth.login.message);
    const loading = useSelector((state) => state.auth.login?.isFetching);
    const [userName, setUserName] = useState('username')
    const [password, setPassword] = useState('password')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const socket = io('https://scepter.onrender.com:8000', {reconnect: true});
    const handleLogin = (e) =>{
        e.preventDefault();
        if(userName.length ===0 || password.length===0){
            alert("Please enter all the field")
        }
        else{
            const newUser = {
                username: userName,
                password: password,
                socketId: socket.id,
            };
            loginUser(newUser,dispatch, navigate)
            socket.emit("Login",userName)
        }
    }
    return ( 
    <section className ="login-container">
    <div className="login-title"> LOG IN </div>
    <div className="login-input">
        <form>
        <label className="username-label"> USERNAME </label>
        <input
            className="login-username"
            id="username"
            name="username"
            type="text"
            placeholder="Enter username"
            onChange={(e)=> setUserName(e.target.value)}
            />
    
        <label className="password-label"> PASSWORD </label>
        <input
            className="login-password"
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={(e)=> setPassword(e.target.value)}
        />
        {loading ? (
        <button type="submit">
            <Loading
            loadingType="HashLoader"
            color="#777777"
            loading={loading}
            size="30px"
            />
        </button>
        ) : (
            <button onClick={handleLogin} type="submit"> Continue </button>
        )}
        </form>
        {error && <p className="loginError"> {error} </p>}
        <div className ="login-register">Don't have an account yet?</div>
        <Link className="login-register-link" to="/register">Register Now</Link>
        </div>
    </section>
    );
}
export default LoginPage;