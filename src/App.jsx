
import './App.css'
import LoginForm from './Components/Login'
import { Routes, Route } from 'react-router-dom';
import SignupForm from './Components/Signup';
import Dashboard from './Components/Dashboard';
import UpdateProducts from './Components/UpdateProduct';
import CreateUser from './Components/CreateUser';

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/logout" element={<h1>User Logged Out Successfully !</h1>} /> */}
        <Route path="/dashboard/updateProducts" element={<UpdateProducts />} />
        <Route path="/dashboard/createUser" element={<CreateUser/>} />
      </Routes>
    </>
  );
}

export default App
