export default {
  async dashboardUsers_onAdd(event) {
    try {
      await AddDashboardUser.run();

      showAlert("User added successfully", "success");
      await get_all_admins.run(); // Refresh table

    } catch (err) {
      console.error("Add failed", err);
      showAlert("Failed to add user: " + err.message, "error");
    }
  }
}
