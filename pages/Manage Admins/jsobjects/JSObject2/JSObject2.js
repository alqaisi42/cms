export default {
  async dashboardUsers_onDelete() {
    try {
      const selectedRow = Table1.selectedRow;

      // 🧠 Safety check
      if (!selectedRow || !selectedRow.ID) {
        showAlert("No user selected.", "warning");
        return;
      }

      const selectedId = selectedRow.ID;

      // 🚀 Run delete query (expects single param)
      await DeleteDashboardUser.run({ ID: selectedId });

      // ✅ Success alert
      showAlert(`User with ID ${selectedId} deleted successfully.`, "success");

      // 🔄 Refresh table or data source
      await get_all_admins.run();

    } catch (err) {
      console.error("Delete failed:", err);
      showAlert("Failed to delete user: " + err.message, "error");
    }
  }
};
