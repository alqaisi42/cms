export default {
  async fetchClaims() {
    try {
      const result = await GetClaims.run();
      console.log("Claims result:", result);
      storeValue("claimsData", result);
    } catch (e) {
      showAlert("Failed to fetch claims: " + e.message, "error");
    }
  }
}
