import React, { useState } from "react";
import "./calendar.css";

export default function Calendar({ onSelect }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = [...Array(31).keys()];
  const months = Array.from({ length: 12 }, (_, index) => index);

  const handleDayClick = (day) => {
    // Implémente la logique pour mettre à jour la date sélectionnée
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      day
    );
    if (onSelect) {
      onSelect(newDate);
    }
  };

  // Générer une liste d'années, par exemple, de 10 ans en arrière à 10 ans en avant
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 21 },
    (_, index) => currentYear - 10 + index
  );

  return (
    <div className="calendar">
      <div className="calendar__opts">
        <select
          name="calendar__month"
          id="calendar__month"
          value={selectedDate.getMonth()}
          onChange={(e) => {
            const newMonth = new Date(selectedDate);
            newMonth.setMonth(parseInt(e.target.value, 10));
            setSelectedDate(newMonth);
          }}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {new Date(2000, month, 1).toLocaleDateString("default", {
                month: "short",
              })}
            </option>
          ))}
        </select>
        {/* Sélecteur d'année */}
        <select
          name="calendar__year"
          id="calendar__year"
          value={selectedDate.getFullYear()}
          onChange={(e) => {
            const newYear = new Date(selectedDate);
            newYear.setFullYear(parseInt(e.target.value, 10));
            setSelectedDate(newYear);
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
        {/* Jours de la semaine */}
        <div className="calendar__days">
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
          <div>S</div>
        </div>
        {/* Dates du mois */}
        <div className="calendar__dates">
          {/* Exemple de dates - À remplacer par la logique dynamique */}
          {daysInMonth.map((day) => (
            <div
              key={day + 1}
              className="calendar__date"
              onClick={() => handleDayClick(day + 1)}
            >
              <span>
                { day + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
