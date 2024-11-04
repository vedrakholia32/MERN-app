import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  async function handleDelete(id) {
    const response = await fetch(`${process.env.REACT_APP_API}/${id}`, {
      method: "DELETE",
    });

    const result1 = await response.json();
    if (!response.ok) {
      setError(result1.error);
    }
    if (response.ok) {
      console.log("deleted", response.ok);
      setError("Deleted Successfully");
      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
  }

  async function getData() {
    const response = await fetch(process.env.REACT_APP_API);
    const result = await response.json();
    console.log("result..", result);
    if (!response.ok) {
      setError(result.error);
    }

    if (response.ok) {
      setData(result);
      setError("");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-2">
  {error && <div className="alert alert-danger"> {error} </div>}
  <div className="row">
    {data?.map((ele) => (
      // Change col-3 to use responsive column sizes
      <div key={ele._id} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
        <div className="card h-100"> {/* Make the card height equal for better alignment */}
          <div className="card-body">
            <h5 className="card-title">{ele.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
            <p className="card-text">{ele.age}</p>
            <Link to={`/${ele._id}`} className="card-link">Edit</Link>
            <Link className="card-link" onClick={() => handleDelete(ele._id)}>
              Delete
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Read;