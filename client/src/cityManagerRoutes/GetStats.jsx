import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { url } from "../services/ApiRoutes";
import Loader from "../components/loader/Loader";

function GetStats() {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = Cookies.get("userToken");

  const FetchCityStats = async () => {
    if (!token) {
      setError("City manager token is missing!");
      return;
    }

    try {
      setIsLoading(true)
      const response = await axios.get(url.getcityStats, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(response.data?.foodLogs || []);
      setIsLoading(false)
    } catch (err) {
      console.error("Error getting city stats", err);
      setError("Failed to fetch city stats. Please try again later.");
      setIsLoading(false)
    }
  };

  useEffect(() => {
    FetchCityStats();
  }, []);
if(!stats.length){
  console.log("no stats available!");
  
}
  return (
    <div
      style={{
        margin: "20px auto",
        padding: "20px",
        maxWidth: "800px",
        textAlign: "center",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        City Stats
      </h1>
      {error ? (
        <p
          style={{
            color: "red",
            fontSize: "16px",
          }}
        >
          {error}
        </p>
      ) : stats.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  backgroundColor: "#f4f4f4",
                  padding: "10px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                City
              </th>
              <th
                style={{
                  backgroundColor: "#f4f4f4",
                  padding: "10px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                Branch
              </th>
              <th
                style={{
                  backgroundColor: "#f4f4f4",
                  padding: "10px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                Food Served
              </th>
              <th
                style={{
                  backgroundColor: "#f4f4f4",
                  padding: "10px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {stats?.map((log) => (
              <tr
                key={log._id}
                style={{
                  backgroundColor: "#fff",
                }}
              >
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {log.city}
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {log.branch}
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {log.foodServed}
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {new Date(log.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p
          style={{
            color: "#666",
            fontSize: "16px",
          }}
        >
         {isLoading ?<Loader/> :""}
        </p>
      )}
    </div>
  );
}

export default GetStats;
