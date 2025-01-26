
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { url } from "../services/ApiRoutes";
// import { url } from "../services/ApiRoutes";

const UploadStats = () => {
  const [formData, setFormData] = useState({
    foodServed: "",
    peopleServed: "",
    city: "",
    branch: "",
    latitude: "",
    longitude: "",
    picture: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      picture: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get("userToken");
    if (!token) {
      setMessage("Token not found! Please log in.");
      return;
    }

    const data = new FormData();
    data.append("foodServed", formData.foodServed);
    data.append("peopleServed", formData.peopleServed);
    data.append("city", formData.city);
    data.append("branch", formData.branch);
    data.append("latitude", formData.latitude);
    data.append("longitude", formData.longitude);
    if (formData.picture) {
      data.append("picture", formData.picture);
    }

    try {
      const response = await axios.post(url.PostRegulerUpdates, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
      console.log(response);
      
    } catch (error) {
      setMessage("Error adding food log: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Add Food Log
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700">Food Served</label>
          <input
            type="number"
            name="foodServed"
            value={formData.foodServed}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">People Served</label>
          <input
            type="number"
            name="peopleServed"
            value={formData.peopleServed}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Branch</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Latitude</label>
          <input
            type="number"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Longitude</label>
          <input
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Picture</label>
          <input
            type="file"
            name="picture"
            onChange={handleFileChange}
            className="w-full px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
      </form>
    </div>
  );
};

export default UploadStats;
