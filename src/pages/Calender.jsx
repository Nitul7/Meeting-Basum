import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../styles/Calender.css";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => {
  return (
    <div className="calendar-wrapper">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"

        /* IMPORTANT */
        views={["month", "week", "day", "agenda"]}
        defaultView="month"

        toolbar={true}
        popup={true}

        selectable
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default MyCalendar;