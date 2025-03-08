import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screens/Signup.js';
import MyOrder from './screens/MyOrder.js'
import VerifyOTP from './screens/VerifyOTP.js';
import { Cartprovider } from './components/ContextReducer.js';
import Profile from './screens/Profile.js';

function App() {
  return (
    <Cartprovider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createuser" element={<Signup />} />
            <Route path="/verifyotp" element={<VerifyOTP/>} /> 
            <Route path="/myOrder" element={<MyOrder/>} />
            <Route path="/myprofile" element={<Profile/>} /> 
          </Routes>
        </div>
      </Router>
    </Cartprovider>
  );
}

export default App;
