import React, { useState } from "react";

export default function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // State for success popup

  console.log(name, email, age);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addUser = { name, email, age };

    try {
      const response = await fetch(process.env.REACT_APP_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addUser),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
        setSuccess(false); // Reset success state on error
      } else {
        console.log("Success:", result);
        setError("");
        setSuccess(true); // Set success state to true
        setName("");
        setAge(0);
        setEmail("");
        // Automatically hide the success message after 3 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert alert-success" role="alert">
          Registered successfully!
        </div>
      )}
      <h2 className="text-center">Enter the data</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
