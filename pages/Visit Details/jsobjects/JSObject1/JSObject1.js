export default {
  onDrugSelected(drugId) {
    const selectedDrug = getDrugList.data.response.find(d => d.id === drugId);
    storeValue("selectedDrugObj", selectedDrug);
  }
}
