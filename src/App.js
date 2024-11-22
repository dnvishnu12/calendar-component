import { useState } from "react";
import "./App.css";
import Calendar from "./components/calendar";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [date, setDate] = useState(null);
  const handleSelectDate = (day, month, year) => {
    setDate({
      day: day,
      month: month,
      year: year,
    });
    console.log(`Selected Date : ${day}/${month}/${year}`);
  };
  return (
    <div class="d-flex justify-content-center align-items-center vh-100 flex-column">
      {date && (
        <p className="mb-4 px-3 py-2 text-center rounded bg-light shadow-sm border">
          <span className="fw-bold text-primary">Selected Date: </span>
          <span className="text-dark">
            {date.day}/{date.month}/{date.year}
          </span>
        </p>
      )}

      <Calendar handleSelectDate={handleSelectDate} />
    </div>
  );
}

export default App;
