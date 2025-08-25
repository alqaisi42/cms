export default {
		async fetchDrugUnit() {
    try {
			
			if (drugList.selectedOptionValue != ''){
					      const result = await getDrugUnit.run();
      if (result?.response) {
        const unitE = result.response.descE;
        const unitA = result.response.descA;

        storeValue("drugUnitE", unitE);
        storeValue("drugUnitA", unitA);

        return unitE;
      }
	}else{
		return ''
	}
      showAlert("No unit info found", "warning");
    } catch (e) {
      showAlert("Failed to load drug unit: " + e.message, "error");
    }
  }
	
}