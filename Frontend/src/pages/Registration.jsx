import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from '../assets/login.png'
import { useMutation } from "@tanstack/react-query";


const registerUser = async (formData) => {
  const response = await axios.post("http://localhost:5000/api/user/register-user", formData);
  return response.data;
};


function Registration() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  // React Query Mutation for handling registration
  const mutation = useMutation( {
    mutationFn: registerUser,
    onSuccess: () => {
      alert("Registration successful!");
      navigate("/login");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Registration failed!");
    },
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log("Form Data Submitted:", formData);

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    mutation.mutate({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

  };

  return (
    <div
      className="flex w-full bg-gray-900 items-center justify-center p-10 text-black min-h-screen bg-cover bg-center lg:bg-fixed"
         style={{backgroundImage: `url(${bgImage})`}}>


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
              name="username"
              placeholder="Username"
              className="w-full placeholder:text-gray-800 px-4 py-2 focus: outline-none"
              value={formData.username}
              onChange={handleChange}
              
            />
            <input 
            type="text" 
            placeholder="Email"
            name="email"
            className="w-full placeholder:text-gray-800 px-4 py-2 focus: outline-none"
            onChange={handleChange}
            value={formData.email}
             />
            <input 
            type="text" 
            placeholder="Password"
            name="password" 
            className="w-full placeholder:text-gray-800 px-4 py-2 focus: outline-none"
            onChange={handleChange}
            value={formData.password}
            />
            <input 
            type="text" 
            placeholder="Confirm Password"
            name="confirmPassword"
            className="w-full placeholder:text-gray-800 px-4 py-2 focus: outline-none"
            onChange={handleChange}
            value={formData.confirmPassword} 
            />
            
            <button
            className="bg-red-300 rounded-lg w-full text-center p-2"
            >
                {mutation.isLoading ? "Registering..." : "Register"}
            </button>
            <p>already a member? <a href="">Login</a></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
