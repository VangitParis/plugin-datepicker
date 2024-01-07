import React, { useEffect, useState, useRef } from "react";
import Calendar from "../Calendar/calendar";
import { formatDate, parseDateInput } from "../../utils/modelisation.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import "./datePicker.css";

/**
 * React component for a date picker.
 * @param {{minYear : number, maxYear: number, customClass: string, dateFormat:string, dateFormat:string, language:string,font:string, fontSize:string }}
 */
export default function DatePicker({
  minYear,
  maxYear,
  inputClassName,
  dateFormat,
  language,
  font,
  fontSize,
  errorClass,
  backgroundColor,
  color,
  width,
  height,
}) {
  console.log(language);
  // State variables for managing the selected date, input value, calendar visibility, and error message
  const [selectedDate, setSelectedDate] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Reference to the input element
  const inputRef = useRef(null);

  /**
   * useEffect to initialize the date with the current date if selectedDate is empty.
   */
  useEffect(() => {
    if (!selectedDate) {
      const currentDate = new Date();

      setSelectedDate(currentDate);
      setDateInput(formatDate(currentDate, dateFormat));
    }
  }, [dateFormat, selectedDate]);

  /**
   * Toggles the calendar visibility, opens only if errorMessage is null.
   */
  const toggleCalendar = () => {
    if (errorMessage === null) {
      setShowCalendar(!showCalendar);
    }
  };

  /**
   * Handles the click on a date in the calendar, updates the input, and closes the calendar.
   * @param {Date} date - The selected date.
   */
  const handleCalendarDateClick = (date) => {
    setSelectedDate(date);
    setDateInput(formatDate(date));
    setShowCalendar(false);
    setErrorMessage(null);
  };

  /**
   * Handles the change of displayed date in the calendar.
   * @param {Date} newDisplayedDate - The newly displayed date.
   */
  const handleDisplayChange = (newDisplayedDate) => {
    setSelectedDate(newDisplayedDate);
    setDateInput(formatDate(newDisplayedDate));
    setErrorMessage(null);
  };

  /**
   * Handles the change of the input date, parses the input and updates the state accordingly.
   * @param {Event} event - The input change event.
   */
  const handleDateChange = (inputValue) => {
    setDateInput(inputValue);

    const newDate = parseDateInput(new Date(inputValue));

    if (newDate && !isNaN(newDate.getTime())) {
      setSelectedDate(newDate);
      setShowCalendar(true);
      setErrorMessage("");
    } else {
      setShowCalendar(false);
      setErrorMessage("Invalid date format");
    }
  };

  const handleBlur = () => {
    handleDateChange(dateInput);
  };

  /**
   * Handles key press events, opens the calendar and displays the entered date on 'Enter'.
   * @param {Event} event - The key press event.
   */
  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      const parsedDate = parseDateInput(dateInput);

      if (parsedDate && !isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
        setShowCalendar(true);
        setErrorMessage("");
      } else {
        e.preventDefault();
        setShowCalendar(false);
        setErrorMessage("Invalid date format");
      }
    }
    if (e.code === "Escape") {
      setShowCalendar(false);
    }
  };

  // Style for the input element
  const inputStyle = {
    fontFamily: font,
    fontSize: fontSize,
    backgroundColor: backgroundColor,
    width,
    color,
    height,
  };

  // JSX for rendering the component
  return (
    <>
      <div className="input-container">
        {/* Input element for date selection */}
        <input
          ref={inputRef}
          id="date"
          type="datetime"
          placeholder="Select date"
          value={dateInput}
          onChange={(e) => handleDateChange(e.target.value)}
          onBlur={() => handleBlur}
          onKeyDown={handleKeyPress}
          style={inputStyle}
          className={`input-date ${inputClassName} ${
            errorMessage !== null ? errorClass : ""
          }`}
          autoFocus={showCalendar}
          data-cy="input-date"
        />
        {/* Calendar icon for opening/closing the calendar */}
        <FontAwesomeIcon
          icon={faCalendarDay}
          className="calendar-icon"
          data-cy={"calendar-icon"}
          onClick={toggleCalendar}
          onFocus={toggleCalendar}
        ></FontAwesomeIcon>
      </div>
      {/* Display error message if there is an error */}
      {errorMessage !== null && errorClass !== "error-message" && (
        <p className={`error-message ${errorClass}`}>{errorMessage}</p>
      )}
      {/* Custom calendar component */}
      {showCalendar && (
        <Calendar
          selectedDate={selectedDate}
          onSelect={handleCalendarDateClick}
          onDisplayChange={handleDisplayChange}
          onKeyPress={handleKeyPress}
          minYear={minYear}
          maxYear={maxYear}
          language={language}
          customStyles={{ selectClass: "custom-select-class" }}
          tabIndex={0}
          dateFormat={dateFormat}
        />
      )}
    </>
  );
}
