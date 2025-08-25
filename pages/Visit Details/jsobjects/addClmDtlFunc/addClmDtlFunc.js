export default {
   async handleAddClmDtl() {
    try {
      const res = await addClmDtl.run();
      const msg = res?.response?.msg || "No response message";

      if (msg !== "The procedure has been added successfully!") {
        showAlert(msg, "error");
        return;
      }

      showAlert(msg, "success");
		  getClmDtlVst.run();
			clmDtl.selectedOptionValue('');
		} catch (e) {
      showAlert("API Error: " + e.message, "error");
    }
  }
};
