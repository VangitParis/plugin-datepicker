import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import "./calendar.css";

/**
 * Calendar Component
 *
 * @component
 * @typedef {Object} CalendarProps
 * @property {Function} onSelect - Callback function when a date is selected.
 * @property {Date} selectedDate - The currently selected date.
 * @property {Function} onDisplayChange - Callback function when the displayed month changes.
 * @property {Function} onKeyPress - Callback function when a key is pressed.
 * @property {number} minYear - The minimum selectable year.
 * @property {number} maxYear - The maximum selectable year.
 * @property {string} language - The language used for month names.
 * @property {Object} customStyles - Custom styles for the component.
 *   @property {string} customStyles.selectClass - Custom class for the select elements.
 *
 * @param {CalendarProps} props - The component properties.
 * @returns {JSX.Element} The rendered Calendar component.
 */
export default function Calendar({
  onSelect,
  selectedDate,
  onDisplayChange,
  minYear,
  maxYear,
  language,
  customStyles,
}) {
  const [displayed, setDisplayedMonth] = useState(selectedDate || new Date());
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const monthSelectRef = useRef();
  const yearSelectRef = useRef();
  const daySelectRef = useRef();

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
    return new Date(displayed.getFullYear(), displayed.getMonth(), 1);
  };

  /**
   * Get the days of the displayed month with offset.
   *
   * @returns {number[]} The days of the month with offset.
   */
  const getDaysInMonthWithOffset = () => {
    const firstDayOfMonth = getFirstDayOfMonth();
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = new Date(
      displayed.getFullYear(),
      displayed.getMonth() + 1,
      0
    ).getDate();

    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
    const daysWithOffset = [...Array(firstDayOfWeek).fill(null), ...days];
    return daysWithOffset;
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
    if (onSelect) {
      onSelect(initialDate);
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

    // Updtae year and month of the input
    yearSelectRef.current.value = selectedYear;
    monthSelectRef.current.value = selectedMonth;

    // Close dropdown list
    setDropdownOpen(false);
    yearSelectRef.current.size = 1;
    monthSelectRef.current.size = 1;
  };

  /**
   * Handle key press for the selected day.
   *
   * @param {number} selectDay - The selected day.
   */
  const handleDayKeyPress = (selectDay) => {
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
  };

  // Select class for styling select elements, using custom class if provided
  const selectClass = customStyles?.selectClass || "default-select-class";

  // Render the Calendar component
  return (
    <div className="calendar">
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
          className={`default-select-class ${selectClass}`}
          tabIndex={0}
          onFocus={(e) => {
            if (!isDropdownOpen) {
              e.preventDefault(); // Disabled dropdown default
              e.target.classList.add("focused");

              // Open dropdown
              setDropdownOpen(true);
              monthSelectRef.current.size = 6;
            }
          }}
          onBlur={(e) => {
            e.target.classList.remove("focused");
          }}
          onKeyDown={(e) => {
            console.log("key code:", e.code);
            if (e.code === "Enter" && !isDropdownOpen) {
              e.preventDefault();

              setDropdownOpen(true);

              monthSelectRef.current.size = 2;
            } else if (e.code === "Enter" && isDropdownOpen) {
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
          className={`default-select-class ${selectClass}`}
          tabIndex={0}
          onFocus={(e) => {
            if (!isDropdownOpen) {
              e.preventDefault();
              e.target.classList.add("focused");

              setDropdownOpen(true);
              yearSelectRef.current.size = 6;
            }
          }}
          onBlur={(e) => {
            e.target.classList.remove("focused");
          }}
          onKeyDown={(e) => {
            console.log("key code:", e.code);
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
              className="btn arrow-left"
              data-cy="arrow-left"
              onClick={() => handleMonthChange(-1)}
            >
              <FontAwesomeIcon icon={faChevronLeft} tabIndex={0} />
            </button>
            <button
              className="btn icon-home"
              data-cy="icon-home"
              onClick={handleHomeClick}
            >
              <FontAwesomeIcon icon={faHome} tabIndex={0} />
            </button>

            <button
              className="btn arrow-right"
              data-cy="arrow-right"
              onClick={() => handleMonthChange(1)}
            >
              <FontAwesomeIcon icon={faChevronRight} tabIndex={0} />
            </button>
          </div>
        )}

        <div className="calendar__days">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>

        <div className="calendar__dates">
          {getDaysInMonthWithOffset().map((day, index) => (
            <div
              ref={daySelectRef}
              key={index}
              className={`calendar__date ${
                isSelectedDate(day) ? "selected" : ""
              }`}
              onClick={() => handleDateSelection(day)}
              data-cy="calendar-date"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  e.preventDefault();

                  handleDayKeyPress(day);
                  handleDateSelection(day);
                }
              }}
            >
              <span className="calendar-day" data-cy="calendar-day">
                {day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
