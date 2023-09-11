import React, { useContext, useEffect, useState } from "react";
import AdminNav from "../nav/AdminNav";
import { TextField } from "@mui/material";
import "../admin.css";

function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const handleShowAllUsers = async () => {
    try {
      const res = await fetch("http://localhost:8080/allusers", {
        method: "GET",
      });
      const data = await res.json();
      setAllUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500); // Set loading to false when fetching is done
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterdUser = allUsers.filter((users) =>
    users.email.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  useEffect(() => {
    handleShowAllUsers();
  }, []);
  return (
    <>
      <AdminNav />
      <br />
      <h4 className="mt-3 mb-4 userHeadingText">User Dashboard</h4>
      <div className="mb-2 ml-3">
        <TextField
          id="standard-basic"
          label="Search by name..."
          variant="standard"
          onChange={(e) => {
            handleSearch(e);
          }}
        />
      </div>

      {loading ? (
       <div className="loader">
       <div class="spinner"></div>
       </div>
      ) : (
        <table class="table table-striped userTbl">
          <thead>
            <tr>
              <th scope="col">User Id</th>
              <th scope="col">User name</th>
              <th scope="col">Email</th>
              <th scope="col">Created At</th>
            </tr>
          </thead>
          <tbody>
            {filterdUser.length > 0 ? (
              filterdUser.map((users, index) => (
                <tr>
                  <th key={index}>{users._id}</th>
                  <td>{users.email.substring(0, 7)}</td>
                  <td>{users.email}</td>
                  <td>{new Date(users.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center pt-5">
                  No results found for "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Users;
