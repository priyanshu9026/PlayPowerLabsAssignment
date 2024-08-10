
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ selectedDate, onDateChange }) => {
  return (
    <div>  
    <DatePicker 
     selected={selectedDate}
     onChange={onDateChange}
     showTimeSelect
     dateFormat="Pp"
     />
     </div>
  );
};

export default DatePickerComponent;
