
import React from "react";
import moment from "moment-timezone";

const TimeZoneDisplay = ({ timeZone, currentTime, onDelete }) => {
  // Format current time for the given time zone
  const getCurrentTime = () => {
    return moment.tz(currentTime, timeZone).format("YYYY-MM-DD HH:mm:ss");
  };

  return (
    <div style={styles.container}>
      <div>
        <strong>{timeZone}:</strong> {getCurrentTime()}
      </div>
      <button onClick={onDelete} style={styles.removeButton}>
        Remove
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "250px",
  },
  removeButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "3px",
  },
};

export default TimeZoneDisplay;
