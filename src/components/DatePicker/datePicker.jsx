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

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Fonction lorque su'on clique sur une date, affiche dans l'input et ferme le calendrier
  const handleCalendarDateClick = (date) => {
    setSelectedDate(date);
    setDateInput(formatDate(date));
    setShowCalendar(false);
  };

  // Affiche le changement de date 
  const handleDisplayChange = (newDisplayedDate) => {
    setSelectedDate(newDisplayedDate);
    setDateInput(formatDate(newDisplayedDate));
  };

 // Fonction pour modifier la date initiale
  const handleDateChange = (event) => {
    const inputValue = event.target.value;
    setDateInput(inputValue);
    const newDate = parseDateInput(inputValue);

    if (newDate && !isNaN(newDate.getTime())) {
      setSelectedDate(newDate);
    }
  };

  // TO-DO //
  // Quand la touche 'ENTRER' est pressée ouvrir le calendrier et afficher la date saisie
  const handleKeyPress = (event) => {
    //Empêcher la saisie de caractères spéciaux ou alphabétiques 
    // avec une regex
    // TO-DO

    if (event.key === "Enter") {
      console.log('enter');
      const inputValue = event.target.value;
    setDateInput(inputValue);
    const parsedDate = parseDateInput(inputValue);

      if (parsedDate) {
        setSelectedDate(parsedDate);
        setShowCalendar(true); // Afficher le calendrier
      } else {
        // Si la saisie n'est pas une date valide, empêcher l'événement par défaut
        event.preventDefault();
      }
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
            onKeyDown={handleKeyPress}
            className="input-date"
            data-cy="input-date"
          />
          <FontAwesomeIcon
            icon={faCalendarDay}
            className="calendar-icon"
            data-cy={"calendar-icon"}
            onClick={toggleCalendar}
          ></FontAwesomeIcon>
        </div>
        {/* Calendrier personnalisé */}
        {showCalendar && (
          <Calendar
            selectedDate={selectedDate}
            onSelect={handleCalendarDateClick}
            onDisplayChange={handleDisplayChange}
          />
        )}
      </div>
    </main>
  );
}
