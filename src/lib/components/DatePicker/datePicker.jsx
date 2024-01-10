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
  calendarWidth,
  calendarHeight,
  buttonBackgroundColor,
  buttonColor,
  monthSelectClass,
  yearSelectClass,

  
}) {
  // State variables for managing the selected date, input value, calendar visibility, and error message
  const [selectedDate, setSelectedDate] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [clickInsideCalendar, setClickInsideCalendar] = useState(false);

  // Reference to the input element
  const inputRef = useRef(null);
  const calendarRef = useRef(null);

  /**
   * useEffect to initialize the date with the current date if selectedDate is empty.
   */
  useEffect(() => {
    if (!selectedDate) {
      const currentDate = new Date();
      setSelectedDate(currentDate);
      setDateInput(formatDate(currentDate, dateFormat));
    }

    const handleClick = (event) => {
      if (event.target.closest("#calendar")) {
        handleCalendarClick();
        setSelectedDate(parseDateInput(dateInput));
      } else {
        handleClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [dateFormat, selectedDate, showCalendar, clickInsideCalendar, dateInput]);

  /**
   * Toggles the calendar visibility, opens only if errorMessage is null.
   */
  const toggleCalendar = () => {
    if (errorMessage === null) {
      setShowCalendar(!showCalendar);
    } else {
      // Reset input and selected date to current date if there is an error
      const currentDate = new Date();
      setDateInput(formatDate(currentDate, dateFormat));
      setSelectedDate(currentDate);
      setShowCalendar(false);
      setErrorMessage(null);
    }
  };

  const handleClickOutside = () => {
    if (showCalendar && !clickInsideCalendar) {
      // Ferme le calendrier et conserve la date
      setShowCalendar(false);
      setSelectedDate(parseDateInput(dateInput));
    }

    setClickInsideCalendar(false);
    calendarRef.current = showCalendar;
  };

  const handleCalendarClick = () => {
    if (!showCalendar) {
      setClickInsideCalendar(true);
      setDateInput(dateInput);
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

  const updateDate = (newDate) => {
    if (
      newDate &&
      !isNaN(newDate.getTime()) &&
      newDate.getFullYear() >= minYear &&
      newDate.getFullYear() <= maxYear &&
      newDate.getMonth() >= 0 &&
      newDate.getMonth() <= 11 &&
      newDate.getDate() >= 1 &&
      newDate.getDate() <=
        new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate()
    ) {
      setSelectedDate(newDate);
      setShowCalendar(true);
      setErrorMessage("");
    } else {
      setShowCalendar(false);
      setErrorMessage("Invalid date format");
    }
  };

  /**
   * Handles the change of the input date, parses the input and updates the state accordingly.
   * @param {Event} event - The input change event.
   */
  const handleDateChange = (inputValue) => {
    setDateInput(inputValue);
    updateDate(parseDateInput(inputValue));
    setShowCalendar(false);
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
      updateDate(parseDateInput(dateInput));
    } else if (e.code === "Escape") {
      if (!clickInsideCalendar) {
        setShowCalendar(false);
        setSelectedDate(parseDateInput(dateInput));
      }
      setErrorMessage(null);
    } else if (e.code !== "Tab") {
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
          type="text"
          placeholder="Select date"
          value={dateInput}
          onChange={(e) => handleDateChange(e.target.value)}
          onBlur={() => handleBlur}
          onKeyDown={handleKeyPress}
          style={inputStyle}
          className={`input-date ${inputClassName} focused`}
          autoFocus={showCalendar}
          data-cy="input-date"
          onMouseDown={toggleCalendar}
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
      {errorMessage !== null && errorClass !== errorMessage && (
        <p
          className={`error-message ${errorClass}`}
          style={{ borderColor: errorMessage !== null ? "red" : "" }}
        >
          {errorMessage}
        </p>
      )}

      {/* Custom calendar component */}
      {showCalendar && (
        <Calendar
          ref={calendarRef}
          data-cy="calendar"
          selectedDate={selectedDate}
          onSelect={handleCalendarDateClick}
          onDisplayChange={handleDisplayChange}
          onKeyPress={handleKeyPress}
          minYear={minYear}
          maxYear={maxYear}
          language={language}
          customStyles={{
            monthSelectClass: monthSelectClass || "default-month-select-class",
            yearSelectClass: yearSelectClass || "default-year-select-class",
            calendarStyle: {
              width: calendarWidth || "400px",
              height: calendarHeight || "auto",
            },

            buttonStyle: {
              backgroundColor: "#284bbd" || buttonBackgroundColor ,
              color: "#fff" || buttonColor,
            },
          }}
          // onClickInside={() => setClickInsideCalendar(true)}
          tabIndex={0}
          dateFormat={dateFormat}
        />
      )}
    </>
  );
}
