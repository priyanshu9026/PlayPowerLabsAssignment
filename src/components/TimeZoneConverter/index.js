import React, { Component } from "react";
import moment from "moment-timezone";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TimeZoneDisplay from "../TimeZoneDisplay";
import AddTimeZone from "../AddTimeZone";
import DatePickerComponent from "../DatePickerComponent";
import "react-datepicker/dist/react-datepicker.css";
import './index.css'

class TimeZoneConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZones: ["UTC", "Asia/Kolkata"],
      currentTime: moment(),
      selectedDate: new Date(),
      darkMode: false,
    };
  }

  handleTimeZoneAddition = (timeZone) => {
    if (moment.tz.zone(timeZone)) {
      this.setState((prevState) => ({
        timeZones: [...prevState.timeZones, timeZone],
      }));
    } else {
      alert("Invalid time zone.");
    }
  };

  handleTimeZoneDeletion = (index) => {
    this.setState((prevState) => ({
      timeZones: prevState.timeZones.filter((_, i) => i !== index),
    }));
  };

  onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(this.state.timeZones);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    this.setState({ timeZones: items });
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  toggleDarkMode = () => {
    this.setState((prevState) => ({
      darkMode: !prevState.darkMode,
    }));
  };
  reverseOrder = () => {
    this.setState((prevState) => ({
      timeZones: [...prevState.timeZones].reverse(),
    }));
  };

  generateShareableLink = () => {
    const { timeZones } = this.state;
    const encodedTimeZones = encodeURIComponent(JSON.stringify(timeZones));
    const shareableLink = `${window.location.origin}${window.location.pathname}?timeZones=${encodedTimeZones}`;
    alert(`Shareable Link: ${shareableLink}`);
  };

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const timeZones = params.get("timeZones");
    if (timeZones) {
      this.setState({ timeZones: JSON.parse(decodeURIComponent(timeZones)) });
    }
  }

  scheduleMeet = () => {
    const { selectedDate } = this.state;
    const startTime = moment(selectedDate).format("YYYYMMDDTHHmmss");
    const endTime = moment(selectedDate).add(1, "hours").format("YYYYMMDDTHHmmss");
    const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?dates=${startTime}/${endTime}&text=Meeting&location=&details=Scheduled%20meeting`;
    window.open(calendarUrl, "_blank");
  };

  render() {
    const { timeZones, selectedDate, darkMode } = this.state;
    const containerClass = darkMode ? "dark-mode" : "";

    return (
      <div className={`container ${containerClass}`} style={styles.container}>
        <h1 className="main-heading">Time Zone Converter</h1>
        <AddTimeZone onAdd={this.handleTimeZoneAddition} />
        <button onClick={this.reverseOrder} style={styles.reverseButton}>
          Reverse Order
        </button>
        <button onClick={this.toggleDarkMode} style={styles.toggleButton}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button onClick={this.scheduleMeet} style={styles.scheduleButton}>
        Schedule Meet
      </button>
        <DatePickerComponent
          selectedDate={selectedDate}
          onDateChange={this.handleDateChange}
        />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {timeZones.map((zone, index) => (
                  <Draggable key={zone} draggableId={zone} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TimeZoneDisplay
                          timeZone={zone}
                          currentTime={moment(selectedDate)}
                          onDelete={() => this.handleTimeZoneDeletion(index)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button onClick={this.generateShareableLink} style={styles.shareButton}>
          Generate Shareable Link
        </button>
      </div>
    );
  }
}

const styles = {
  scheduleButton: {
    margin: "10px",
    padding: "10px 20px",
    cursor: "pointer",
  },
  
  shareButton: {
    margin: "10px",
    padding: "10px 20px",
    cursor: "pointer",
  },

  container: {
    textAlign: "center",
    height:  "100vh",
    padding: "20px",
    backgroundSize: "cover",
  },
  reverseButton: {
    margin: "10px",
    padding: "10px 20px",
    cursor: "pointer",
  },
  toggleButton: {
    margin: "10px",
    padding: "10px 20px",
    cursor: "pointer",
  },
};

export default TimeZoneConverter;
