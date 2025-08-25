export default {
  notifyCascadingUsers: async (subsId) => {
    if (!subsId) {
      showAlert("No subsId provided", "warning");
      return;
    }

    const result = await getActiveDepBySubsId.run({ subsId });

    if (result && result.length > 0) {
      const ids = result.map(r => r.SUBS_ID);

      for (let id of ids) {
        console.log(`Notifying user ${id}`);
        await sendTopicNotification.run({ subsId: id });
        showAlert(`Notification sent to user ${id}`, "info");
      }
    } else {
      showAlert("No users to notify", "info");
    }
  }
}
