
import './App.css'
import LoginForm from './Components/Login'
import { Routes, Route } from 'react-router-dom';
import SignupForm from './Components/Signup';
import Dashboard from './Components/Dashboard';

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/Dashboard" element={<Dashboard/>} />
      </Routes>
    </>
  );
}

export default App
