export default {
  async addVisit() {
    try {
      const response = await AddNewVisit.run();
      const result = response?.response;
      const returnCode = result?.return?.toString();
      const visitId = result?.ol2visitsId;

      // Treat as failure if return = 0 OR visitId is null
      if (returnCode === "0" || visitId == null) {
        const errorMsg = result?.msg || "Visit creation failed. Please try again.";
        showAlert(errorMsg, "error");
        return;
      }

			GetClaims.run()
      storeValue("vstId", visitId);
      storeValue("clmId", result?.ol2claimsId);
      storeValue("patVstId", appsmith.store.subscriberId);

      showAlert("Visit created successfully.", "success");
			
			
 
			setTimeout(() => {
      closeModal(create_visit_modal.name);
      navigateTo("Visit Details");
      }, 1500);

    } catch (error) {
      // 🔍 Log full raw error (for debugging)
      console.log("🔥 RAW STRINGIFIED ERROR:", JSON.stringify(error, null, 2));

      let backendError = "";
      try {
        const body = error?.data?.responseMeta?.body;

        if (typeof body === "string") {
          const parsed = JSON.parse(body);
          backendError = parsed?.error || body;
        } else if (typeof error?.data?.error === "string") {
          backendError = error.data.error;
        } else {
          backendError = error?.message;
        }
      } catch (e) {
        console.error("Error while parsing API error response", e);
      }

      const message = backendError?.split(":").pop()?.trim() || "Unknown error occurred";
      showAlert(message, "error");
    }
  }
};
