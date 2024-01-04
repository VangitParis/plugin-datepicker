# React DatePicker Component

A flexible and customizable React DatePicker component with a built-in calendar for easy date selection.

## Installation

To install the DatePicker component, use npm or yarn:

```bash
npm install plugin-datepicker

### Usage
Import the DatePicker component in your React application and use it as follows:


import React from 'react';
import DatePicker from 'your-react-datepicker-package-name';

function App() {
  return (
    <div>
      <DatePicker
        minYear={2000}
        maxYear={2030}
        customClass="custom-datepicker"
        dateFormat="yyyy-MM-dd"
        language="en"
        font="Arial, sans-serif"
        fontSize="16px"
      />
    </div>
  );
}

export default App;
```

## Props
- minYear (number, optional): The minimum allowed year for date selection.
- maxYear (number, optional): The maximum allowed year for date selection.
- customClass (string, optional): Additional custom class for styling.
- dateFormat (string, optional): The format in which the date should be displayed. Defaults to "yyyy/MM/dd".
- language (string, optional): The language for the date picker. Defaults to "en".
- font (string, optional): The font style for the input.
- fontSize (string, optional): The font size for the input.
- Features
- Easy date selection with a built-in calendar.
- Customizable appearance with various styling options.
- Supports different date formats and languages.
- Validates and handles user input for accurate date selection.
- Accessible with keyboard navigation.

# Development
If you want to contribute or modify the DatePicker component, follow these steps:
- Clone the repository 
```bash
https://github.com/VangitParis/plugin-datepicker.git
```

- Install dependencies: 
```bash
cd your-react-datepicker-repo
npm install
```
- Start the server
```bash
npm start
```



