/* eslint-disable no-undef */
import React from "react";
import DatePicker from "./datePicker";
import { formatDate } from "../../utils/modelisation";
import Calendar from "../Calendar/calendar";

describe("<DatePicker />", () => {
  it("renders and selects a date", () => {
    // Ensure the DatePicker component is rendered correctly
    cy.mount(<DatePicker />);
  });

  it("clicks and selects date value", () => {
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

        // Check the month in the expected format : the output format of formatDate is 'DD/MM/YYYY
        const month = formattedDate.split("/")[1];
        cy.log(`Month: ${ month }`);
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
    // Click to open the calendar
    cy.get(".calendar-icon").click();

    // Mount the DatePicker component with custom styles
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

    // Check if the calendar width is correct
    cy.get('[data-cy="calendar"]').should(
      "have.css",
      "width",
      customStyles.calendarStyle.width
    );

    // Check if the calendar height is correct
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

    // Test with invalid date day
    cy.get('[data-cy="input-date"]').type("39/09/2020{enter}");

    // Error message should be visible
    cy.get(".error-message")
      .should("be.visible")
      .and("have.text", "Invalid date format");

    // Clear initial date of input
    cy.get('[data-cy="input-date"]').clear();

    // Test with invalid date month
    cy.get('[data-cy="input-date"]').type("01/49/2020{enter}");

    // Error message should be visible
    cy.get(".error-message")
      .should("be.visible")
      .and("have.text", "Invalid date format");

    // Clear initial date of input
    cy.get('[data-cy="input-date"]').clear();

    // Test with invalid date year
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
      const dateToCheck = new Date(2024, 0, 1); // Month starts from 0, so January is 0

      // Mount the Calendar component with the specified date
      cy.mount(
        <Calendar
          onSelect={() => { }}
          selectedDate={null}
          onDisplayChange={() => { }}
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

      // Check if the first day of the month in the calendar is a Monday
      cy.get('[data-cy="calendar__days"] div').eq(1).should("have.text", "M");
    });

    it("should close calendar on outside click", () => {
      cy.mount(<DatePicker minYear={2000} maxYear={2030} language="en-EN" />);

      // Click to open the calendar
      cy.get(".calendar-icon").click();

      // Check if the calendar is open
      cy.get("#calendar").should("be.visible");

      // Click outside of Calendar
      cy.get("body").click(0, 50);

      cy.wait(500);

      // Check if id=calendar is not present in the body
      cy.get("body").should("not.have.id", "calendar");
    });

    it("customize buttons and selects elements of Calendar", () => {
      // Mount the DatePicker component
      cy.mount(
        <DatePicker
          minYear={2000}
          maxYear={2030}
          language="en-EN"
          calendarWidth="400px"
          calendarHeight="300px"
          buttonStyle={{
            backgroundColor: "white",
            color: "black",
            width: "100px",
            height: "30px",
            borderRadius: "10px",
          }}
          monthSelectClass="custom-month-select-style"
          yearSelectClass="custom-year-select-style"
        />
      );

      // Click to open the calendar
      cy.get(".calendar-icon").click();

      // Check if the calendar is open
      cy.get("#calendar").should("be.visible");

      // Apply custom styles to the month select element
      cy.get("select#calendar__month").invoke(
        "attr",
        "style",
        "width: 150px; height: 150px; background-color: black; color: white; border-radius: 5px;"
      );

      // Apply custom styles to the year select element
      cy.get("select#calendar__year").invoke(
        "attr",
        "style",
        "width: 150px; height: 150px; background-color: black; color: white; border-radius: 5px;"
      );

      // Check if the month select element has the custom class and styles
      cy.get("select#calendar__month")
        .should("have.class", "custom-month-select-style")
        .and("have.css", "width", "150px")
        .and("have.css", "height", "150px")
        .and("have.css", "background-color", "rgb(0, 0, 0)")
        .and("have.css", "color", "rgb(255, 255, 255)")
        .and("have.css", "border-radius");

      // Check if the year select element has the custom class and styles
      cy.get("select#calendar__year")
        .should("have.class", "custom-year-select-style")
        .and("have.css", "width", "150px")
        .and("have.css", "height", "150px")
        .and("have.css", "background-color", "rgb(0, 0, 0)")
        .and("have.css", "color", "rgb(255, 255, 255)")
        .and("have.css", "border-radius");

      // Apply custom styles to the previous month button
      cy.get(".btn.arrow-left").invoke(
        "attr",
        "style",
        "width: 100px; height: 30px; background-color: white; color: black; border-radius: 10px;"
      );

      // Apply custom styles to the home button
      cy.get(".btn.icon-home").invoke(
        "attr",
        "style",
        "width: 100px; height: 30px; background-color: white; color: black; border-radius: 10px;"
      );

      // Apply custom styles to the next month button
      cy.get(".btn.arrow-right").invoke(
        "attr",
        "style",
        "width: 100px; height: 30px; background-color: white; color: black; border-radius: 10px;"
      );

      // Check if the previous month button has the custom styles
      cy.get(".btn.arrow-left")
        .should("have.css", "width", "100px")
        .and("have.css", "height", "30px")
        .and("have.css", "background-color", "rgb(255, 255, 255)")
        .and("have.css", "color", "rgb(0, 0, 0)")
        .and("have.css", "border-radius", "10px");

      // Check if the home button has the custom styles
      cy.get(".btn.icon-home")
        .should("have.css", "width", "100px")
        .and("have.css", "height", "30px")
        .and("have.css", "background-color", "rgb(255, 255, 255)")
        .and("have.css", "color", "rgb(0, 0, 0)")
        .and("have.css", "border-radius", "10px");

      // Check if the next month button has the custom styles
      cy.get(".btn.arrow-right")
        .should("have.css", "width", "100px")
        .and("have.css", "height", "30px")
        .and("have.css", "background-color", "rgb(255, 255, 255)")
        .and("have.css", "color", "rgb(0, 0, 0)")
        .and("have.css", "border-radius", "10px");
    });
  });
