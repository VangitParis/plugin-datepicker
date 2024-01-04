import React from "react";
import DatePicker from "./lib/components/DatePicker/datePicker";
import './App.css';

function App({customClass}) {
  return (

      <main className={`main ${customClass}`}>
        <div className="form">
        {/* Label for the date input */}
          <label htmlFor="date" aria-label="date" className="label-date">
            Select your favorite date
          </label>
          <DatePicker
            minYear={2000}
            maxYear={2030}
            dateFormat="yyyy/MM/dd"
            language={"en-EN"}
            font="Roboto, sans-serif"
            fontSize="18px"
              />
        </div>
      </main>

  );
}

export default App;
