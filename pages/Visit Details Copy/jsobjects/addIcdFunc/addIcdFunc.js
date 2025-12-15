export default {
  async addDiagnosis() {
    try {
      const response = await addICD.run();
      const msg = response?.response?.msg || "Unknown response";

      if (msg !== "Diagnosis added successfully!") {
        showAlert(msg, "error");
        return;
      }

      showAlert(msg, "success");
		   getVstICD.run();
			icdList.setSelectedOption('')
			
     // ✅ If vstICD is empty after insert, update clmDtlVst
      const diagnosisList = vstICD.tableData || [];
      if (diagnosisList.length === 0) {
        await getClmDtlVst.run();
      }
			
    } catch (error) {
      showAlert("Error calling API: " + error.message, "error");
    }
  }
};
