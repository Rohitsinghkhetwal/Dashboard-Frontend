import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import Dashboard from "./Dashboard";

const LoginForm = () => {

    const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
 
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try{
        setIsSubmitting(true);
        let result = await fetch("http://localhost:7800/api/v1/users/login", {
            method: "post",
            body: JSON.stringify({email, password}),
            headers: {
                "Content-type": "application/json"
            }
        });
        result = await result.json();
        setData(result);
        console.log("This is the data from result api", result);
        if(result.token){
            localStorage.setItem("users", JSON.stringify(result.user))
            localStorage.setItem("token", JSON.stringify(result.token))
            navigate("Dashboard");
        }else {
            navigate("/");
        }
        
    }catch(err){
        setError("Login failed Please try again !")

    }finally{
        setIsSubmitting(false);
    }   
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-[10px] shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <Link to="signup">
          <h5 className="mt-2 mx-4 text-center text-[14px] text-slate-500">
            If you didn't have account Login here
          </h5>
        </Link>
      </div>
     
    </div>
  );
};

export default LoginForm;
