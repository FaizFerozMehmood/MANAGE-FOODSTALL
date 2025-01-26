import React, { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { url } from "../services/ApiRoutes";
// import { useNavigate } from "react-router-dom";
function StatsReports() {
  // const Navigate = useNavigate();
  // useEffect(() => {
  const handleDownload = async () => {
    const token = Cookies.get("userToken");
    console.log(token);

    if (!token) {
      throw new Error("token not found!");
    }
    try {
      const response = await axios.get(url.downloadReports, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      
      const url2 = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url2;
      link.setAttribute("download", "food_stats_report.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log("error downloading state resports", error);
    }
  };
  // }, []);
 

  return (
    <div>
      <button onClick={handleDownload}>Download Report</button>
      {/* <button onClick={handleLogOut}>logout</button> */}
    </div>
  );
}

export default StatsReports;
