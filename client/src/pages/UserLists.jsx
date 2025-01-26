import React, { useEffect, useState } from 'react';
import { url } from '../services/ApiRoutes';
import Cookies from 'js-cookie';
import axios from 'axios';

function UserLists() {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(null);
  const token = Cookies.get('userToken');

  const displayUsers = async () => {
    try {
      const response = await axios.get(url.getUsers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('User list fetched', response.data);
      setUserList(response.data?.data);
    } catch (error) {
      console.error('Error getting user list', error);
      setError('Failed to fetch user list');
    }
  };

  useEffect(() => {
    displayUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">User Lists</h1>

        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        {userList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userList.map((user, index) => (
              <div
                key={index}
                className="bg-gray-50 shadow-md p-4 rounded-lg border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-gray-700 mb-2">{user.name}</h2>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">City:</span> {user.city}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Role:</span> {user.role}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 text-center">
           Loading...
          </p>
        )}
      </div>
    </div>
  );
}

export default UserLists;
