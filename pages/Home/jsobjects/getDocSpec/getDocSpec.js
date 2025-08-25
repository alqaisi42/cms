export default {
  async loadSpecialityList() {
    try {
      const response = await getDocSpeciality.run(); // API already bound to doctor.selectedOptionValue

      const specialties = response.response.specialityList.map(item => ({
        label: item.specialityE, // or item.specialityA for Arabic
        value: item.specialityId
      }));

      await storeValue("specialityDropdown", specialties);

      const defaultSpeciality = response.response.defaultSpeciality?.specialityId;
      if (defaultSpeciality) {
        await storeValue("defaultSpecialityId", defaultSpeciality);
      }

      return specialties;
    } catch (e) {
      showAlert("Failed to load specialties", "error");
      console.error(e);
      return [];
    }
  }
}
