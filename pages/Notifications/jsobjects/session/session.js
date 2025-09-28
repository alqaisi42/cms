export default {
  async checkLogin() {
    try {
      const user = appsmith.store.currentUser;

      // 🧠 Case 1: No user logged in
      if (!user || !user.username) {
        showAlert("Please log in to continue.", "warning");
        clearStore();
        navigateTo("SignIn");
        return false;
      }

      // 🚫 Case 2: User is inactive
      if (user.isActive === false || user.isActive === "N") {
        showAlert("Your account is inactive. Please contact your administrator.", "warning");
        clearStore();
        navigateTo("SignIn");
        return false;
      }

      // ✅ Case 3: Logged in and active
      return true;

    } catch (error) {
      console.error("Login check failed:", error);
      clearStore();
      navigateTo("SignIn");
      return false;
    }
  }
};
