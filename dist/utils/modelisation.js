"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseDateInput = exports.formatDateWithoutTime = exports.formatDate = void 0;
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
  if (input instanceof Date) {
    return input;
  }
  try {
    const parts = input.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Les mois sont indexés à partir de 0
      const year = parseInt(parts[2], 10);

      // Vérifier si les parties sont des nombres valides
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const date = new Date(year, month, day);

        // Vérifier si la date résultante est valide
        if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
          return date;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error in parseDateInput:", error);
    return null;
  }
};
exports.parseDateInput = parseDateInput;
const formatDateWithoutTime = date => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "";
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return "".concat(year, "-").concat(month.toString().padStart(2, '0'), "-").concat(day.toString().padStart(2, '0'));
};
exports.formatDateWithoutTime = formatDateWithoutTime;