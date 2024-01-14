"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DatePicker;
var _react = _interopRequireWildcard(require("react"));
var _calendar = _interopRequireDefault(require("../Calendar/calendar"));
var _modelisation = require("../../utils/modelisation.js");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
require("./datePicker.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * React component for a date picker.
 * @param {{minYear : number, maxYear: number, customClass: string, dateFormat:string, dateFormat:string, language:string,font:string, fontSize:string,
 * errorClass:string, backgroundColor:string,color:string,width:number,height:number,calendarWidth:number,calendarHeight:number,buttonStyle:string,monthSelectClass:string,yearSelectClass:string }}
 */
function DatePicker(_ref) {
  let {
    minYear,
    maxYear,
    dateFormat,
    language,
    customInputClass,
    // font,
    // fontSize,
    errorClass,
    // backgroundColor,
    // color,
    // width,
    // height,
    monthSelectClass,
    yearSelectClass,
    customStyles: {
      calendarStyle,
      buttonStyle,
      dateStyle
    } = {}
  } = _ref;
  // State variables for managing the selected date, input value, calendar visibility, and error message
  const [selectedDate, setSelectedDate] = (0, _react.useState)("");
  const [dateInput, setDateInput] = (0, _react.useState)("");
  const [showCalendar, setShowCalendar] = (0, _react.useState)(false);
  const [errorMessage, setErrorMessage] = (0, _react.useState)(null);
  const [clickInsideCalendar, setClickInsideCalendar] = (0, _react.useState)(false);

  // Reference to the input element
  const inputRef = (0, _react.useRef)(null);
  const calendarRef = (0, _react.useRef)(null);

  /**
   * useEffect to initialize the date with the current date if selectedDate is empty.
   */
  (0, _react.useEffect)(() => {
    if (!selectedDate) {
      const currentDate = new Date();
      setSelectedDate(currentDate);
      setDateInput((0, _modelisation.formatDate)(currentDate, dateFormat));
    }
    const handleClick = event => {
      if (event.target.closest("#calendar")) {
        handleCalendarClick();
        setSelectedDate((0, _modelisation.parseDateInput)(dateInput));
      } else {
        handleClickOutside();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [dateFormat, selectedDate, showCalendar, clickInsideCalendar, dateInput]);

  /**
   * Toggles the calendar visibility, opens only if errorMessage is null.
   */
  const toggleCalendar = () => {
    if (errorMessage === null) {
      setShowCalendar(!showCalendar);
    } else {
      // Reset input and selected date to current date if there is an error
      const currentDate = new Date();
      setDateInput((0, _modelisation.formatDate)(currentDate, dateFormat));
      setSelectedDate(currentDate);
      setShowCalendar(false);
      setErrorMessage(null);
    }
  };
  const handleClickOutside = () => {
    if (showCalendar && !clickInsideCalendar) {
      // Close calendar and select value of input
      setShowCalendar(false);
      setSelectedDate((0, _modelisation.parseDateInput)(dateInput));
    }
    setClickInsideCalendar(false);
    calendarRef.current = showCalendar;
  };
  const handleCalendarClick = () => {
    if (!showCalendar) {
      setClickInsideCalendar(true);
      setDateInput(dateInput);
    }
  };

  /**
   * Handles the click on a date in the calendar, updates the input, and closes the calendar.
   * @param {Date} date - The selected date.
   */
  const handleCalendarDateClick = date => {
    setSelectedDate(date);
    setDateInput((0, _modelisation.formatDate)(date));
    setShowCalendar(false);
    setErrorMessage(null);
  };

  /**
   * Handles the change of displayed date in the calendar.
   * @param {Date} newDisplayedDate - The newly displayed date.
   */
  const handleDisplayChange = newDisplayedDate => {
    setSelectedDate(newDisplayedDate);
    setDateInput((0, _modelisation.formatDate)(newDisplayedDate));
    setErrorMessage(null);
  };
  const updateDate = newDate => {
    if (newDate && !isNaN(newDate.getTime()) && newDate.getFullYear() >= minYear && newDate.getFullYear() <= maxYear && newDate.getMonth() >= 0 && newDate.getMonth() <= 11 && newDate.getDate() >= 1 && newDate.getDate() <= new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate()) {
      setSelectedDate(newDate);
      setShowCalendar(true);
      setErrorMessage("");
    } else {
      setShowCalendar(false);
      setErrorMessage("Invalid date format");
    }
  };

  /**
   * Handles the change of the input date, parses the input and updates the state accordingly.
   * @param {Event} event - The input change event.
   */
  const handleDateChange = inputValue => {
    setDateInput(inputValue);
    updateDate((0, _modelisation.parseDateInput)(inputValue));
    setShowCalendar(false);
  };
  const handleBlur = () => {
    handleDateChange(dateInput);
  };

  /**
   * Handles key press events, opens the calendar and displays the entered date on 'Enter'.
   * @param {Event} event - The key press event.
   */
  const handleKeyPress = e => {
    if (e.code === "Enter") {
      updateDate((0, _modelisation.parseDateInput)(dateInput));
    } else if (e.code === "Escape") {
      if (!clickInsideCalendar) {
        setShowCalendar(false);
        setSelectedDate((0, _modelisation.parseDateInput)(dateInput));
      }
      setErrorMessage(null);
    } else if (e.code !== "Tab") {
      setShowCalendar(false);
    }
  };

  // JSX for rendering the component
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "input-container"
  }, /*#__PURE__*/_react.default.createElement("input", {
    ref: inputRef,
    id: "date",
    type: "text",
    placeholder: "Select date",
    value: dateInput,
    onChange: e => handleDateChange(e.target.value),
    onBlur: () => handleBlur,
    onKeyDown: handleKeyPress,
    className: "input-date ".concat(customInputClass ? customInputClass.className : "", " focused"),
    autoFocus: showCalendar,
    "data-cy": "input-date",
    onMouseDown: toggleCalendar
  }), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faCalendarDay,
    className: "calendar-icon",
    "data-cy": "calendar-icon",
    onClick: toggleCalendar,
    onFocus: toggleCalendar,
    tabIndex: 0
  })), errorMessage !== null && errorClass !== errorMessage && /*#__PURE__*/_react.default.createElement("p", {
    className: "error-message ".concat(errorClass ? "custom-error-message" : ""),
    style: {
      borderColor: errorMessage !== null ? "red" : ""
    }
  }, errorMessage), showCalendar && /*#__PURE__*/_react.default.createElement(_calendar.default, {
    ref: calendarRef,
    "data-cy": "calendar",
    selectedDate: selectedDate,
    onSelect: handleCalendarDateClick,
    onDisplayChange: handleDisplayChange,
    onKeyPress: handleKeyPress,
    minYear: minYear,
    maxYear: maxYear,
    language: language,
    customStyles: {
      monthSelectClass,
      yearSelectClass,
      calendarStyle,
      buttonStyle,
      dateStyle
    },
    tabIndex: 0,
    dateFormat: dateFormat
  }));
}