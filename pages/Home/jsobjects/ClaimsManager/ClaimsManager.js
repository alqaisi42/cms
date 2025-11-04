export default {
  /** Cache Key **/
  cacheKey: "cachedClaims",

 /** Load data (with cache check) **/
  async loadData() {
    // Read from store (not storeValue)
    const cached = appsmith.store[this.cacheKey];

    if (cached && cached.response && cached.response.length > 0) {
      showAlert("Loaded claims from cache", "info");
      return cached.response; // Return array for Table
    }

    // Otherwise fetch fresh
    const refreshed = await this.refreshData();
    return refreshed ? refreshed.response : [];
  },


  /** Refresh data (always calls API) **/
  async refreshData() {
    try {
      const result = await GetClaims.run();
      if (result && result.success) {
        await storeValue(this.cacheKey, result);
        showAlert("Claims refreshed successfully", "success");
        return result;
      } else {
        showAlert("Failed to refresh claims", "warning");
        return null;
      }
    } catch (error) {
      showAlert(`Error loading claims: ${error.message}`, "error");
      return null;
    }
  },

  /** Clear cached data **/
  async clearCache() {
    await removeValue(this.cacheKey);
    showAlert("Claims cache cleared", "info");
  }
};
