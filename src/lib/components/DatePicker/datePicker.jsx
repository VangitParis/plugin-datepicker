import React, { useEffect, useState, useRef } from "react";
import Calendar from "../Calendar/calendar";
import { formatDate, parseDateInput } from "../../utils/modelisation.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import "./datePicker.css";

/**
 * DatePicker Component
 *
 * @param {{
 *   minYear: number,
 *   maxYear: number,
 *   customInputClass: string,
 *   dateFormat: string,
 *   language: string,
 *   errorClass: string,
 *   errorMessage : string,
 *   customStyles: {
 *     calendarStyle: Object,
 *     monthSelectClass: Object,
 *     yearSelectClass: Object,
 *     buttonStyle: Object,
 *     dateStyle: Object,
 *   },
 * }} props - The component properties.
 *
 * @returns {JSX.Element} The rendered DatePicker component.
 */
export default function DatePicker({
  minYear,
  maxYear,
  dateFormat,
  language,
  customInputClass,
  errorClass: externalErrorClass,
  errorMessage: externalErrorMessage,
  id,
  type,
  customStyles: {
    calendarStyle,
    monthSelectClass,
    yearSelectClass,
    buttonStyle,
    dateStyle,
  } = {},
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

  /**
   * Handles click outside of the calendar, closes the calendar and selects the input value.
   */
  const handleClickOutside = () => {
    if (showCalendar && !clickInsideCalendar) {
      // Close calendar and select value of input
      setShowCalendar(false);
      setSelectedDate(parseDateInput(dateInput));
    }

    setClickInsideCalendar(false);
    calendarRef.current = showCalendar;
  };

  /**
   * Handles click inside the calendar, sets clickInsideCalendar to true.
   */
  const handleCalendarClick = () => {
    if (!showCalendar) {
      setClickInsideCalendar(false);
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

  /**
   * Updates the selected date if the new date is valid, otherwise sets an error message.
   * @param {Date} newDate - The new date.
   */
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
      setErrorMessage(null);
    } else {
      setShowCalendar(false);
      setErrorMessage("Invalid date format");
    }
  };

  /**
   * Handles the change of the input date, parses the input and updates the state accordingly.
   * @param {string} inputValue - The input value.
   */
  const handleDateChange = (inputValue) => {
    setDateInput(inputValue);
    updateDate(parseDateInput(inputValue));
    setShowCalendar(false);
  };

  /**
   * Handles blur event, updates the date based on the input value.
   */
  const handleBlur = () => {
    handleDateChange(dateInput);
  };

  /**
   * Handles key press events, opens the calendar and displays the entered date on 'Enter'.
   * @param {Event} e - The key press event.
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

  // JSX for rendering the component
  return (
    <>
      <div className="input-container">
        {/* Input element for date selection */}
        <input
          ref={inputRef}
          id={id}
          type={type}
          placeholder="Select date"
          value={dateInput}
          onChange={(e) => handleDateChange(e.target.value)}
          autoFocus={showCalendar}
          onBlur={handleBlur}
          // onKeyDown={handleKeyPress}
          className={`input-date ${
            externalErrorClass || errorMessage !== null ? "error-border" : ""
          } ${customInputClass ? customInputClass.className : ""} focused`}
          data-cy="input-date"
          onMouseDown={toggleCalendar}
        />
        {/* Calendar icon for opening/closing the calendar */}
        <FontAwesomeIcon
          icon={faCalendarDay}
          className="calendar-icon"
          data-cy={"calendar-icon"}
          onClick={toggleCalendar}
          // onFocus={toggleCalendar}
          tabIndex={0}
          onKeyDown={handleKeyPress}
        ></FontAwesomeIcon>
      </div>

      {/* Display error message if there is an error */}
      {errorMessage !== null && (
        <p
          className={`error-message ${externalErrorClass || "custom-error-message"}`}
          
        >
          {externalErrorMessage || errorMessage}
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
            monthSelectClass,
            yearSelectClass,
            calendarStyle,
            buttonStyle,
            dateStyle,
          }}
          tabIndex={0}
          dateFormat={dateFormat}
        />
      )}
    </>
  );
}
