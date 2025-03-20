import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaStar, FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";

const recipeDetails = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User is not authenticated");
  }

  console.log("here is the id", id);
  const { data } = await axios.get(
    `http://localhost:5000/api/recipe/get-recipe/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token
      },
    }
  );
  return data.data;
};

const RecipeDetail = () => {
  const { id } = useParams();

  console.log("Recipe ID:", id);

  const {
    data: recipe,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => recipeDetails(id),
    enabled: !!id,
  });

  if (error) return <p>Error: ${error.message}</p>;
  if (isLoading) return <p>Loading.......</p>;

  // console.log("recipe ///////////////////:", recipe.recipe.user);
  console.log("recipeImage=======================:", recipe);

  const nutritionData = recipe.nutrition;

  return (
    <div className="bg-gray-100 text-gray-900 p-5 max-w-6xl mx-auto">
      {/* Recipe Title */}
      <h2 className="text-2xl font-bold mb-4">{recipe.recipe.title}</h2>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Image & Author */}
        <div className="lg:col-span-2">
          <img
            src={recipe.recipe.image}
            alt="Recipe"
            className="w-full rounded-lg"
          />
          <div className="flex items-center gap-3 mt-4">
            <img src={recipe.recipe.user.image} alt="userImage"
            className="rounded-full w-15 h-15" 
            />
            <span className="font-medium">{recipe.recipe.user.username}</span>
            <div className="flex items-center text-yellow-500 text-sm">
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                  key={index}
                  className={
                    index < recipe.rating ? "text-yellow-500" : "text-gray-300"
                  }
                />
              ))}
              <span className="ml-1">({recipe.rating})</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{recipe.recipe.description}</p>
        </div>

        {/* Right Side - Nutrition Facts */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-3">Nutrition Facts</h3>

          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Calories</span> <span>{nutritionData.calaroies} Kcal</span>
            </li>
            <li className="flex justify-between">
              <span>Carbs</span> <span>{nutritionData.carbs} g</span>
            </li>
            <li className="flex justify-between">
              <span>Fats</span> <span>{nutritionData.fats} g</span>
            </li>
            <li className="flex justify-between">
              <span>Proteins</span> <span>{nutritionData.protien} g</span>
            </li>
            <li className="flex justify-between">
              <span>Sugar</span> <span>{nutritionData.sugar} g</span>
            </li>
            <li className="flex justify-between">
              <span>Dietary Fiber</span> <span>{nutritionData.dietry} g</span>
            </li>
            <li className="flex justify-between">
              <span>Sodium</span> <span>{nutritionData.sodium} mg</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Ingredients */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
        <p>{recipe.recipe.ingredients}</p>
      </div>

      {/* Cooking Notes */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Cooking Notes:</h3>
        <p>{recipe.recipe.cookingNotes}</p>
      </div>
      
    </div>
  );
};

export default RecipeDetail;
