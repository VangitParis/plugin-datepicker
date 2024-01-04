import React, { useEffect, useState, useRef } from "react";
import Calendar from "../Calendar/calendar";
import { formatDate, parseDateInput } from "../../utils/modelisation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import DatePickerInput from "../DatePickerInput/datePickerInput";
import "./datePicker.css";

/**
 * React component for a date picker.
 * @param {{minYear : number, maxYear: number, customClass: string, dateFormat:string, dateFormat:string, language:string,font:string, fontSize:string }}
 */
export default function DatePicker({
  minYear,
  maxYear,
  customClass,
  dateFormat,
  language,
  font,
  fontSize,
}) {
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
      setDateInput(formatDate(currentDate, dateFormat || "yyyy/MM/dd"));
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
  const handleDateChange = (event) => {
    const inputValue = event.target.value;
    const newDate = parseDateInput(inputValue);

    if (newDate && !isNaN(newDate.getTime())) {
      setSelectedDate(newDate);
      setDateInput(formatDate(newDate));
      setShowCalendar(true);
      setErrorMessage("");
    } else {
      setShowCalendar(false);
      setErrorMessage("Invalid date format");
    }
  };

  /**
   * Handles key press events, opens the calendar and displays the entered date on 'Enter'.
   * @param {Event} event - The key press event.
   */
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const parsedDate = parseDateInput(dateInput);

      if (parsedDate && !isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
        setShowCalendar(true);
        setErrorMessage("");
      } else {
        event.preventDefault();
        setShowCalendar(false);
        setErrorMessage("Invalid date format");
      }
    }
    if (event.key === "Escape") {
      setShowCalendar(false);
    }
  };

  // Style for the input element
  const inputStyle = {
    fontFamily: font,
    fontSize: fontSize,
  };

  // JSX for rendering the component
  return (
    <main className={`main ${customClass}`}>
      <div className="form">
        {/* Label for the date input */}
        <label htmlFor="date" aria-label="date" className="label-date">
          Select your favorite date
        </label>
        <div className="input-container">
          {/* Input element for date selection */}
          <DatePickerInput
  dateInput={dateInput}
  onChange={handleDateChange}
  onBlur={handleDateChange}
  onKeyDown={handleKeyPress}
  inputStyle={inputStyle}
  showCalendar={showCalendar}
  inputRef={inputRef}
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
        {errorMessage !== null && (
          <p className="error-message">{errorMessage}</p>
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
          />
        )}
      </div>
    </main>
  );
}
