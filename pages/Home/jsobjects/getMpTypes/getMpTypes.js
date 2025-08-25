export default {
  async loadClmTypes() {
    try {
      const response = await loadClmTypes.run(); // this is your API name
      const types = response.response.clmTypes.map(item => ({
        label: item.descE,   // or use `descA` for Arabic
        value: item.id
      }));

      // Store the result to Appsmith store for reuse if needed
      await storeValue("clmTypesDropdown", types);
			const rawTypes = response.response.clmTypes;
			   const defaultType = rawTypes.find(item => item.default === 1);
      if (defaultType) {
        await storeValue("defaultClmType", defaultType.id);
      }
			
      return types;
    } catch (err) {
      showAlert("Failed to load claim types", "error");
      console.error(err);
    }
  }
}
