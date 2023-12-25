import React, { useState } from "react";


import Calendar from "../Calendar/calendar";
import "./datePicker.css";
import { formatDate } from "../../utils/modelisation";

export default function DatePicker() {
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  window.selectedDate = selectedDate;

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



  return (
    <main>
      <form>
        <label htmlFor="date" aria-label="date" className="label-date">
          Saisir une date
        </label>
        <input
          id="date"
          type="text"
          placeholder="Select date"
          value={selectedDate ? formatDate(selectedDate) : ""}
          onChange={handleDateChange}
          onFocus={toggleCalendar}
          className="input-date"
          data-cy="input-date"
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
