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
 * DatePicker Component
 *
 * @param {{
 *   minYear: number,
 *   maxYear: number,
 *   customInputClass: string,
 *   dateFormat: string,
 *   language: string,
 *   errorClass: string,
 *   errorMessage : string,
 *   customStyles: {
 *     calendarStyle: Object,
 *     monthSelectClass: Object,
 *     yearSelectClass: Object,
 *     buttonStyle: Object,
 *     dateStyle: Object,
 *   },
 * }} props - The component properties.
 *
 * @returns {JSX.Element} The rendered DatePicker component.
 */
function DatePicker(_ref) {
  let {
    showCurrentDateOnMount = false,
    minYear,
    maxYear,
    dateFormat,
    language,
    customInputClass,
    errorClass: externalErrorClass,
    errorMessage: externalErrorMessage,
    showError = true,
    id,
    type,
    placeholder,
    onChange,
    resetState,
    customStyles: {
      calendarStyle,
      monthSelectClass,
      yearSelectClass,
      buttonStyle,
      dateStyle,
      dropdownStyle
    } = {}
  } = _ref;
  // State variables for managing the selected date, input value, calendar visibility, and error message
  const [selectedDate, setSelectedDate] = (0, _react.useState)("");
  const [dateInput, setDateInput] = (0, _react.useState)("");
  const [showCalendar, setShowCalendar] = (0, _react.useState)(false);
  const [errorMessage, setErrorMessage] = (0, _react.useState)(null);
  const [clickInsideCalendar, setClickInsideCalendar] = (0, _react.useState)(false);
  const [resetInitialState, setResetInitialState] = (0, _react.useState)(true);

  // Reference to the input element
  const inputRef = (0, _react.useRef)(null);
  const calendarRef = (0, _react.useRef)(null);

  /**
   * useEffect to initialize the date with the current date if selectedDate is empty.
   */
  (0, _react.useEffect)(() => {
    if (showCurrentDateOnMount && !selectedDate) {
      const currentDate = new Date();
      setSelectedDate(currentDate);
      setDateInput((0, _modelisation.formatDate)(currentDate, dateFormat));
    }
    // console.log("resetState:", resetState);
    // if (resetState) {
    //   resetInternalState();
    //   setResetState(false);
    // }
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
  }, [dateFormat, selectedDate, showCalendar, clickInsideCalendar, dateInput, resetInitialState]);
  const resetInternalState = () => {
    console.log("Calling resetInternalState");
    setErrorMessage(null);
    setResetInitialState(false);
    console.log("Reset complete");
  };

  /**
   * Toggles the calendar visibility, opens only if errorMessage is null.
   */
  const toggleCalendar = () => {
    console.log("resetState:", resetInitialState);
    if (resetState) {
      resetInternalState();
      setResetInitialState(true);
    }
    if (!showCalendar) {
      if (showCurrentDateOnMount === false && dateInput === "") {
        // Logique spécifique si showCurrentDateOnMount est false ou dateInput est vide
        if (errorMessage === null) {
          setDateInput("");
          handleDateChange(dateInput, dateFormat);
          setShowCalendar(true);
          setErrorMessage(null);
        } else if (errorMessage !== null) {
          setDateInput("");
          setSelectedDate("");
          handleDateChange(dateInput, dateFormat);
          setShowCalendar(true);
          setErrorMessage(null);
        }
      } else {
        // Logique spécifique si showCurrentDateOnMount est true
        if (errorMessage === null) {
          setShowCalendar(true);
        } else {
          const currentDate = new Date();
          setDateInput((0, _modelisation.formatDate)(currentDate, dateFormat));
          setSelectedDate(currentDate);
          handleDateChange((0, _modelisation.formatDate)(selectedDate || currentDate, dateFormat));
          setErrorMessage(null);
          setShowCalendar(true);
          console.log("showCurrentDateOnMount", showCurrentDateOnMount);
        }
      }
    } else {
      // Logique pour le cas où le calendrier est déjà ouvert
      if (errorMessage === null) {
        setShowCalendar(true);
        setErrorMessage(null);
      } else {
        setDateInput("");
        setSelectedDate("");
        setShowCalendar(true);
        setErrorMessage(null);
      }
    }
  };

  /**
   * Handles click outside of the calendar, closes the calendar and selects the input value.
   */
  const handleClickOutside = () => {
    if (showCalendar && !clickInsideCalendar) {
      // Close calendar and select value of input
      setShowCalendar(false);
      setSelectedDate((0, _modelisation.parseDateInput)(dateInput));
    }
    setClickInsideCalendar(false);
    calendarRef.current = showCalendar;
  };

  /**
   * Handles click inside the calendar, sets clickInsideCalendar to true.
   */
  const handleCalendarClick = () => {
    if (!showCalendar) {
      setClickInsideCalendar(false);
      setDateInput(dateInput);
    }
  };

  /**
   * Handles the click on a date in the calendar, updates the input, and closes the calendar.
   * @param {Date} date - The selected date.
   */
  const handleCalendarDateClick = date => {
    setSelectedDate(date);
    const formattedDate = (0, _modelisation.formatDate)(date);
    setDateInput(formattedDate);
    setShowCalendar(false);
    setErrorMessage(null);
  };

  /**
   * Handles the change of displayed date in the calendar.
   * @param {Date} newDisplayedDate - The newly displayed date.
   */
  const handleDisplayChange = newDisplayedDate => {
    if (showCurrentDateOnMount === true) {
      setSelectedDate(newDisplayedDate);
      setDateInput((0, _modelisation.formatDate)(newDisplayedDate));
      setErrorMessage(null);
    }
  };

  /**
   * Updates the selected date if the new date is valid, otherwise sets an error message.
   * @param {Date} newDate - The new date.
   */
  const updateDate = newDate => {
    if (newDate && !isNaN(newDate.getTime()) && newDate.getFullYear() >= minYear && newDate.getFullYear() <= maxYear && newDate.getMonth() >= 0 && newDate.getMonth() <= 11 && newDate.getDate() >= 1 && newDate.getDate() <= new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate()) {
      setSelectedDate(newDate);
      setShowCalendar(true);
      setErrorMessage(null);
    } else {
      setShowCalendar(false);
      if (dateInput === "") {
        setErrorMessage("Please select date");
      } else if (dateInput !== "") {
        setErrorMessage("Invalid date format");
      }
    }
  };

  /**
   * Handles the change of the input date, parses the input and updates the state accordingly.
   * @param {string} inputValue - The input value.
   */
  const handleDateChange = inputValue => {
    // Check is date valid before validation
    console.log("change date value====", inputValue);
    const parsedDate = (0, _modelisation.parseDateInput)(inputValue);
    setDateInput(inputValue);
    updateDate(parsedDate);
    setShowCalendar(false);
    if (onChange) {
      onChange(parsedDate);
    }
  };

  /**
   * Handles blur event, updates the date based on the input value.
   */
  const handleBlur = () => {
    // if (dateInput === "" && showCalendar === false) {
    //   setErrorMessage("Please select Date");
    // } else {
    //   setErrorMessage(null);
    // }
    if (showCurrentDateOnMount === false && dateInput === "") {
      setErrorMessage(null);
    }
    handleDateChange(dateInput);
    // setErrorMessage(null)
  };

  /**
   * Handles key press events, opens the calendar and displays the entered date on 'Enter'.
   * @param {Event} e - The key press event.
   */
  const handleKeyPress = e => {
    console.log("code===", e.code);
    if (e.code === "Enter") {
      if (!clickInsideCalendar) {
        toggleCalendar();
      }
    } else if (e.code === "Escape") {
      if (!clickInsideCalendar) {
        setShowCalendar(false);
        setSelectedDate((0, _modelisation.parseDateInput)(dateInput));
      }
      setErrorMessage(null);
      e.stopPropagation();
    } else if (e.code !== "Tab") {
      setShowCalendar(false);
    }
  };

  // JSX for rendering the component
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "input-container"
  }, /*#__PURE__*/_react.default.createElement("input", {
    key: resetInitialState,
    ref: inputRef,
    id: id,
    type: type,
    placeholder: placeholder,
    value: dateInput,
    onChange: e => handleDateChange(e.target.value),
    autoFocus: showCalendar,
    onBlur: handleBlur,
    className: "input-date ".concat(externalErrorClass || errorMessage !== null ? "error-border" : "", " ").concat(customInputClass ? customInputClass.className : "", " focused"),
    "data-cy": "input-date"
  }), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faCalendarDay,
    className: "calendar-icon",
    "data-cy": "calendar-icon",
    onClick: toggleCalendar,
    tabIndex: 0,
    onKeyDown: handleKeyPress
  })), showError && errorMessage !== null && /*#__PURE__*/_react.default.createElement("p", {
    className: "error-message ".concat(externalErrorClass || "custom-error-message")
  }, externalErrorMessage || errorMessage), showCalendar && /*#__PURE__*/_react.default.createElement(_calendar.default, {
    ref: calendarRef,
    "data-cy": "calendar",
    selectedDate: selectedDate,
    onSelect: handleCalendarDateClick,
    showCurrentDateOnMount: showCurrentDateOnMount,
    onDisplayChange: handleDisplayChange,
    onChange: handleDateChange,
    onKeyPress: handleKeyPress,
    minYear: minYear,
    maxYear: maxYear,
    language: language,
    customStyles: {
      monthSelectClass,
      yearSelectClass,
      calendarStyle,
      buttonStyle,
      dateStyle,
      dropdownStyle
    },
    tabIndex: 0,
    dateFormat: dateFormat
  }));
}