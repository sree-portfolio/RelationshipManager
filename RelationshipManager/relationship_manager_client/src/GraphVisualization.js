import React, { useState, useEffect } from "react";
import Graph from "react-graph-vis"; // Install 'react-graph-vis' package
import PeopleForm from "./PeopleForm";
import RelationForm from "./RelationForm";
const GraphVisualization = ({
  nodes,
  links,
  onUpdatePerson,
  onDeletePerson,
  onUpdateRelation,
  onDeleteRelation,
}) => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedRelationship, setSelectedRelationship] = useState(null);

  const handleNodeClick = (event) => {
    const clickedPerson = nodes.find((person) => person.id === event.nodes[0]);
    setSelectedPerson(clickedPerson);
  };

  const handleEdgeClick = (event) => {
    const clickedRelationship = links.find(
      (relationship) => relationship.id == event.edges[0]
    );
    setSelectedRelationship(clickedRelationship);
  };
  const handleResetSelectedPerson = () => {
    setSelectedPerson(null);
  };
  const handleResetSelectedRelationshipData = () => {
    setSelectedRelationship(null);
  };

  try {
    const graphnodes = nodes.map((person) => ({
      id: person.id,
      label: person.name,
    }));
    const graphedges = links.map((relationship) => ({
      id: relationship.id,
      from: relationship.from_person,
      to: relationship.to_person,
      label: relationship.relationship_type,
    }));

    const graph = {
      nodes: graphnodes,
      edges: graphedges,
    };

    const options = {
      layout: {
        hierarchical: false,
      },
      nodes: {
        shape: "dot",
      },
      interaction: {
        dragView: false, 
        zoomView: false, 
      },
    };

    return (
      <div>
        {selectedPerson && (
          <PeopleForm
            initialData={selectedPerson}
            onSubmit={(personData) => {
              onUpdatePerson(personData);
              handleResetSelectedPerson();
            }}
            onDelete={(personId) => {
              onDeletePerson(personId);
              handleResetSelectedPerson();
            }}
          />
        )}
        {selectedRelationship && (
          <RelationForm
            people={nodes}
            initialData={selectedRelationship}
            onSubmit={(RelationshipData) => {
              onUpdateRelation(RelationshipData);
              handleResetSelectedRelationshipData();
            }}
            onDelete={(RelationshipDataId) => {
              onDeleteRelation(RelationshipDataId);
              handleResetSelectedRelationshipData();
            }}
          />
        )}
        <Graph
          graph={graph}
          options={options}
          events={{ selectNode: handleNodeClick, selectEdge: handleEdgeClick }}
        />
      </div>
    );
  } catch (error) {
    return <div>Error rendering graph: {error.message}</div>;
  }
};

export default GraphVisualization;
