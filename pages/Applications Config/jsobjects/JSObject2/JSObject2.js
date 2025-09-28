export default {
  /**
   * ✅ Validates if the user is logged in, active, and has Coretech privileges.
   * If not, it clears the session and redirects appropriately.
   */
  async validateCoretechUser() {
    try {
      const user = appsmith.store.currentUser;

      // Case 1️⃣: No user logged in
      if (!user) {
        navigateTo("SignIn");
        return false;
      }

      // Case 2️⃣: Inactive account
      if (user.isActive === false || user.isActive === 'N') {
        showAlert("Your account is inactive. Please contact administrator.", "warning");
        clearStore();
        await new Promise(resolve => setTimeout(resolve, 800));
        navigateTo("SignIn");
        return false;
      }

      // Case 3️⃣: Role validation
      if (user.role !== "Coretech") {
        showAlert("You do not have Coretech privileges.", "warning");
        navigateTo("Users");
        return false;
      }

      // ✅ Case 4️⃣: Valid Coretech user
      return true;

    } catch (error) {
      console.error("Coretech access check failed:", error);
      clearStore();
      navigateTo("SignIn");
      return false;
    }
  }
};
