import React, { useState } from "react";

const CalendarComponent = ({ handleSelectDate }) => {
  const [viewMode, setViewMode] = useState("month");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleDateClick = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return;
    setSelectedDate(day);
    handleSelectDate(day, selectedMonth + 1, selectedYear);
  };

  const renderMonthView = () => {
    const days = daysInMonth(selectedYear, selectedMonth);
    const firstDay = firstDayOfMonth(selectedYear, selectedMonth);
    const prevMonthDays = daysInMonth(selectedYear, selectedMonth - 1);

    const totalCells = [...Array(42)].map((_, index) => {
      if (index < firstDay) {
        return {
          day: prevMonthDays - firstDay + index + 1,
          isCurrentMonth: false,
        };
      } else if (index < firstDay + days) {
        return { day: index - firstDay + 1, isCurrentMonth: true };
      } else {
        return { day: index - (firstDay + days) + 1, isCurrentMonth: false };
      }
    });

    return (
      <table className="table text-center small m-0">
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <th
                key={day}
                className="p-1 bg-light text-dark"
                style={{ border: "none" }}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, week) => (
            <tr key={week}>
              {totalCells
                .slice(week * 7, week * 7 + 7)
                .map(({ day, isCurrentMonth }, index) => (
                  <td
                    key={index}
                    className={`p-2 ${
                      isCurrentMonth
                        ? day === Number(selectedDate)
                          ? "bg-primary text-white"
                          : "text-dark"
                        : "text-secondary"
                    }`}
                    style={{
                      cursor: isCurrentMonth ? "pointer" : "not-allowed",
                      border: "none",
                    }}
                    onClick={() => handleDateClick(day, isCurrentMonth)}
                  >
                    {day.toString().padStart(2, "0")}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderYearView = () => {
    return (
      <table className="table text-center small m-0">
        <tbody>
          {Array.from({ length: 4 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {months
                .slice(rowIndex * 3, rowIndex * 3 + 3)
                .map((month, index) => (
                  <td
                    key={index}
                    className="p-3 bg-light text-dark rounded"
                    style={{
                      cursor: "pointer",
                      border: "3px white solid",
                      minWidth: "80px",
                      maxWidth: "100px",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => {
                      setSelectedMonth(rowIndex * 3 + index);
                      setViewMode("month");
                    }}
                  >
                    {month}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container p-2 rounded bg-white" style={{ width: "290px" }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex gap-1">
          <select
            className="form-select form-select-sm w-auto"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select
            className="form-select form-select-sm w-auto"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {Array.from({ length: 20 }, (_, i) => selectedYear - 10 + i).map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <button
            className={`btn btn-sm me-2 ${
              viewMode === "month" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setViewMode("month")}
          >
            Month
          </button>
          <button
            className={`btn btn-sm ${
              viewMode === "year" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setViewMode("year")}
          >
            Year
          </button>
        </div>
      </div>
      {viewMode === "month" ? renderMonthView() : renderYearView()}
    </div>
  );
};

export default CalendarComponent;
