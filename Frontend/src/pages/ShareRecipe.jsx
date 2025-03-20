import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const createRecipe = async (formData) => {

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User is not authenticated");
  }

  const response = await axios.post("http://localhost:5000/api/recipe/create-recipe", formData, {
    
      headers: {
        Authorization: `Bearer ${token}`, // Attach token
         "Content-Type": "multipart/form-data"
      },
    
  });
  return response.data;
};



const ShareRecipe = () => {

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    ingredients: "",
    cookingNotes: "",
  });

  // Mutation for submitting recipe
  const mutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      alert("Recipe added successfully!");
      setFormData({ title: "", image: null, description: "", ingredients: "", cookingNotes: "" }); // Reset form
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Error submitting recipe!");
    },
  });

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("image", formData.image);
    data.append("description", formData.description);
    data.append("ingredients", formData.ingredients);
    data.append("cookingNotes", formData.cookingNotes);

    mutation.mutate(data);
  };

  // console.log(formData.title, formData.image, formData.description, formData.ingredients, formData.notes);

  return (
    <div
      className="bg-white text-gray-900 p-5 w-screen 
    flex flex-col items-center mx-auto"
    >
      <div className="flex justify-around w-full">
        <h2 className="text-2xl font-bold">CREATE NEW RECIPE</h2>
         {/* Submit Button */}
         <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-300 text-xs text-white px-6 py-1 rounded-xl hover:bg-red-500 transition"
            onClick={handleSubmit}
            disabled={mutation.isLoading} 
          >
            Save
          </button>
        </div>
      </div>

      <form className="bg-white p-6 rounded-lg  mt-2 w-2xl "
      
      >
        <p className="font-bold text-2xl mb-8">Recipe</p>


        {/* Recipe Title */}
        <div className="mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 shadow border border-gray-200 rounded-md focus:ring focus:ring-pink-300"
            placeholder="Recipe Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* Recipe Image Upload */}
        <div className="mb-4">
          <input
            placeholder="select Recipe image"
            type="file"
            name="image"
            className="w-full h-60 bg-gray-200 shadow border border-gray-200 p-2 rounded-md"
            onChange={handleFileChange}
          />
        </div>

        {/* Recipe Description */}
        <div className="mb-4">
          <textarea
            className="w-full px-4 py-2 shadow border border-gray-200 rounded-md h-24 resize-none focus:ring focus:ring-pink-300"
            placeholder="Write a short description..."
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <label className="block font-semibold">Ingredients</label>
          <input
            type="text"
            name="ingredients"
            className="w-full px-4 py-2 shadow border border-gray-200 rounded-md focus:ring focus:ring-pink-300"
            placeholder="List ingredients separated by commas"
            value={formData.ingredients}
            onChange={handleChange}
          />
        </div>

        {/* Cooking Notes */}
        <div className="mb-4">
          <label className="block font-semibold">Cooking Notes</label>
          <textarea
            className="w-full px-4 py-2 shadow border border-gray-200 rounded-md h-20 resize-none focus:ring focus:ring-pink-300"
            placeholder="Add any cooking tips or notes..."
            name="cookingNotes"
            value={formData.cookingNotes}
            onChange={handleChange}
          ></textarea>
        </div>

       
      </form>
    </div>
  );
};

export default ShareRecipe;
