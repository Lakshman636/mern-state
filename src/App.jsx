import{BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx';
import SignIn from './pages/Signin.jsx';
import SignUp from './pages/SignUp.jsx';
import About from './pages/About.jsx';
import Profile from './pages/Profile.jsx';
import Header from './components/Header.jsx';

export default function App() {
  return (
   <BrowserRouter>
   <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Sign-In" element={<SignIn />} />
      <Route path="/Sign-up" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      
    </Routes>
   </BrowserRouter>
  )
}
 