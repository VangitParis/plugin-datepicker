import React from "react";
import DatePicker from "./lib/components/DatePicker/datePicker.jsx";
import "./App.css";

function App({ customClass }) {
  return (
    <main className={`main ${customClass ? "custom-main-class" : ""}`}>
      <form className="form">
        {/* Label for the date input */}
        <label
          htmlFor="inputDate"
          aria-label="inputDate"
          className="label-date"
        >
          Select your favorite date
        </label>
        <DatePicker
          type="text"
          minYear={2000}
          maxYear={2030}
          dateFormat={"dd/MM/yyyy"}
          language={"en-EN"}
          font="Roboto, sans-serif"
          fontSize="16px"
          customInputClass={{ className: "custom-input-class" }}
          id="inputDate"
        />
      </form>
    </main>
  );
}

export default App;
