import './App.css';
import LoginPage from './components/Login';
import SignUp from './components/SignUp';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './firebase/config';
import Home from './components/Home';
import Chat from './components/Chat';
import LandingPage from './components/LandingPage';
import ProtectedRoutes from './components/ProtectedRoutes';
import ProfilePage from './components/ProfilePage';


function App() {
  return (
   
    <Router>
        <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<SignUp/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route element={<ProtectedRoutes />}>
                <Route path="/homepage" element={<Home/>} />
                <Route path="/profile" element={<ProfilePage/>} />
                <Route path="/chat" element={<Chat/>} />
              </Route>
              <Route path="*" element={<p>There's nothing here: 404!</p>} />
        
            </Routes>

        </div>
        
    </Router>
    
  );
}

export default App;
