

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { url } from "../services/ApiRoutes.jsx";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
// import { UserContext } from "../context/UserContext.jsx";
import Loader from "../components/loader/Loader.jsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function Dashboard() {
  const [loading, setLoading] = useState(false);

  // const { user, storeUserName } = useContext(UserContext);
  const [stats, setStats] = useState(null);
  const token = Cookies.get("userToken");
  console.log(token);
  

  useEffect(() => {
    // const savedUserName = Cookies.get("userName");
    // if (!user && savedUserName) {
    //   // storeUserName(savedUserName);
    // }

    const fetchStats = async () => {
      if (!token) {
        throw new Error("Token not found");
      }
      try {
        setLoading(true);
        const response = await axios.get(url.stats, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        toast.error("Failed to fetch stats. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  if (loading) return <Loader />;
  if (!stats) return <Loader />;

  const barChartData = {
    labels: stats.cityStats.map((city) => city.city),
    datasets: [
      {
        label: "Total Food Served",
        data: stats.cityStats.map((city) => city.totalFoodServed),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const firstCity = stats.cityStats[0];
  const pieChartData = {
    labels: firstCity.branchStats.map((branch) => branch.branch),
    datasets: [
      {
        label: "Food Served",
        data: firstCity.branchStats.map((branch) => branch.foodServed),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          {/* Welcome {user || "Guest"}! 👋 */}
        </h1>
        <p className="text-lg text-gray-600 text-center mb-4">
          Total Food Served: <span className="font-semibold">{stats.totalFoodServed}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              City-wise Food Served
            </h3>
            <div className="h-80">
              <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Branch-wise Distribution in {firstCity.city}
            </h3>
            <div className="h-80">
              <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
