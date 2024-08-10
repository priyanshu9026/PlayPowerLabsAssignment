// AddTimeZone.js
import React, { useState } from "react";

const AddTimeZone = ({ onAdd }) => {
  const [label, setLabel] = useState("");

  const handleAddTimeZone = (event) => {
    event.preventDefault();
    if (label.trim()) {
      onAdd(label);
      setLabel(""); // Clear input after adding
    } else {
      alert("Please enter a valid time zone.");
    }
  };

  return (
    <form onSubmit={handleAddTimeZone} style={styles.form}>
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Time Zone (e.g., Europe/London)"
        required
        style={styles.input}
      />
      <button type="submit" style={styles.addButton}>
        Add Time Zone
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  input: {
    marginRight: "10px",
    padding: "5px",
    borderRadius: "3px",
    border: "1px solid #ccc",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "3px",
  },
};

export default AddTimeZone;
