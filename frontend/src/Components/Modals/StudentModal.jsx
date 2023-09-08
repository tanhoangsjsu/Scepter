import "../Modals/modal.css";
import { useNavigate } from "react-router-dom";
import Car from "../../assest/Car.svg";
import Wheels from "../../assest/Wheels.svg";
import Text from "../../assest/Text.svg";
import UserImage from "../../assest/Avatar.png"
import { useSelector } from "react-redux";

const StudentModal = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);

  const handleclick = () => {
    navigate("/search");
  };

  const handleText = () => {
    alert("Feature not available in the Beta version!!!");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="action-items-container">
      <div className="header-container">
        <label className="logo">SCEPTER</label>
        <div className="profile-container">
          <div className="user-name">{user.username}</div>
          <img
            className="user-img"
            src={user.userImage || UserImage} // Use the default image if userImage is not available
            onClick={handleProfile}
            alt="User Profile"
          />
        </div>
      </div>

      <div className="action-buttons-container">
        <div className="action-button" onClick={handleclick}>
          <img src={Car} alt="Ride" />
          <h3>Ride</h3>
        </div>
        <div className="action-button" onClick={handleclick}>
          <img src={Wheels} alt="Wheels" />
          <h3>Wheels</h3>
        </div>
        <div className="action-button" onClick={handleText}>
          <img src={Text} alt="Text" />
          <h3>Text</h3>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;
