import { useNavigate } from "react-router-dom";
import phoneMockup from "../assest/PhoneMockup.png"
import { Button } from '@mui/material';
import '../App.css';

const LandingPage = () => {
    const navigate = useNavigate();
    const goToSignIn = () => {
      navigate("/login");
    };
    const goToSignUp = () => {
      navigate("/register");
    };
    return (  
    <section className="landing-container">
        <div className="landing-header"> SCEPTER</div>
        <span className="beta"> Beta </span>
        <div className="landing-sub"> Designed to help SJSU student</div>
        <img src={phoneMockup} className="phone-mockup" alt="phone mockup" />
        <div className="button-container">
            <Button 
                className="login" 
                onClick={goToSignIn}
                sx={{
                    backgroundColor: '#55EEDD', // Background color
                    color: '#777777',          // Text color
                    borderRadius: '14px',      // Border radius
                    fontFamily: 'Sora, sans-serif', // Font family
                    fontWeight:'extra-bold',
                    padding: '8px 15px',       // Padding
                    width: '90px',            // Button width
                    height: '50px',            // Button height
                    fontSize: '12px',          // Font size
                    marginBottom:'12px',
                  }}
            >
            Sign in
            </Button>
            <Button 
                  className="register" 
                  onClick={goToSignUp}
                  sx={{
                      backgroundColor: '#55EEDD',
                      color: '#777777',
                      borderRadius: '14px',
                      fontFamily: 'Sora, sans-serif',
                      padding: '8px 15px',
                      width: '90px',            // Button width
                      height: '50px',
                      fontSize: '12px',
                    }}
            >
            Sign up
            </Button>
        </div>
    </section>
    );
}
export default LandingPage
