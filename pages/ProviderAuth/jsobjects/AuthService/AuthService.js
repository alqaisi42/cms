export default {
  async login() {
    try {
      const response = await LoginMedexaApi.run();
      console.log("Login API response:", response);

      const user = response?.response;
      const userId = user?.userId;

      if (userId) {
        // Save the full response object in store
        storeValue("userProfile", user);

        // Optionally store individual values
        storeValue("userName", user.userNameE);
        storeValue("userLang", user.userLang);
        storeValue("docId", user.docId);
        storeValue("mpId", user.mpId);
        storeValue("sysMpType", user.sysMpType);
        storeValue("doctorName", user.userNameE);
				storeValue("docUserId", user.userId);
				storeValue("fullMpDescE", user.fullMpDescE);
				
				

				storeValue("mpUser", IDInput.text);
				storeValue("mpPass", PasswordInput.text);
        showAlert("Login successful", "success");
        navigateTo("Home");
      } else {
        throw new Error("Login failed: Please check username and password");
      }
    } catch (error) {
      showAlert(error.message, "error");
      console.error("Login error:", error);
    }
  }
};
