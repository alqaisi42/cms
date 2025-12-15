export default {
  getModel() {
    return {
      subsFullInfo: appsmith.store?.subsFullInfo || {},
      doctorName: appsmith.store?.doctorName || "",
      url: appsmith.URL?.queryParams || {},
      today: getTodayDate?.getTodayDate?.data || ""
    };
  }
};
