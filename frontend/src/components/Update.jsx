import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [fname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  const [error, setError] = useState();
  const [success, setSuccess] = useState(""); // State for success alert
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const getSingleData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/${id}`);
    const result = await response.json();

    if (response.ok) {
      console.log("Fetched user data:", result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    } else {
      console.log("Error fetching data:", result.error);
    }
  };

  // Passing edited data to backend
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { fname, email, age };
    console.log(updatedUser);
    const response = await fetch(`${process.env.REACT_APP_API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    const result = await response.json();
    if (response.ok) {
      console.log("Updated result:", result);
      setSuccess("Data updated successfully!"); // Set success message
      setError("");
      setTimeout(() => {
        setSuccess(""); // Clear success message after 3 seconds
        navigate("/read");
      }, 3000); // Delay navigation
    } else {
      console.log("Update error:", result.error);
      setError(result.error);
      setSuccess(""); // Clear success message on error
    }
  };

  useEffect(() => {
    getSingleData();
  }, []);

  return (
    <div className="container my-2">
      <h1 className="h1 text-center">Edit Data</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>} {/* Success Alert */}
      <form className="form" onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={fname}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-info me-2">
          Update
        </button>

        <button type="button" className="btn btn-secondary" onClick={() => navigate("/get")}>
          Back
        </button>
      </form>
    </div>
  );
};

export default Update;
