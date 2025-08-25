export default {
  deleteAndNotify: async () => {
    const row =  appsmith.store.selectedUserId ;

    if (!row || !row) {
      showAlert("No user selected", "warning");
      return;
    }

    const subsId = row;

    try {
			notifyDeps.notifyCascadingUsers(appsmith.store.selectedUserId);

      await deleteUserCascade.run({ subsId });

      showAlert(`Deleted user ${subsId} successfully`, "success");

      

      await notificationJS.sendReminder(subsId);
			closeModal(DeleteUserModal.name);
			navigateTo('Users');

    } catch (err) {
      console.error(err);
			closeModal(DeleteUserModal.name);
      showAlert("Failed to delete user", "error");
    }
  }
}
