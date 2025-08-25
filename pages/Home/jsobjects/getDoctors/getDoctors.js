export default {
  async loadDoctors() {
    try {
      const response = await loadDoctorSList.run();
      const doctors = response.response.doctorList.map(doc => ({
        label: doc.namEE,
        value: doc.doCID
      }));
			
			 const defaultDoc = response.response.defaultDoctor?.doCID;
      if (defaultDoc) {
        await storeValue("defaultDoc", defaultDoc);
      }
      return doctors;
    } catch (e) {
      showAlert("Failed to load doctors", "error");
      return [];
    }
  }
}
