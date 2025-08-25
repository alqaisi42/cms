export default {
  async dashboardUsers_onDelete() {
    try {
      const selectedIds = Table1.selectedRows.map(row => row.ID);

      if (selectedIds.length === 0) {
        showAlert("No users selected", "warning");
        return;
      }

      await DeleteDashboardUser.run({ IDs: selectedIds });

      showAlert("Selected users deleted successfully", "success");
      await get_all_admins.run(); 

    } catch (err) {
      console.error("Bulk delete failed", err);
      showAlert("Failed to delete users: " + err.message, "error");
    }
  }
}
