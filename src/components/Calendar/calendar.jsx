import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

import "./calendar.css";

export default function Calendar({ onSelect, selectedDate, onDisplayChange }) {
  const [displayed, setDisplayedMonth] = useState(selectedDate || new Date());

  const months = Array.from({ length: 12 }, (_, index) => index);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 201 },
    (_, index) => currentYear - 100 + index
  );

  const getFirstDayOfMonth = () => {
    return new Date(displayed.getFullYear(), displayed.getMonth(), 1);
  };

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

  const handleMonthChange = (offset) => {
    const newDisplayedMonth = new Date(displayed);
    newDisplayedMonth.setMonth(displayed.getMonth() + offset);
    setDisplayedMonth(newDisplayedMonth);
    if (onDisplayChange) {
      onDisplayChange(newDisplayedMonth);
    }
  };

  const handleHomeClick = () => {
    const initialDate = new Date();
    setDisplayedMonth(initialDate);
    if (onSelect) {
      onSelect(initialDate);
    }
  };

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

  const isSelectedDate = (day) => {
    return displayed && day === displayed.getDate();
  };

  return (
    <div className="calendar">
      <div className="calendar__opts">
        <select
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
        >
          {months.map((month) => (
            <option key={month} value={month} data-cy="calendar-month-option">
              {new Date(2000, month, 1).toLocaleDateString("en-US", {
                month: "long",
              })}
            </option>
          ))}
        </select>
        <select
          name="calendar__year"
          id="calendar__year"
          value={displayed.getFullYear()}
          onChange={(e) => {
            const newYear = new Date(displayed);
            newYear.setFullYear(parseInt(e.target.value, 10));
            setDisplayedMonth(newYear);
            if (onDisplayChange) {
              onDisplayChange(newYear);
            }
          }}
        >
          {years.map((year) => (
            <option key={year} value={year}>
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
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              className="btn icon-home"
              data-cy="icon-home"
              onClick={handleHomeClick}
            >
              <FontAwesomeIcon icon={faHome} />
            </button>

            <button
              className="btn arrow-right"
              data-cy="arrow-right"
              onClick={() => handleMonthChange(1)}
            >
              <FontAwesomeIcon icon={faChevronRight} />
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
              key={index}
              className={`calendar__date ${
                isSelectedDate(day) ? "selected" : ""
              }`}
              onClick={() => handleDateSelection(day)}
              data-cy="calendar-date"
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
