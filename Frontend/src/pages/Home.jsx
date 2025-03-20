import React from "react";
import user1 from "../assets/user1.png";
import user2 from "../assets/user2.png";
import user3 from "../assets/user3.png";
import r1 from "../assets/r1.png";
import r2 from "../assets/r2.png";
import r3 from "../assets/r3.png";
import r4 from "../assets/r4.png";
import r5 from "../assets/r5.png";
import r6 from "../assets/r6.png";
import plate from "../assets/plate.png";

const Home = () => {
  // Contributors Data
  const contributors = [
    { id: 1, name: "John Doe", image: user1 },
    { id: 2, name: "Jane Smith", image: user2 },
    { id: 3, name: "Mark Lee", image: user3 },
  ];

  // Popular Recipes Data
  const recipes = [
    { id: 1, title: "Pasta Bowl", image: r1, likes: "1.2k" },
    { id: 2, title: "Green Salad", image: r2, likes: "2.5k" },
    { id: 3, title: "Sushi Rolls", image: r3, likes: "3.1k" },
    { id: 4, title: "Pumpkin Soup", image: r4, likes: "980" },
    { id: 5, title: "Veggie Bowl", image: r5, likes: "1.8k" },
    { id: 6, title: "Mexican Rice", image: r6, likes: "2.3k" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="flex justify-between">
        <div className="m-2">
          <h2 className="text-3xl font-bold">
            YOUR DAILY PLATE A{" "}
            <p className="text-red-400">TASTEFUL JOURNEY</p>
          </h2>
          <p className="text-gray-600 mt-2 text-xs">
            Discover amazing recipes from around the world.
          </p>
        </div>
        <img
          src={plate}
          alt="Hero"
          className="mx-auto mb-4 w-50 h-50 rounded-full"
        />
      </div>

      {/* Stats Section */}
      <div className="flex justify-center gap-8 mt-8 text-center">
        <div>
          <h3 className="text-2xl font-bold text-red-400">5000+</h3>
          <p>Contributors</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-red-400">340K+</h3>
          <p>Recipes</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-red-400">450+</h3>
          <p>Cities</p>
        </div>
      </div>

      {/* Share Recipe Section */}
      <div className="mt-12 text-center bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold">
          SHARE YOUR <span className="text-red-400">RECIPE</span>
        </h3>
        <p className="text-gray-600 mt-2">
          Let others taste your creativity by sharing your recipe.
        </p>
        <button className="mt-4 bg-red-400 text-white px-6 py-2 rounded-lg">
          Share Now
        </button>
      </div>

      {/* Top Contributors Section */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-center">TOP CONTRIBUTORS</h3>
        <div className="flex flex-wrap justify-evenly gap-6 mt-4 px-8">
          {contributors.map((contributor) => (
            <div
              key={contributor.id}
              className="bg-white shadow-md p-4 rounded-lg text-center"
            >
              <img
                src={contributor.image}
                alt={contributor.name}
                className="w-45 h-50 mx-auto"
              />
              <h4 className="mt-2 font-semibold">{contributor.name}</h4>
              <p className="text-gray-500 text-sm">Recipe Contributor</p>
              <p className="text-gray-500 text-sm">400 Recipe</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Recipes Section */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-center">POPULAR RECIPES</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white shadow-md p-4 rounded-lg">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h4 className="mt-2 font-semibold">{recipe.title}</h4>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <div className="bg-black w-6 h-6 rounded-full"></div>
                  <p>name</p>
                </div>
                <p className="text-gray-500 text-sm">{recipe.likes} Likes</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
