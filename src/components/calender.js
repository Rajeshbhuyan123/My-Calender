import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./calender.css";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [meetings, setMeetings] = useState([]);

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
  };

  const handleAddMeeting = (day, event) => {
    const newMeeting = {
      day: day,
      event: event,
    };
    setMeetings([...meetings, newMeeting]);
  };

  const handleDeleteMeeting = (index) => {
    const updatedMeetings = [...meetings];
    updatedMeetings.splice(index, 1);
    setMeetings(updatedMeetings);
  };

  const handleUpdateMeeting = (index, updatedEvent) => {
    const updatedMeetings = [...meetings];
    updatedMeetings[index].event = updatedEvent;
    setMeetings(updatedMeetings);
  };

  const renderDays = () => {
    const days = [];
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDay = firstDayOfMonth.getDay();
    const endDay = lastDayOfMonth.getDate();

    for (let i = 0; i < startDay; i++) {
      days.push(<td key={`empty-${i}`}></td>);
    }

    for (let i = 1; i <= endDay; i++) {
      const dayMeetings = meetings.filter((meeting) => meeting.day === i);
      let dayContent = i;
      if (dayMeetings.length > 0) {
        dayContent = dayMeetings.map((meeting, index) => (
          <div key={index}>
            {meeting.event}
            <button onClick={() => handleDeleteMeeting(index)}>Delete</button>
            <button
              onClick={() =>
                handleUpdateMeeting(index, prompt("Enter updated event"))
              }
            >
              Update
            </button>
          </div>
        ));
      }
      days.push(
        <td key={i}>
          {dayContent}
          <button onClick={() => handleAddMeeting(i, prompt("Enter event"))}>
            Add
          </button>
        </td>
      );
    }

    let rows = [];
    let cells = [];

    days.forEach((day, i) => {
      if (i % 7 !== 0) {
        cells.push(day);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(day);
      }
      if (i === days.length - 1) {
        rows.push(cells);
      }
    });

    return rows.map((row, i) => <tr key={i}>{row}</tr>);
  };

  return (
    <div>
      <div className="top">
        <button onClick={handlePrevMonth}>Prev</button>
        <span>
          {date.toLocaleString("default", { month: "long" })}{" "}
          {date.getFullYear()}
        </span>
        <button onClick={handleNextMonth}>Next</button>
        <button className="logout">
          <Link to="/">Logout</Link>
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{renderDays()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
