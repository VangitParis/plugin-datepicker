"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseDateInput = exports.formatDate = void 0;
/**
 * Format a date according to the specified format.
 * Default format is 'dd/MM/yyyy'.
 * @param {Date} date - The date to format.
 * @param {string} format - The format to apply.
 * @returns {string} The formatted date.
 */
const formatDate = function (date) {
  let format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "dd/MM/yyyy";
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  // Replace placeholders in the format with actual values
  let formattedDate = format.replace("dd", day);
  formattedDate = formattedDate.replace("MM", month);
  formattedDate = formattedDate.replace("yyyy", year);
  return formattedDate;
};

// Fonction pour convertir une chaîne de date en instance de Date
exports.formatDate = formatDate;
const parseDateInput = input => {
  try {
    const parts = input.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }
    return null;
  } catch (error) {
    console.error("Error in parseDateInput:", error);
  }
};
exports.parseDateInput = parseDateInput;