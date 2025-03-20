import React, { useState } from "react";
import bgImage from '../assets/login.png'
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const loginUser = async(userData)=>{
  const response = await axios.post(`http://localhost:5000/api/user/login-user`, userData)
  return response.data
}

function Login() {

  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data)=>{
      localStorage.setItem("token", data.token);
      alert("Login SuccessFull..");
      navigate('/');
    },
    onError: (error)=>{
      alert(error.response?.data?.message || "Login user failed")
    }
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData); // Call API
  };




  return (
    <div
      className="flex w-full bg-gray-900 items-center justify-center p-10
         text-black min-h-screen bg-cover bg-center lg:bg-fixed"
         style={{backgroundImage: `url(${bgImage})`}}
    >
      <div className="p-10 text-center ">
        <h1 className="font-bold text-2xl">Registration Page</h1>
        <p className="text-xs font-bold">Over <span className="text-white">5000k</span> Recipes from the world</p>

        <div  className="text-black flex flex-col bg-white shadow-lg 
        rounded-4xl p-15 mt-4 w-xl h-auto">
          <form
            action=""
            className="space-y-10"
            onSubmit={handleSubmit}
          >
            
            <input 
            type="text" 
            placeholder="username/Email"
            className="w-full placeholder:text-gray-800 px-4 py-2 focus: outline-none
            "
            name="email"
            onChange={handleChange}
             />
            <input 
            type="text" 
            placeholder="Password" 
            className="w-full placeholder:text-gray-800 px-4 py-2 focus: outline-none
            "
            name="password"
            onChange={handleChange}
            />

            <p><a href="">forgot password?</a></p>
           
            
            <button
            className="bg-red-300 rounded-lg w-full text-center p-2"
            >
                Login
            </button>
            <p>don't have account?? <a href="">Registration</a></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
