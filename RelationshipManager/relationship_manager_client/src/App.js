import React, { useState, useEffect } from "react";
import axios from "axios";
import GraphVisualization from "./GraphVisualization";
import PeopleForm from "./PeopleForm";
import RelationForm from "./RelationForm";
import "./App.css"; // Add some basic styling
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("this running");
    fetchPeopleAndRelationships();
  }, []);

  const fetchPeopleAndRelationships = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/people/");
      const people = response.data;
      setNodes(people);
      const relationships_response = await axios.get(
        "http://localhost:8000/api/relationships/"
      );
      const relationship = relationships_response.data;
      setLinks(relationship);
      setIsLoading(false);
      // Fetch relationships and update links state
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };
  const handleDeletePerson = async (personId) => {
    try {
      await axios.delete(`http://localhost:8000/api/people/${personId}`);
      const updatedNodes = nodes.filter((node) => node.id !== personId);
      setNodes(updatedNodes);
      toast.success("Person is Deleted");
    } catch (error) {
      toast.error("Error deleting person:", error);
    }
  };
  const handleDeleteRelation = async (relationshipId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/relationships/${relationshipId}`
      );
      const updatedLinks = links.filter((link) => link.id !== relationshipId);
      setLinks(updatedLinks);
      toast.success("Relationship is Deleted");
    } catch (error) {
      toast.error("Error deleting relationship:", error);
    }
  };

  const handleAddOrUpdatePerson = async (personData) => {
    try {
      if (personData.id) {
        // If the person has an ID, update the person
        const response = await axios.put(
          `http://localhost:8000/api/people/${personData.id}/`,
          personData
        );
        const updatedPerson = response.data;

        const updatedNodes = nodes.map((node) =>
          node.id === updatedPerson.id ? updatedPerson : node
        );
        setNodes(updatedNodes);
        toast.success("Person information is updated");
      } else {
        // If the person doesn't have an ID, add a new person
        const response = await axios.post(
          "http://localhost:8000/api/people/",
          personData
        );
        const newPerson = response.data;

        setNodes([...nodes, newPerson]);
        toast.success("Person information is added");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while adding/updating person.");
      }
    }
  };
  const handleAddOrUpdateRelationship = async (relationshipData) => {
    try {
      if (relationshipData.id) {
        // If the person has an ID, update the person
        const response = await axios.put(
          `http://localhost:8000/api/relationships/${relationshipData.id}/`,
          relationshipData
        );
        const updatedRelationship = response.data;
        const updatedlinks = links.map((link) =>
          link.id === updatedRelationship.id ? updatedRelationship : link
        );

        setLinks(updatedlinks);
        toast.success("Relationship is updated");
        // setNodes(updatedNodes);
      } else {
        // If the person doesn't have an ID, add a new person
        const response = await axios.post(
          "http://localhost:8000/api/relationships/",
          relationshipData
        );
        const newRelationship = response.data;

        setLinks([...links, newRelationship]);
        toast.success("Relationship is added");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response);
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "An error occurred while adding/updating the relationship."
        );
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="app-container">
      <h1>People Relationship Management</h1>
      <ToastContainer />
      <div className="forms-container">
        <PeopleForm onSubmit={handleAddOrUpdatePerson} />
        <RelationForm people={nodes} onSubmit={handleAddOrUpdateRelationship} />
      </div>
      <div className="forms-container" style={{ height: "80vh" }}>
        <GraphVisualization
          nodes={nodes}
          links={links}
          onUpdatePerson={handleAddOrUpdatePerson}
          onDeletePerson={handleDeletePerson}
          onUpdateRelation={handleAddOrUpdateRelationship}
          onDeleteRelation={handleDeleteRelation}
        />
      </div>
    </div>
  );
};

export default App;
