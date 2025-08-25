export default {
  sendReminder: async (subsId) => {
    if (!subsId) {
      showAlert("No SUBS_ID provided", "warning");
      return;
    }

    try {
      let topic = "";
      const selected = targetList.selectedOptionValue;

      if (selected === "1") {
        topic = user_select.selectedOptionValue;
      } else if (selected === "2") {
        topic = device_select.selectedOptionValue;
      } else if (selected === "3") {
        topic = mpID.text;
      }

      await sendTopicNotification.run({
        topic: topic,
        title: noti_title,
        body: noti_body.text.replace(/<[^>]*>/g, '').trim(),
        type: "Ads",
        patId: ""
      });

      showAlert(`Notification sent to user ${subsId}`, "success");

    } catch (e) {
      showAlert("Failed to send notification", "error");
      console.error(e);
    }
  }
};
