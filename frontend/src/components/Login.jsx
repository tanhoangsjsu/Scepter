import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css"
import { loginUser  } from "../redux/apiRequest";
import { loginWithGoogle } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import {  provider } from "../firebase/config";
import { signInWithPopup, getAuth } from "firebase/auth";
import {  
    loginStart, 
    resetAuthState 
} from "../redux/authSlice"
import Loading from "./Loading";

const LoginPage = () => {
    const error = useSelector((state) => state.auth.login.message);
    const loading = useSelector((state) => state.auth.login?.isFetching);
    const [userName, setUserName] = useState('username')
    const [password, setPassword] = useState('password')
    const [fieldError, setFieldError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(resetAuthState());
    }, [dispatch]);
    const handleLogin = async (e) =>{
        e.preventDefault();
        if(userName.length ===0 || password.length===0){
            setFieldError("Please enter both username and password.");
        }
        else{
            const newUser = {
                username: userName,
                password: password,
                // socketId: socket.id,
            };
            dispatch(loginStart()); // Manually reset loading state
            
            loginUser(newUser,dispatch, navigate)
            // socket.emit("Login",userName)
        }
    }
    const auth = getAuth();
    const handleLoginWithGoogle = async () => {
        try {
          const result = await signInWithPopup(auth, provider);
          if (result.user) {
            // You can customize the data structure you want to store in Redux.
            const userData = {
              uid: result.user.uid,
              username: result.user.displayName,
              email: result.user.email,
              role: 'student',
              userImage : result.user.photoURL,
              // Add other user data you want to store
            };
            // Dispatch an action to store the user data in Redux
            dispatch(loginWithGoogle(userData));
            navigate("/homepage"); // Redirect to the homepage
          }
        } catch (error) {
          console.error("Google login error:", error);
        }
      };
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
        <Button className="login-submit-button" type="submit">
            <Loading
            loadingType="SyncLoader"
            color="#777777"
            loading={loading}
            size="10px"
            />
        </Button>
        ) : (
            <Button
                onClick={handleLogin}
                type="submit"
                sx={{
                    cursor: 'pointer',
                    alignSelf: 'center',
                    marginTop: '1rem',
                    borderRadius: '10px',
                    fontFamily: 'Sora',
                    fontStyle: 'normal',
                    fontWeight: 800,
                    fontSize: '10px',
                    padding: '.75rem',
                    color: '#777777',
                    backgroundColor: '#55EEDD',
                }}
                >
                Continue
                </Button>
        )}
        </form>
        {error && <p className="loginError"> {error} </p>}
        <div className ="login-register">Don't have an account yet?</div>
        <Link className="login-register-link" to="/register">Register Now</Link>
        <div className ="login-register-google">or login as a student with</div>
        <Button 
            className="login-google-button"
            startIcon={<GoogleIcon style={{ marginLeft: '10px' }} />} 
            onClick={handleLoginWithGoogle}
            color="error"
        >
        </Button>
        </div>
       
    </section>
    );
}
export default LoginPage;