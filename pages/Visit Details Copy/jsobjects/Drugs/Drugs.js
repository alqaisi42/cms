export default {
  async loadDrugs(pageNumber = 1, filterText = "") {
    try {
      const response = await getDrugList.run({
        pageNumber: pageNumber,
        pDrugDesc: filterText
      });

      // Optional check
      if (response?.success && Array.isArray(response?.response)) {
        console.log("Drug list loaded:", response);
        return response; // full object including success, messageCode, etc.
      } else {
        showAlert("Drug list loaded but no data found.", "warning");
        return response; // still return for downstream handling
      }

    } catch (e) {
      showAlert("Failed to load drug list: " + e.message, "error");
      return { success: false, messageText: e.message, response: [] };
    }
  }
	

	
}
