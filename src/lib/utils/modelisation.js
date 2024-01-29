/**
 * Format a date according to the specified format.
 * Default format is 'dd/MM/yyyy'.
 * @param {Date} date - The date to format.
 * @param {string} format - The format to apply.
 * @returns {string} The formatted date.
 */
export const formatDate = (date, format = "dd/MM/yyyy") => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  // Replace placeholders in the format with actual values
  let formattedDate = format.replace("dd", day);
  formattedDate = formattedDate.replace("MM", month);
  formattedDate = formattedDate.replace("yyyy", year);

  return formattedDate;
};

      
/**
 * Converts a date string into a Date instance.
 *
 * @param {string | Date} date - The input date, either as a string or an existing Date instance.
 * @returns {Date | null} Returns a Date instance if conversion is successful, otherwise returns null.
 */
export const parseDateInput = (date) => {
  // If the input is already a Date instance, return it directly
  if (date instanceof Date) {
    return date;
  }

  try {
    // Split the input date string into parts using "/"
    const parts = date.split("/");

    // Ensure there are three parts (day, month, year)
    if (parts.length === 3) {
      // Parse day, month, and year into integers
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months are zero-indexed
      const year = parseInt(parts[2], 10);

      // Check if parsed values are valid numbers
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        // Create a new Date instance using the parsed values
        const parsedDate = new Date(year, month, day);

        // Check if the resulting date is valid
        if (
          parsedDate.getFullYear() === year &&
          parsedDate.getMonth() === month &&
          parsedDate.getDate() === day
        ) {
          return parsedDate;
        }
      }
    }

    // Return null if the input date string format is not valid
    return null;
  } catch (error) {
    // Log and handle errors during the parsing process
    console.error("Error in parseDateInput:", error);
    return null;
  }
};





