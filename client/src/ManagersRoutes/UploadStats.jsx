import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { url } from "../services/ApiRoutes";

function UploadStats() {
  const [foodServed, setFoodServed] = useState("");
  const [peopleServed, setPeopleServed] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [branch, setBranch] = useState("");
  const [mealType, setMealType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const token = Cookies.get("userToken");

  const handleAddData = async () => {
    if (!foodServed || !peopleServed || !city || !branch || !date || !mealType) {
      setError("Please fill out all fields.");
      return;
    }
    setError("");
    const obj = {
      foodServed,
      peopleServed,
      city,
      branch,
      date,
      mealType,
    };
    setIsLoading(true);

    try {
      const response = await axios.post(url.PostRegulerUpdates, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        setIsLoading(false);
        alert("Data added successfully!");
        setFoodServed("");
        setPeopleServed("");
        setCity("");
        setBranch("");
        setDate("");
        setMealType("");
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setError("Failed to add data. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Upload Stats</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form className="space-y-4">
        <div>
          <label htmlFor="foodServed" className="block text-sm font-medium">
            Food Served
          </label>
          <input
            id="foodServed"
            value={foodServed}
            onChange={(e) => setFoodServed(e.target.value)}
            type="number"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter food served"
          />
        </div>
        <div>
          <label htmlFor="peopleServed" className="block text-sm font-medium">
            People Served
          </label>
          <input
            id="peopleServed"
            value={peopleServed}
            onChange={(e) => setPeopleServed(e.target.value)}
            type="number"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter people served"
          />
        </div>
        <div>
          <label htmlFor="mealType" className="block text-sm font-medium">
            Meal Type
          </label>
          <input
            id="mealType"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            type="text"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter meal type"
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium">
            City
          </label>
          <input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter city"
          />
        </div>
        <div>
          <label htmlFor="branch" className="block text-sm font-medium">
            Branch
          </label>
          <input
            id="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            type="text"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter branch"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium">
            Date
          </label>
          <input
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={handleAddData}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? "Please wait..." : "Add Data"}
        </button>
      </form>
    </div>
  );
}

export default UploadStats;
