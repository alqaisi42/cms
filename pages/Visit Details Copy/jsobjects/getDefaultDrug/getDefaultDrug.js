export default {
  async fetchDrugDetails() {
    try {
			
			if(drugList.selectedOptionValue != ''){
				   const response = await getDrugDefault.run(); 
      
      if (!response?.response) {
        showAlert("Invalid response from API", "error");
        return null;
      }

      const { allTq, qty, tq } = response.response;

      // Store in Appsmith store if needed
      storeValue("allTq", allTq);
      storeValue("qty", qty);
      storeValue("tq", tq);

      return { allTq, qty, tq };
			}
   
    } catch (error) {
      showAlert(" Failed to fetch drug details: " + error.message, "error");
      return null;
    }
  }
}
