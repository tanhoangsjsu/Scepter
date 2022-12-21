import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
const BackButton = () => {
    const style = { color: "black", fontSize: "1.5em"};
    const navigate = useNavigate()
    const handleBack =() =>{
        navigate("/homepage");
    }
    return ( 
        <div className="back-button-container">
        <IoMdArrowRoundBack 
            className="back-button" 
            size={35} 
            style={style} 
            onClick={handleBack}
        />
        </div>
    );
}
export default BackButton;