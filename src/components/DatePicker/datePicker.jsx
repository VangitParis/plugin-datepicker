import React, { useEffect, useState } from "react";
import Calendar from "../Calendar/calendar";
import { formatDate, parseDateInput } from "../../utils/modelisation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import "./datePicker.css";

export default function DatePicker() {
  const [selectedDate, setSelectedDate] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    // Mettre à jour la valeur du champ lorsqu'une nouvelle date est sélectionnée
    if (selectedDate) {
      setDateInput(formatDate(selectedDate));
    }
  }, [selectedDate]);
 
  //TO DO
  const handleDateChange = (event) => {
    const inputValue = event.target.value;
  
    // Vérifier si la saisie est une date valide
    const parsedDate = parseDateInput(inputValue);
  
    // Si la saisie n'est pas valide, effacer la sélection
    if (!parsedDate) {
      setSelectedDate(null);
    }
  
    // Mettre à jour l'entrée avec la valeur formatée
    setDateInput(parsedDate ? formatDate(parsedDate) : inputValue);
  };
  
  

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleCalendarDateClick = (date) => {
    setSelectedDate(date);
    setDateInput(formatDate(date));
    setShowCalendar(false);
  };

  const handleDisplayChange = (newDisplayedDate) => {
    setSelectedDate(newDisplayedDate);
    setDateInput(formatDate(newDisplayedDate));
  };



  const handleKeyPress = (event) => {
    // Vérifier si la touche saisie est un chiffre, le caractère "/", ou la touche de suppression (Backspace)
    const isValidInput = /^[0-9/]*$/.test(event.key) || event.key === 'Backspace';
  
    // Si la saisie n'est pas valide, empêcher l'événement par défaut
    if (!isValidInput) {
      event.preventDefault();
      return '';
    }
  };

  return (
    <main className="main">
      <div className="form">
        <label htmlFor="date" aria-label="date" className="label-date">
          Select your favorite date
        </label>
        <div className="input-container">
          <input
            id="date"
            type="text"
            placeholder="Select date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            onBlur={handleDateChange}
            onFocus={toggleCalendar}
            onKeyPress={handleKeyPress} 
            className="input-date"
            data-cy="input-date"
          />
          <FontAwesomeIcon
            icon={faCalendarDay}
            className="calendar-icon"
            onClick={toggleCalendar}
          ></FontAwesomeIcon>
        </div>
        {/* Calendrier personnalisé */}
        {showCalendar && (
          <div>
            <Calendar
              selectedDate={selectedDate}
              onSelect={handleCalendarDateClick}
              onDisplayChange={handleDisplayChange}
            />
          </div>
        )}
      </div>
    </main>
  );
}
