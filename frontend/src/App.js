import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import LoginPage from './Components/LoginPage/Login';
import SignUp from './Components/SignUpPage/SignUp';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './Components/HomePage/HomePage';
import Search from './Components/Search/Search';
import Request from './Components/Request/Request';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import './firebase/config';
function App() {
  return (
  
    <Router>
        <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<SignUp/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route element={<ProtectedRoutes />}>
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/search" element={<Search />} />
                <Route path="/request" element={<Request />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              <Route path="*" element={<p>There's nothing here: 404!</p>} />
        
            </Routes>

        </div>
        
    </Router>
    
  );
}

export default App;
