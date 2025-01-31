import axios from "axios";
import React, { useEffect, useState } from "react";
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
import Loader from "../components/loader/Loader.jsx";
import EmailForm from "../services/Email.jsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const defaultColors = [
  "rgba(255, 99, 132, 0.6)",
  "rgba(54, 162, 235, 0.6)",
  "rgba(255, 206, 86, 0.6)",
  "rgba(75, 192, 192, 0.6)",
  "rgba(153, 102, 255, 0.6)",
  "rgba(255, 159, 64, 0.6)",
];

const prepareBarChartData = (branchStats) => ({
  labels: branchStats.map((branch) => branch.branch),
  datasets: [
    {
      label: "Total Food Served",
      data: branchStats.map((branch) => branch.foodServed),
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
});

const preparePieChartData = (branchStats) => ({
  labels: branchStats?.map((branch) => branch.branch),
  datasets: [
    {
      label: "Food Served",
      data: branchStats?.map((branch) => branch.foodServed),
      backgroundColor: defaultColors.slice(0, branchStats?.length || 0),
    },
  ],
});

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const token = Cookies.get("userToken");
  const userName = Cookies.get("userName");

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) {
        toast.error("Token not found");
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(url.stats, {
          headers: { Authorization: `Bearer ${token}` },
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

  if (loading || !stats) return <Loader />;

  if (!stats.cityStats || stats.cityStats.length === 0) {
    return <p className="text-center text-gray-700">No data available to display.</p>;
  }

  const allBranchStats = stats.cityStats.flatMap((city) => city.branchStats);
  const barChartData = prepareBarChartData(allBranchStats);
  const pieChartData = preparePieChartData(allBranchStats);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h2
        style={{
          display: "flex",
          placeContent: "center",
          fontSize: "20px",
          marginBottom: "50px",
          marginTop: "0px",
          backgroundColor: "black",
          padding: "40px",
          color: "white",
          borderRadius: "8px",

        }}
      >
        Welcome {userName ? userName +" " +"(Admin)": "ADMIN"}! 👋
      </h2>
      <p
        style={{
          color: "white",
          backgroundColor: "black",
          textAlign: "center",
          fontSize: "18px",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      >
        Welcome to Admin Dashboard! Here, you can view detailed insights
        into the operations of your branches. Explore key metrics such as
        branch location, served cities, operational dates, and the impact of
        your services.😍
      </p>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <p className="text-lg text-gray-600 text-center mb-4">
          Total Food Served: <span className="font-semibold">{stats.totalFoodServed}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Branch-wise Food Served
            </h3>
            <div className="h-80">
              <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Branch-wise Distribution
            </h3>
            <div className="h-80">
              <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
      <EmailForm/>
    </div>
  );
}

export default Dashboard;
