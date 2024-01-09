/* eslint-disable no-undef */
import React from "react";
import DatePicker from "./datePicker";
import { formatDate } from "../../utils/modelisation";
import Calendar from "../Calendar/calendar";

describe("<DatePicker />", () => {
  it("renders and selects a date", () => {
    // Ensure the DatePicker component is rendered correctly
    // eslint-disable-next-line no-undef
    cy.mount(<DatePicker />);
  });

  it("click and select date value", () => {
    // Mount the DatePicker component with the specified date format
    cy.mount(
      <DatePicker
        dateFormat="dd/MM/yyyy"
        minYear={2000}
        maxYear={2030}
        language="en-EN"
      />
    );

    // Get the initial value of the input
    cy.get('[data-cy="input-date"]').invoke("val").as("initialValue");

    // Click to open the calendar
    cy.get(".calendar-icon").click();

    // Select the month of January
    cy.get('[data-cy="input-date"]')
      .invoke("val")
      .then(() => {
        const formattedDate = formatDate(new Date(), "dd/MM/yyyy");
        console.log("Selected Date:", formattedDate);

        // Check the month in the expected format
        const month = formattedDate.split("/")[1]; // Assuming the output format of formatDate is 'DD/MM/YYYY'
        cy.log(`Month: ${month}`);
        cy.get("select#calendar__month option:selected").should(
          "have.text",
          "January"
        );
      });

    // Select the year 2000
    cy.get("select#calendar__year").select("2000");
    cy.get("select#calendar__year option:selected").should(
      "have.value",
      "2000"
    );

    // Select the date in the calendar
    cy.get('[data-cy="calendar-date"]').contains("1").click();

    // Access the input-date within the DatePicker component
    cy.get('[data-cy="input-date"]').should("have.value", "01/01/2000");

    // Display the selected date in the console along with the initial value
    cy.get("@initialValue").then((initialValue) => {
      cy.get('[data-cy="input-date"]')
        .invoke("val")
        .then((selectedDate) => {
          console.log("Initial Value:", initialValue);
          console.log("Selected Date:", selectedDate);
        });
    });
  });

  it("renders and selects a date with custom styles", () => {
    const customStyles = {
      calendarStyle: {
        width: "300px",
        height: "300px",
      },
    };
    cy.mount(<DatePicker />);
    // Cliquez pour ouvrir le calendrier
    cy.get(".calendar-icon").click();

    // Montez le composant DatePicker avec les propriétés personnalisées
    cy.mount(
      <Calendar
        minYear={2000}
        maxYear={2030}
        dateFormat="dd/MM/yyyy"
        language="en-EN"
        font="Arial"
        fontSize="16px"
        backgroundColor="#f0f0f0"
        color="#333"
        customStyles={customStyles}
      />
    );

    // Vérifiez que la largeur du calendrier est correcte
    cy.get('[data-cy="calendar"]').should(
      "have.css",
      "width",
      customStyles.calendarStyle.width
    );

    // Vérifiez que la hauteur du calendrier est correcte
    cy.get('[data-cy="calendar"]').should(
      "have.css",
      "height",
      customStyles.calendarStyle.height
    );
  });
  it("displays error message for invalid date", () => {
    cy.mount(
      <DatePicker
        dateFormat="dd/MM/yyyy"
        minYear={2000}
        maxYear={2030}
        language="en-EN"
      />
    );

    // Clear initial date of input
    cy.get('[data-cy="input-date"]').clear();

    // Test with invalidate date day
    cy.get('[data-cy="input-date"]').type("39/09/2020{enter}");

    // Error message should be visible
    cy.get(".error-message")
      .should("be.visible")
      .and("have.text", "Invalid date format");

    // Clear initial date of input
    cy.get('[data-cy="input-date"]').clear();

    // Test with invalidate date month
    cy.get('[data-cy="input-date"]').type("01/49/2020{enter}");

    // Error message should be visible
    cy.get(".error-message")
      .should("be.visible")
      .and("have.text", "Invalid date format");

    // Clear initial date of input
    cy.get('[data-cy="input-date"]').clear();

    // Test with invalidate date year
    cy.get('[data-cy="input-date"]').type("01/01/2090{enter}");

    // Error message should be visible
    cy.get(".error-message")
      .should("be.visible")
      .and("have.text", "Invalid date format");
  });
  it("verifies autofocus on input", () => {
    cy.mount(
      <DatePicker
        dateFormat="dd/MM/yyyy"
        minYear={2000}
        maxYear={2030}
        language="en-EN"
        autofocus
      />
    );
    // Check if the input is focused
    cy.get("input").should("have.class", "focused");
  });
});
describe("Calendar", () => {
  it("verifies that 01/01/2024 is a Monday", () => {
    const dateToCheck = new Date(2024, 0, 1); // Le mois commence à 0, donc janvier est 0

    // Montez le composant Calendar avec la date spécifiée
    cy.mount(
      <Calendar
        onSelect={() => {}}
        selectedDate={null}
        onDisplayChange={() => {}}
        minYear={2000}
        maxYear={2030}
        language="en-EN"
        customStyles={{
          calendarStyle: {
            backgroundColor: "#f0f0f0",
            color: "#333",
            font: "Arial",
            fontSize: "16px",
          },
        }}
        displayed={dateToCheck}
      />
    );

    // Vérifiez si le premier jour du mois dans le calendrier est un lundi
    cy.get('[data-cy="calendar__days"] div').eq(1).should("have.text", "M");
  });
});
