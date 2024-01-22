import React, { useState, useRef, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../../utils/modelisation";
import {
  faChevronLeft,
  faChevronRight,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import "./calendar.css";

/**
 * Calendar Component
 *
 * @param {{
 *   onSelect: Function,
 *   selectedDate: Date,
 *   onDisplayChange: Function,
 *   onKeyPress: Function,
 *   minYear: number,
 *   maxYear: number,
 *   language: string,
 *   customStyles: {
 *     monthSelectClass: string,
 *     yearSelectClass: string,
 *     calendarStyle: Object,
 *     buttonStyle: Object,
 *     dateStyle: Object,
 *   },
 * }} props - Component properties.
 * @param {React.Ref} ref - Forwarded ref.
 * @returns {JSX.Element} The rendered Calendar component.
 */
function Calendar(
  {
    onSelect,
    onChange,
    selectedDate,
    onDisplayChange,
    minYear,
    maxYear,
    language,
    customStyles,
  },
  ref
) {
  const [displayed, setDisplayedMonth] = useState(selectedDate || new Date());
  const [isMonthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setYearDropdownOpen] = useState(false);

  // References to DOM elements for various parts of the calendar.
  const monthSelectRef = useRef(null);
  const yearSelectRef = useRef(null);
  const daySelectRef = useRef();
  const homeButtonRef = useRef();

  // Array of month indices
  const months = Array.from({ length: 12 }, (_, index) => index);

  // Interval of years based on minYear and maxYear properties
  const years = Array.from(
    { length: maxYear - minYear + 1 },

    (_, index) => minYear + index
  );

  /**
   * Get the first day of the displayed month.
   *
   * @returns {Date} The first day of the displayed month.
   */
  const getFirstDayOfMonth = () => {
    const firstDayOfMonth = new Date(displayed);
    firstDayOfMonth.setDate(1);
    return firstDayOfMonth;
  };

  /**
   * Get the days of the displayed month with offset.
   *
   * @returns {number[]} The days of the month with offset.
   */
  const getDaysInMonthWithOffset = () => {
    try {
      const firstDayOfMonth = getFirstDayOfMonth();

      const firstDayOfWeek = firstDayOfMonth.getDay();

      const daysInMonth = new Date(
        displayed.getFullYear(),
        displayed.getMonth() + 1,
        0
      ).getDate();

      const offset = firstDayOfWeek;

      const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
      const daysWithOffset = [...Array(offset).fill(null), ...days];

      return daysWithOffset;
    } catch (error) {
      console.error("Error in getDaysInMonthWithOffset:", error);
      return [];
    }
  };

  /**
   * Handle month change based on the given offset.
   *
   * @param {number} offset - The offset to change the month.
   */
  const handleMonthChange = (offset) => {
    const newDisplayedMonth = new Date(displayed);
    newDisplayedMonth.setMonth(displayed.getMonth() + offset);

    // Get last day of month
    const lastDayOfMonth = new Date(
      newDisplayedMonth.getFullYear(),
      newDisplayedMonth.getMonth() + 1,
      0
    ).getDate();

    // Adjust the day if the current day is greater than the last day of the month
    if (displayed.getDate() > lastDayOfMonth) {
      newDisplayedMonth.setDate(lastDayOfMonth);
    }

    // Check if the current date is still valid after adjusting the month
    if (newDisplayedMonth.getDate() !== displayed.getDate()) {
      newDisplayedMonth.setDate(0); // Move to the last day of the previous month
    }

    setDisplayedMonth(newDisplayedMonth);

    if (onDisplayChange) {
      onDisplayChange(newDisplayedMonth);
    }
  };

  /**
   * Handle click on the home button to reset to the current month.
   */
  const handleHomeClick = () => {
    const initialDate = new Date();
    setDisplayedMonth(initialDate);
   
    if (onDisplayChange) {
      onDisplayChange(initialDate);
    }
    
  };

  /**
   * Handle date selection for the given day.
   *
   * @param {number} day - The selected day.
   */
  const handleDateSelection = (day) => {
    const newDate = new Date(
      displayed.getFullYear(),
      displayed.getMonth(),
      day
    );

    setDisplayedMonth(newDate);

    if (onSelect) {
      onSelect(newDate);
    }

    if (onDisplayChange) {
      onDisplayChange(newDate);
    }

    if (onChange) {
      onChange(formatDate(newDate));
    }
  };

  /**
   * Check if the given day is the currently displayed and selected date.
   *
   * @param {number} day - The day to check.
   * @returns {boolean} True if the day is the selected date, otherwise false.
   */
  const isSelectedDate = (day) => {
    return displayed && day === displayed.getDate();
  };

  /**
   * Handle dropdown click for the year and month selection.
   *
   * @param {number} selectedYear - The selected year.
   * @param {number} selectedMonth - The selected month.
   */
  const handleDropdownClick = (selectedYear, selectedMonth) => {
    const newDate = new Date(selectedYear, selectedMonth, displayed.getDate());
    setDisplayedMonth(newDate);

    if (onDisplayChange) {
      onDisplayChange(newDate);
    }

    // Update year and month of the input
    yearSelectRef.current.value = selectedYear;
    monthSelectRef.current.value = selectedMonth;

    // Close dropdown list
    setMonthDropdownOpen(false);
    setYearDropdownOpen(false);
    yearSelectRef.current.size = 1;
    monthSelectRef.current.size = 1;
  };

  /**
   * Handle key press for the selected day.
   *
   * @param {number} selectDay - The selected day.
   */
  const handleDayKeyPress = (e, selectDay) => {
    if (daySelectRef.current) {
      const newDate = new Date(
        displayed.getFullYear(),
        displayed.getMonth(),
        selectDay
      );
      setDisplayedMonth(newDate);

      if (onDisplayChange) {
        onDisplayChange(newDate);
      }

      daySelectRef.current.value = selectDay;
    }
  };

  

  // Select class for customize
  const monthSelectClass = customStyles?.monthSelectClass || {};
  const yearSelectClass = customStyles?.yearSelectClass || {};

  // Custom styles
  const calendarStyle = customStyles?.calendarStyle || {};
  const buttonStyle = customStyles?.buttonStyle || {};
  const dateStyle = customStyles?.dateStyle || {};
  const dropdownStyle = customStyles?.dropdownStyle || {};

  // Render the JSX Calendar Component
  return (
    <div
      id="calendar"
      className={`calendar ${calendarStyle ? "custom-calendar-style" : ""}`}
      data-cy="calendar"
      style={calendarStyle}
      ref={ref}
    >
      <div className="calendar__opts">
        <select
          ref={monthSelectRef}
          name="calendar__month"
          id="calendar__month"
          value={displayed.getMonth()}
          onChange={(e) => {
            const newMonth = new Date(displayed);
            newMonth.setMonth(parseInt(e.target.value, 10));
            setDisplayedMonth(newMonth);
            if (onDisplayChange) {
              onDisplayChange(newMonth);
            }
          }}
          className={`month-dropdown ${
            monthSelectClass ? "custom-month-select-style" : ""
          } ${isMonthDropdownOpen ? "custom-dropdown-open" : ""}`}
          style={dropdownStyle}
          tabIndex={0}
          onFocus={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.target.classList.add("focused");

            // Is monthSelectRef.current  defined
            if (monthSelectRef.current) {
              setMonthDropdownOpen(true);
              monthSelectRef.current.size = 4;
            }
          }}
          onBlur={(e) => {
            e.target.classList.remove("focused");
            // close dropdown if is open
            if (isMonthDropdownOpen && monthSelectRef.current) {
              setMonthDropdownOpen(false);
              monthSelectRef.current.size = 1;
            }
          }}
          onKeyDown={(e) => {
            if (e.code === "Enter" && !isMonthDropdownOpen) {
              e.preventDefault();

              setMonthDropdownOpen(true);

              monthSelectRef.current.size = 2;
            } else if (e.code === "Enter" && isMonthDropdownOpen) {
              e.preventDefault();

              // Get month select value
              const selectedMonth = parseInt(monthSelectRef.current.value, 10);
              // Update date with function handleDropdownClick
              handleDropdownClick(displayed.getFullYear(), selectedMonth);
            }
          }}
        >
          {months.map((month, index) => (
            <option
              key={month}
              value={month}
              data-cy="calendar-month-option"
              tabIndex={index + 1}
              onClick={() =>
                handleDropdownClick(
                  displayed.getFullYear(),
                  month,
                  displayed.getDate()
                )
              }
            >
              {new Date(2000, month, 1).toLocaleDateString(language, {
                month: "long",
              })}
            </option>
          ))}
        </select>
        <select
          ref={yearSelectRef}
          name="calendar__year"
          id="calendar__year"
          value={displayed.getFullYear()}
          onChange={(e) => {
            e.stopPropagation();
            const newYear = new Date(displayed);
            newYear.setFullYear(parseInt(e.target.value, 10));
            setDisplayedMonth(newYear);
            if (onDisplayChange) {
              onDisplayChange(newYear);
            }
          }}
          className={`year-dropdown ${
            yearSelectClass ? "custom-year-select-style" : ""
          } ${isYearDropdownOpen ? "custom-dropdown-open" : ""}`}
          style={dropdownStyle}
          tabIndex={0}
          onFocus={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.target.classList.add("focused");

            if (yearSelectRef.current) {
              setYearDropdownOpen(true);
              yearSelectRef.current.size = 4;
            }
          }}
          onBlur={(e) => {
            e.target.classList.remove("focused");

            if (isYearDropdownOpen && yearSelectRef.current) {
              setYearDropdownOpen(false);
              yearSelectRef.current.size = 1;
            }
          }}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              e.preventDefault();

              // Select Option
              const selectedYear = parseInt(e.target.value, 10);
              handleDropdownClick(selectedYear, displayed.getMonth());
            }
          }}
        >
          {years.map((year, index) => (
            <option
              key={year}
              value={year}
              tabIndex={index + 1}
              onClick={() =>
                handleDropdownClick(
                  year,
                  displayed.getMonth(),
                  displayed.getDate()
                )
              }
            >
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="calendar__body">
        {displayed && (
          <div className="flex-between-center">
            <button
              className={`btn arrow-left ${
                buttonStyle ? "custom-button-style" : ""
              }`}
              style={buttonStyle}
              data-cy="arrow-left"
              tabIndex={0}
              onClick={() => handleMonthChange(-1)}
             
            >
              <FontAwesomeIcon icon={faChevronLeft} className="icon" />
            </button>
            <button
              ref={homeButtonRef}
              className={`btn icon-home ${
                buttonStyle ? "custom-button-style" : ""
              }`}
              style={buttonStyle}
              data-cy="icon-home"
              tabIndex={0}
              onClick={handleHomeClick}
             
            >
              <FontAwesomeIcon icon={faHome} className="icon" />
            </button>

            <button
              className={`btn arrow-right ${
                buttonStyle ? "custom-button-style" : ""
              }`}
              style={buttonStyle}
              data-cy="arrow-right"
              tabIndex={0}
              onClick={() => handleMonthChange(1)}
            >
              <FontAwesomeIcon icon={faChevronRight} className="icon" />
            </button>
          </div>
        )}
        {/* Days of the Week */}
        <div className="calendar__days" data-cy="calendar__days">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>

        {/* Calendar Dates */}
        <div className="calendar__dates">
          {getDaysInMonthWithOffset().map((day, index) => (
            <div
              ref={daySelectRef}
              key={index}
              className={`calendar__date ${
                isSelectedDate(day) ? "selected" : ""
              } ${dateStyle ? "custom-date-style" : ""} ${
                day > 0 ? "current-month" : "other-month"
              }`}
              style={dateStyle}
              onClick={() => handleDateSelection(day)}
              data-cy="calendar-date"
              tabIndex={day > 0 ? 0 : -1}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  e.preventDefault();
                  handleDayKeyPress(day);
                  handleDateSelection(day);
                } else if (
                  e.code === "Tab" &&
                  !e.shiftKey &&
                  day === getDaysInMonthWithOffset().slice(-1)[0]
                ) {
                  // If the Tab key is pressed without the Shift key on the last day, move focus to the Home button.
                  if (homeButtonRef.current) {
                    e.preventDefault();
                    homeButtonRef.current.focus();
                  }
                }
              }}
            >
              <span className="calendar-day" data-cy="calendar-day">
                {day > 0 ? day : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default forwardRef(Calendar);
