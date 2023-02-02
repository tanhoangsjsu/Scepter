import "./profilepage.css"
import UserImage from "../../assest/Avatar.png"
import { useDispatch, useSelector } from "react-redux";
import Skills from "./Skills"
import Disabilities from "./Disabilities"
import BackButton from "../BackButton/BackButton"
import { io } from "socket.io-client"
import { logOutUser } from "../../redux/apiRequest"
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const socket = io('https://scepter.onrender.com:8000', {reconnect: true});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSignOut =()=>{
        logOutUser(dispatch, user.id, user.accessToken,navigate);
    }
    return (
    <>
        <BackButton/>
        <div className="profile-page">
            <div className="profile-page-header">
                <img className="profile-image" src={UserImage} alt="profile" />
                <h1 className="profile-name">{user.username}</h1>
            </div>
            <div className=".profile-details">
                <div className="profile-card"> My profile</div>
                {user.role === "assistance" ? <Skills /> : <Disabilities />}
                <div className="profile-card">Settings</div>
            </div>
            <div className="signout-button">
                <button className="account-signout" onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
    </>
    )
}
export default ProfilePage;