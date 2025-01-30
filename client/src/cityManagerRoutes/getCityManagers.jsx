import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { url } from "../services/ApiRoutes";
import Loader from "../components/loader/Loader";

function GetCityManagers() {
  const [managers, setManagers] = useState([]);
  const [error, setError] = useState(null);
  const [editingManager, setEditingManager] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({}); 
  const [isLoading, setIsLoading] = useState(false); 
  const token = Cookies.get("userToken");

  const getManagers = async () => {
    if (!token) {
      setError("City manager token is missing!");
      return;
    }

    try {
      setIsLoading(true)
      const response = await axios.get(url.getAllBranchManagers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setManagers(response.data?.branchManagers || []);
      setIsLoading(false)
    } catch (error) {
      console.error("Error getting branch managers:", error);
      setError("Failed to fetch branch managers. Please try again later.");
      setIsLoading(false)
    }
  };

  const handleEdit = (manager) => {
    setEditingManager(manager);
    setUpdatedDetails({
      name: manager.name,
      email: manager.email,
      branch: manager.branch,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${url.updatateBranchManager}/${editingManager._id}`,
        updatedDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Update successful:", response.data);

      getManagers();
      setEditingManager(null);
    } catch (error) {
      console.error("Error updating branch manager:", error);
      setError("Failed to update branch manager. Please try again later.");
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getManagers();
  }, []);

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
        Branch Managers
      </h1>
      {error ? (
        <p style={{ color: "red", fontSize: "16px" }}>{error}</p>
      ) : managers.length > 0 ? (
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
                Name
              </th>
              <th
                style={{
                  backgroundColor: "#f4f4f4",
                  padding: "10px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                Email
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager) => (
              <tr key={manager._id}>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {manager.name}
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {manager.email}
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {manager.branch}
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  <button
                    style={{
                      padding: "5px 10px",
                      marginRight: "5px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleEdit(manager)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ color: "#666", fontSize: "16px" }}>
          {/* No branch managers user found. */}
          {isLoading? <Loader/> :""}
        </p>
      )}

      {editingManager && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Edit Branch Manager</h3>
          <input
            style={{
              padding: "8px",
              margin: "5px 0",
              width: "100%",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            type="text"
            value={updatedDetails.name}
            onChange={(e) =>
              setUpdatedDetails({ ...updatedDetails, name: e.target.value })
            }
            placeholder="Name"
          />
          <input
            style={{
              padding: "8px",
              margin: "5px 0",
              width: "100%",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            type="email"
            value={updatedDetails.email}
            onChange={(e) =>
              setUpdatedDetails({ ...updatedDetails, email: e.target.value })
            }
            placeholder="Email"
          />
          <input
            style={{
              padding: "8px",
              margin: "5px 0",
              width: "100%",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            type="text"
            value={updatedDetails.branch}
            onChange={(e) =>
              setUpdatedDetails({ ...updatedDetails, branch: e.target.value })
            }
            placeholder="Branch"
          />
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px",
            }}
            onClick={handleUpdate}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

export default GetCityManagers;
