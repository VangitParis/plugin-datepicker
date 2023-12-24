import React, { useState } from "react";
import Calendar from "../Calendar/calendar";
import "./datePicker.css";

export default function DatePicker() {
  const [selectedDate, setSelectedDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (event) => {
    // Implémente la logique pour mettre à jour la date sélectionnée
    setSelectedDate(new Date(event.target.value));
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleCalendarDateClick = (date) => {
    // Implémente la logique pour mettre à jour la date sélectionnée depuis le calendrier
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <main>
      <form>
        <label htmlFor="date" aria-label="date" className="label-date">
          Saisir une date
        </label>
        <input
          id="date"
          type="text"
          placeholder="Sélectionnez une date"
          value={selectedDate ? formatDate(selectedDate) : ""}
          onChange={handleDateChange}
          onFocus={toggleCalendar}
          className="input-date"
        />
        {/* Calendrier personnalisé */}
        {showCalendar && (
          <div>
            <Calendar onSelect={handleCalendarDateClick} />
          </div>
        )}
      </form>
    </main>
  );
}
