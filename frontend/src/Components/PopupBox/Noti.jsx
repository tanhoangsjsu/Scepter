import { useNavigate } from "react-router-dom";
import "../PopupBox/popup.css";
const Noti = (props) => {
  const { noti } = props;
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/homepage");
  };
  return (
    <div>
      {noti.map((data, key) => {
        return (
          <div className="noti-card" key={key}>
            <h2 className="noti-title">Pick up by</h2>
            <div className="noti-info">
              <p>
                Username:<span> {data.username}</span>{" "}
              </p>
              <p>
                Phone: <span> {data.dropoff} </span>
              </p>
              <p>
                Status:<span> Active</span>
              </p>
            </div>
            <div className="noti-button">
              <button onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Noti;
