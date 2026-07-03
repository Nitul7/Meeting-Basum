import { toast } from "react-toastify";

export const copyMeetingLink = async (meetingId) => {
  const link = `${window.location.origin}/meeting/${meetingId}`;
  try {
    await navigator.clipboard.writeText(link);
    toast.success("Meeting link copied!");
  } catch (error) {
    toast.error("Could not copy link");
  }
};
