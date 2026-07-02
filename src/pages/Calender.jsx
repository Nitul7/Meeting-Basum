import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useNavigate } from "react-router";
import "../styles/Calender.css";
import { getMeetings } from "../services/MeetingService";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetings = async () => {
      const meetings = await getMeetings();
      setEvents(
        meetings
          .filter((meeting) => meeting.startTime && meeting.endTime)
          .map((meeting) => ({
            id: meeting._id,
            title: meeting.title,
            start: new Date(meeting.startTime),
            end: new Date(meeting.endTime),
          }))
      );
    };
    fetchMeetings();
  }, []);

  return (
    <div className="calendar-page">
      <div className="calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={(event) => navigate(`/meeting/${event.id}`)}

          /* IMPORTANT */
          views={["month", "week", "day", "agenda"]}
          defaultView="month"

          toolbar={true}
          popup={true}

          selectable
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
};

export default MyCalendar;
