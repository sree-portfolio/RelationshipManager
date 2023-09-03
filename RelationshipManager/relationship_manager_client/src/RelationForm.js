import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RelationForm = ({ people, onSubmit, initialData, onDelete }) => {
  const [fromPerson, setFromPerson] = useState("");
  const [toPerson, setToPerson] = useState("");
  const [relationshipType, setRelationshipType] = useState("");
  useEffect(() => {
    if (initialData) {
      setFromPerson(initialData.from_person);
      setToPerson(initialData.to_person);
      setRelationshipType(initialData.relationship_type);
    }
  }, [initialData]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (fromPerson && toPerson && relationshipType) {
      const RelationshipData = {
        from_person: fromPerson,
        to_person: toPerson,
        relationship_type: relationshipType,
      };

      if (initialData && initialData.id) {
        RelationshipData.id = initialData.id;
      }
      onSubmit(RelationshipData);
      setFromPerson("");
      setToPerson("");
      setRelationshipType("");
    } else {
      toast.error("Please fill all feilds");
    }
  };
  const handleDelete = () => {
    onDelete(initialData.id);
    setFromPerson("");
    setToPerson("");
    setRelationshipType("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData ? "Edit Relationship" : "Add Relationship"}</h2>
      <div className="form-group">
        <label>From Person:</label>
        <select
          className="form-control"
          value={fromPerson}
          onChange={(e) => setFromPerson(e.target.value)}
        >
          <option value="">Select</option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>To Person:</label>
        <select
          className="form-control"
          value={toPerson}
          onChange={(e) => setToPerson(e.target.value)}
        >
          <option value="">Select</option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Relationship Type:</label>
        <select
          className="form-control"
          value={relationshipType}
          onChange={(e) => setRelationshipType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="parent">Parent</option>
          <option value="grandparent">Grandparent</option>
          <option value="partner">Partner</option>
          <option value="child">Child</option>
          <option value="friend">Friend</option>
        </select>
      </div>
      <button className="btn btn-primary" type="submit">
        {initialData ? "Update" : "Add"}
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

export default RelationForm;
