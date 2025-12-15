export default {
  async handleDrugSelect() {
    const selectedDrugId = drugList.selectedOptionValue;

    if (!selectedDrugId) {
      storeValue("allTqOptions", []);
      storeValue("tq", undefined); // clear Select1
      return;
    }

    // Call API
    const response = await getDrugDefault.run();

    if (response?.response?.allTq) {
      const options = response.response.allTq.map(obj => ({
        label: obj.descE,
        value: obj.id
      }));

      storeValue("allTqOptions", options);
      storeValue("tq", response.response.tq); // optionally preselect it
    } else {
      showAlert("No timing info available", "warning");
    }
  }
}
