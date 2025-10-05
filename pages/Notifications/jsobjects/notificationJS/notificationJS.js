export default {
  sendReminder: async () => {
    try {
      let topic = "";
      const selected = targetList?.selectedOptionValue;

      if (selected === "1") {
        topic = user_select?.selectedOptionValue;
      } else if (selected === "2") {
        topic = device_select?.selectedOptionValue;
      } else if (selected === "3") {
        topic = mpID?.text;
      }

      // Ensure topic is a string
      if (!topic || typeof topic !== "string" || topic.trim() === "") {
        showAlert("Please select a valid topic before sending.", "warning");
        return;
      }

      const titleValue = typeof noti_title === "object" ? noti_title.text : noti_title;
      const bodyValue = noti_body?.text?.replace(/<[^>]*>/g, "").trim() || "";

      await sendTopicNotification.run({
        topic: topic.trim(),
        title: titleValue?.trim(),
        body: bodyValue,
        type: "Ads",
        patId: ""
      });

      showAlert(`✅ Notification sent to topic: ${topic}`, "success");

    } catch (e) {
      console.error("Notification sending failed:", e);
      showAlert("❌ Failed to send notification. Check console for details.", "error");
    }
  }
};
