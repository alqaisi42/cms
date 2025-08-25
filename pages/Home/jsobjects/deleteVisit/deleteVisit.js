export default {
  async deleteVisit() {
    try {
       const result = await deleteVst.run();

      // Check return value
        if (result?.response?.return === 1) {
				GetClaims.run();
        showAlert("Visit deleted successfully", "success");
      } else {
        showAlert("Failed to delete visit", "error");
      }

    } catch (error) {
      showAlert("Failed to delete visit", "error");
    }
  }
}
