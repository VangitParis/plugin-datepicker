import React from "react";

export default function DatePickerInput({
  dateInput,
  onChange,
  onBlur,
  onKeyDown,
  inputStyle,
  showCalendar,
  inputRef,
}) {
  return (
    <input
      ref={inputRef}
      id="date"
      type="datetime"
      placeholder="Select date"
      value={dateInput}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      style={inputStyle}
      className="input-date"
      autoFocus={showCalendar}
    />
  );
};


