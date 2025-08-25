export default {
  deleteAndNotify: async () => {
    const row = usersTable.selectedRow;

    if (!row || !row.SUBS_ID) {
      showAlert("No user selected", "warning");
      return;
    }

    const subsId = row.SUBS_ID;

    try {
			notifyDeps.notifyCascadingUsers(usersTable.selectedRow.SUBS_ID);

      await deleteUserCascade.run({ subsId });

      showAlert(`Deleted user ${subsId} successfully`, "success");

      await get_app_users.run();

      await notificationJS.sendReminder(subsId);
			closeModal(DeleteUserModal.name);

    } catch (err) {
      console.error(err);
			closeModal(DeleteUserModal.name);
      showAlert("Failed to delete user", "error");
    }
  }
}
