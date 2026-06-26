import React from "react";
import "../styles/ScheduleMeeting.css";
import { useForm } from "react-hook-form";
import { ScheduleMeetingFormSchemaResolver } from "../schemas/ScheduleMeetingForm.schema";
import { scheduleMeeting } from "../services/MeetingService";
import { toast } from "react-toastify";

const ScheduleMeeting = ({ addEvent }) => {
  const today = new Date().toISOString().split("T")[0];

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: ScheduleMeetingFormSchemaResolver,
    defaultValues: {
      title: "",
      date: today,
      time: "10:00",
      duration: "1",
      timezone: "(GMT+05:15) Nepal Standard Time",
      participants: "",
      description: "",
    },
  });

  const form = watch();

  const durationLabel =
    form.duration === "0.5" ? "30 Min" : form.duration === "2" ? "2 Hours" : "1 Hour";

  const durationHours =
    form.duration === "0.5" ? 0.5 : form.duration === "2" ? 2 : 1;

  const formatDate = (dateValue) => {
    if (!dateValue) return today;

    const date = new Date(`${dateValue}T00:00:00`);
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const formatTime = (timeValue) => {
    if (!timeValue) return "10:00 AM";

    const [hours, minutes] = timeValue.split(":");
    const date = new Date();
    date.setHours(Number(hours), Number(minutes), 0, 0);

    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const formatEndTime = (timeValue, durationValue) => {
    if (!timeValue) return "11:00 AM";

    const [hours, minutes] = timeValue.split(":");
    const date = new Date();
    date.setHours(Number(hours), Number(minutes), 0, 0);
    date.setMinutes(date.getMinutes() + durationValue * 60);

    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const onSubmit = async (data) => {
    try {
      const response = await scheduleMeeting(data);
      const successStatus = response?.status >= 200 && response?.status < 300;

      if (successStatus) {
        const start = new Date(`${data.date}T${data.time}`);

        const end = new Date(
          start.getTime() +
            Number(data.duration) * 60 * 60 * 1000
        );

        if (addEvent) {
          addEvent({
            title: data.title,
            start,
            end,
          });
        }

        toast.success("Meeting scheduled successfully!");

        // Optional Redirect
        // navigate("/dashboard");
      } else {
        toast.error(
          response?.data?.message ||
            "Failed to schedule meeting."
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to schedule meeting."
      );
    }
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
                min={new Date().toISOString().split("T")[0]}
                {...register("date")}
              />
              {errors.date && <span className="error" style={{ color: "red" }}>{errors.date.message}</span>}
            </div>

            <div>
              <label>Time</label>

              <input
                type="time"
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
                {...register("timezone")}
              >
                <option value="(GMT+05:15) Nepal Standard Time">(GMT+05:15) Nepal Standard Time</option>
                
              </select>
              {errors.timezone && <span className="error" style={{ color: "red" }}>{errors.timezone.message}</span>}
            </div>
          </div>

          {/* Participants */}
          <label>Add Participants</label>

          <input
            type="text"
            placeholder="Enter email addresses separated by commas"
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
            {form.title || "No title provided"}
          </div>

          <div className="summary-item">
            📅 {formatDate(form.date)}
          </div>

          <div className="summary-item">
            ⏰ {formatTime(form.time)} - {formatEndTime(form.time, durationHours)} ({durationLabel})
          </div>

          <div className="summary-item">
            🌐 {form.timezone}
          </div>

          <div className="summary-item">
            👥 Participants:{" "}
            {form.participants ? form.participants.split(",").filter(Boolean).length : 0}
          </div>

          <div className="summary-item">
            📝 Description:{" "}
            {form.description ||
              "No description provided"}
          </div>

          <button className="btn" type="submit">
            Schedule Meeting
          </button>
        </div>
      </form>
    </div >
  );
};

export default ScheduleMeeting;