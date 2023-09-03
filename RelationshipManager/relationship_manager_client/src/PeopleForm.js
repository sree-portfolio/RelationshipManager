import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
const PeopleForm = ({ onSubmit, initialData, onDelete }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setAge(initialData.age.toString());
      setGender(initialData.gender);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && age && gender) {
      const personData = {
        name,
        age: parseInt(age),
        gender,
      };
      if (initialData && initialData.id) {
        personData.id = initialData.id; 
      }
      onSubmit(personData);
      setName("");
      setAge("");
      setGender("");
    } else {
      toast.error("Please fill all feilds");
    }
  };
  const handleDelete = () => {
    onDelete(initialData.id);
    // Clear form fields
    setName("");
    setAge("");
    setGender("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData ? "Edit Person" : "Add Person"}</h2>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Age:</label>
        <input
          type="number"
          className="form-control"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <select
          className="form-control"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button className="btn btn-primary" type="submit">
        {initialData ? "Save" : "Add"}
      </button>
      {initialData && (
        <button
          className="btn btn-danger ml-2"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </form>
  );
};

export default PeopleForm;
