import React from "react";
import DatePicker from "./components/DatePicker/datePicker";


function App() {
  return (
    <div className="App">
      <DatePicker
        minYear={2000}
        maxYear={2030}
        customClass="custom-datepicker"
        dateFormat="yyyy/MM/dd"
        language={"en-EN"}
        font="Roboto, sans-serif"
        fontSize="18px"
      />
    </div>
  );
}

export default App;
