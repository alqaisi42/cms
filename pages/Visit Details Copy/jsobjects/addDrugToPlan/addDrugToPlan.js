export default {
  async addDrugToPlan() {
    try {
      const result = await addDrugToVstPlan.run();
      const returnCode = result?.response?.return;

      if (returnCode === 1) {
        showAlert("Drug added to visit plan successfully", "success");
        // Optionally refresh drug list or clear form
         getPlanVst.run();
				drugList.setSelectedOption('');

      } else {
        showAlert("Failed to add drug to plan. Please check input values.", "error");
      }
    } catch (err) {
      showAlert("Error calling API: " + (err.message || "Unknown error"), "error");
    }
  }
};
