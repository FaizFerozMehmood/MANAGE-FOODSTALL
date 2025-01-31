import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { url } from "../services/ApiRoutes.jsx";
import Loader from "../components/loader/Loader.jsx";

function BranchHistory() {
  const token = Cookies.get("userToken");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const userName = Cookies.get("userName");

  const fetchBranchStats = async () => {
    if (!token) {
      throw new Error("Token not found");
    }
    try {
      setIsLoading(true)
      const response = await axios.get(url.getBranchHistory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data?.history || []);
      // console.log(response.data?.history?.branch);
      setIsLoading(false)
    } catch (error) {
      console.log("Error fetching branch history:", error);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchBranchStats();
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h3
        style={{
          color: "white",
          backgroundColor: "green",
          border: "1px solid black",
          textAlign: "center",
          fontSize: "30px",
          padding: "15px 0",
          borderRadius: "8px",
        }}
      >
        Welcome {userName ? userName : "Manager"}! 👋
      </h3>

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
        Welcome to the Branch Dashboard! Here, you can view detailed insights
        into the operations of your branches. Explore key metrics such as
        branch location, served cities, operational dates, and the impact of
        your services.😍
      </p>

      {data.length ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {data.map((value) => (
            <div
              key={value._id}
              style={{
                backgroundColor: "#f8f9fa",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={
                  
                  "https://images.unsplash.com/photo-1484980972926-edee96e0960d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="Branch"
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
              <h3 style={{ color: "#333", marginBottom: "10px" }}>
                Branch: {value.branch}
              </h3>
              <h4 style={{ color: "#666", marginBottom: "5px" }}>
                City: {value.city}
              </h4>
              <h4 style={{ color: "#666", marginBottom: "5px" }}>
                Food Served: {value.foodServed}
              </h4>
              <h4 style={{ color: "#666", marginBottom: "5px" }}>
                People Served: {value.peopleServed}
              </h4>
              <h4 style={{ color: "#666", marginBottom: "5px" }}>
  Date: {new Date(value.date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })}
</h4>

            </div>
          ))}
        </div>
      ) : (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            fontSize: "20px",
            color: "#666",
          }}
        >
          {isLoading? <Loader/> :""}
        </p>
      )}
    </div>
  );
}

export default BranchHistory;
