import "../HomePage/homepage.css"
import Map from "../Map/Map";
import StudentModal from "../Modals/StudentModal";
import AssistanceModal from "../Modals/AssistanceModal";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state)=> state.auth.login.currentUser);
  const isStudent = user && user.role === 'student';

  return ( 
    <>
    <div className ="home-container">
      <Map/>
      {isStudent ? <StudentModal/>: <AssistanceModal/>}
    </div>
    </>
  );
}
export default HomePage;