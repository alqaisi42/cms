export default {
  async handleAddClmDtl() {
    try {
      const response = await addClmDtl.run();
      const msg = response?.response?.msg || "Unknown response";

      if (msg !== "The procedure has been added successfully!") {
        showAlert(msg, "error");
        return;
      }

      showAlert(msg, "success");

      // ✅ Refresh table
      await getClmDtlVst.run();

      // ✅ Reset the dropdown
      clmDtl.setSelectedOption('');

      // ✅ Fallback: if still empty after insert, trigger getVstICD or similar
      const detailsList = vstClmDtl?.tableData || [];
      if (detailsList.length === 0) {
        await getClmDtlVst.run(); // re-fetch once more
      }

    } catch (error) {
      showAlert("Error calling API: " + error.message, "error");
    }
  }
};
