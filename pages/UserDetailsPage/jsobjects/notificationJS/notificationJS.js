export default {
  sendReminder: async (subsId) => {
    if (!subsId) {
      showAlert("No SUBS_ID provided", "warning");
      return;
    }

    try {
      await sendTopicNotification.run({
        topic: String(subsId),
        title: "M-Jordan",
        body: "Your access to the EM-Card service has been disabled. Please contact support for further assistance.",
        type: "LOGOUT",
        patId: ""
      });

      showAlert(`Notification sent to user ${subsId}`, "success");

    } catch (e) {
      showAlert("Failed to send notification", "error");
      console.error(e);
    }
  }
}
