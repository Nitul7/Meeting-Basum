import React, { useState } from "react";
import "../styles/ScheduleMeeting.css";
import { useForm } from "react-hook-form";
import { ScheduleMeetingFormSchemaResolver } from "../schemas/ScheduleMeetingForm.schema";

const ScheduleMeeting = ({ addEvent }) => {
  const [form, setForm] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0], // Today's date
    time: "10:00",
    duration: "1",
    timezone: "(GMT+05:45) Nepal Time",
    participants: "",
    description: "",
  });



  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: ScheduleMeetingFormSchemaResolver,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleSchedule = () => {
    if (!form.title) {
      alert("Enter meeting title");
      return;
    }

    const start = new Date(`${form.date}T${form.time}`);

    const end = new Date(
      start.getTime() +
      parseFloat(form.duration) * 60 * 60 * 1000
    );

    // Add event to calendar
    if (addEvent) {
      addEvent({
        title: form.title,
        start,
        end,
      });
    }

    alert("✅ Meeting Scheduled & Added to Calendar");

    // Reset form after scheduling
    setForm({
      title: "",
      date: new Date().toISOString().split("T")[0],
      time: "10:00",
      duration: "1",
      timezone: "(GMT+05:45) Nepal Time",
      participants: "",
      description: "",
    });
  };

  return (
    <div className="schedule-container">
      {/* LEFT SIDE */}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-section">

          <h2>Schedule Meeting</h2>

          <p className="subtitle">
            Plan and schedule a new meeting
          </p>

          {/* Meeting Title */}
          <label>Meeting Title</label>

          <input
            type="text"
            placeholder="Enter meeting title"
            {...register("title")}
          />
          {errors.title && <span className="error" style={{ color: "red" }}>{errors.title.message}</span>}

          {/* Date + Time */}
          <div className="row">
            <div>
              <label>Date</label>

              <input
                type="date"
                value={form.date}
                min={new Date().toISOString().split("T")[0]}
                {...register("date")}
              />
              {errors.date && <span className="error" style={{ color: "red" }}>{errors.date.message}</span>}
            </div>

            <div>
              <label>Time</label>

              <input
                type="time"
                value={form.time}
                {...register("time")}
              />
              {errors.time && <span className="error" style={{ color: "red" }}>{errors.time.message}</span>}
            </div>
          </div>

          {/* Duration + Timezone */}
          <div className="row">
            <div>
              <label>Duration</label>

              <select
                value={form.duration}
                {...register("duration")}
              >
                <option value={0.5}>30 Min</option>
                <option value={1}>1 Hour</option>
                <option value={2}>2 Hours</option>
              </select>
              {errors.duration && <span className="error" style={{ color: "red" }}>{errors.duration.message}</span>}
            </div>

            <div>
              <label>Time Zone</label>

              <select
                value={form.timezone}
                {...register("timezone")}
              >
                <option>(GMT+05:45) Nepal Time</option>
              </select>
              {errors.timezone && <span className="error" style={{ color: "red" }}>{errors.timezone.message}</span>}
            </div>
          </div>

          {/* Participants */}
          <label>Add Participants</label>

          <input
            type="text"
            placeholder="Enter email addresses separated by commas"
            value={form.participants}
            {...register("participants")}
          />
          {errors.participants && <span className="error" style={{ color: "red" }}>{errors.participants.message}</span>}

          {/* Description */}
          <label>Meeting Description (Optional)</label>

          <textarea
            placeholder="Add description..."
            {...register("description")}
          />
          {errors.description && <span className="error" style={{ color: "red" }}>{errors.description.message}</span>}
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="summary-section">
          <h3>Meeting Summary</h3>

          <div className="summary-item">
            📌{" "}
            {form.title || "Project Planning Meeting"}
          </div>

          <div className="summary-item">
            📅 {form.date}
          </div>

          <div className="summary-item">
            ⏰ {form.time} -{" "}
            {form.duration === "1"
              ? "1 Hour"
              : form.duration === "0.5"
                ? "30 Min"
                : "2 Hours"}
          </div>

          <div className="summary-item">
            🌐 {form.timezone}
          </div>

          <div className="summary-item">
            👥 Participants:{" "}
            {form.participants
              ? form.participants.split(",").length
              : 0}
          </div>

          <div className="summary-item">
            📝 Description:{" "}
            {form.description ||
              "No description provided"}
          </div>

          <button
            className="btn"
            type="submit"
          >
            Schedule Meeting
          </button>
        </div>
      </form>
    </div >
  );
};

export default ScheduleMeeting;