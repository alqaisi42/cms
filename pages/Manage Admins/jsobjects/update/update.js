export default {
  async dashboardUsers_onSave(event) {
    await UpdateDashboardUser.run();
    showAlert("User updated successfully", "success");
    await get_all_admins.run();
  }
}