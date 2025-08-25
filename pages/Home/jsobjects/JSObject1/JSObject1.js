export default {
  handleVisitRowSelection() {
    const row = Table1.selectedRow;

    if (row && row.ol2visitsId) {
      storeValue("vstId", row.ol2visitsId);
      storeValue("clmId", row.ol2claimsId);
    } else {
      storeValue("vstId", null);
      storeValue("clmId", null);
    }
  }
}
