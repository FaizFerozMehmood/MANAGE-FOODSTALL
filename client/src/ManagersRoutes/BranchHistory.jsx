import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { url } from "../services/ApiRoutes";
function BranchHistory() {
  const [data, setData] = useState([]);
  const fetchBranchStats = async () => {
    const token = Cookies.get("userToken");
    console.log(token);
    if (!token) {
      throw new Error("Token not found");
    }
    try {
      const response = await axios.get(url.getBranchHistory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response", response);
      console.log("response", response.data.history);
      setData(response.data.history);
    } catch (error) {
      console.log("error fetching branch history");
    }
  };
  useEffect(() => {
    fetchBranchStats();
  }, []);
  return (
    <div>
      {data?.map((value) => (
        // console.log("value",value)
        <div Key={value._id}>
          <img src={value.picture} alt="People having food" />
          <h3> branch :{value.branch}</h3>
          <h4> city :{value.city}</h4>
          <h4> date :{value.date}</h4>
          <h4> foodServed :{value.foodServed}</h4>
          <h4> peopleServed :{value.peopleServed}</h4>
        </div>
      ))}
    </div>
  );
}

export default BranchHistory;
