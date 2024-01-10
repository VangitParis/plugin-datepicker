import React from "react";
import DatePicker from "./lib/components/DatePicker/datePicker.jsx";
import "./App.css";

function App({ customClass }) {
  console.log("Custom Class in App:", customClass);
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
          dateFormat="dd/MM/yyyy"
          language={"en-EN"}
          font="Roboto, sans-serif"
          fontSize="16px"
          errorClass={"error-message"}
          buttonBackgroundColor="#284bbd"
          buttonColor="#fff"
          monthSelectClass="default-month-select-class"
          yearSelectClass="default-year-select-class"
        />
      </div>
    </main>
  );
}

export default App;
