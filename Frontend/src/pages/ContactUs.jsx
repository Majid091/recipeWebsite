import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from 'axios'



const ContactUs = () => {
  return (
    <div className="bg-gray-100 text-gray-900 p-5 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center">CONTACT US</h2>

      <form className="bg-white p-6 rounded-lg mt-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring focus:ring-pink-300"
            placeholder="First name"
          />
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring focus:ring-pink-300"
            placeholder="Last name"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring focus:ring-pink-300"
            placeholder="Email"
          />
        </div>

        {/* Subject Dropdown */}
        <div className="mb-4">
          <select className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring focus:ring-pink-300">
            <option>Select Subject</option>
            <option>General Inquiry</option>
            <option>Support</option>
            <option>Feedback</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-4">
          <textarea
            className="w-full px-4 py-2 border border-gray-200 rounded-md h-24 resize-none focus:ring focus:ring-pink-300"
            placeholder="Description"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-300 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
