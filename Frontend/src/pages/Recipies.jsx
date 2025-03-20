import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUser, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import r1 from "../assets/r1.png";
import r2 from "../assets/r2.png";
import r3 from "../assets/r3.png";
import r4 from "../assets/r4.png";
import r5 from "../assets/r5.png";
import r6 from "../assets/r6.png";

const fetchRecipes = async () => {
  const { data } = await axios.get(
    "http://localhost:5000/api/recipe/get-recipies"
  );
  return data.data;
};



const RecipesPage = () => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
  });

  if (isLoading) return <p>Loading.....</p>;
  if (error) return <p>Error: {error.message}</p>;
  // console.log("API Response:", data);
  // console.log("userInfo........", data[0].user.image)

  return (
    <div className="bg-gray-100 text-gray-900 p-5 max-w-6xl mx-auto">
      {/* Recipes Section */}
      <div className="flex justify-around w-full">
        <h2 className="text-2xl font-bold mt-3 ml-4 inline">RECIPES</h2>
        <div className="relative my-4">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border border-2xl border-gray-300 rounded-2xl w-xs placeholder:text-gray-300"
          />
          <FaSearch className="absolute top-3 right-3 text-gray-300" />
        </div>
      </div>

      {/* card section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {data.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
            onClick={() => navigate(`/recipe/${recipe._id}`)}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-70 object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold">{recipe.title}</h3>
              <div className="flex justify-between items-center gap-2 mt-2">


                <div className="flex justify-center align-center gap-2">
                  <img 
                  src={recipe.user.image} 
                  alt="userimage"
                  className="rounded-full w-15 h-15" />
                  <span className="text-gray-600 text-sm mt-4">{recipe.user.username}</span>
                </div>


                <button className="text-xs border-2 border-red-500 rounded-md py-1 px-4">
                  124 kcl
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;
