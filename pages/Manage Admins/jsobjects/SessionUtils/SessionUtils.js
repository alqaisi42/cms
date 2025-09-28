export default {
  async validateActiveUser(requiredRole = "Master Admin") {
    try {
      const user = appsmith.store.currentUser;

      // Case 1: No user in session
      if (!user) {
        navigateTo("SignIn");
        return false;
      }

      // Case 2: User exists but inactive
      if (user.isActive === false || user.isActive === 'N') {
        showAlert("Your account has been deactivated. Please contact admin.", "warning");

        clearStore();
        await new Promise(resolve => setTimeout(resolve, 800));
        navigateTo("SignIn");
        return false;
      }

      // Case 3: Role-based access
      if (user.role !== requiredRole) {
        showAlert("You do not have privileges to access this page.", "warning");

        // Redirect unauthorized users
        navigateTo("Users");
        return false;
      }

      // ✅ Case 4: All good
      return true;

    } catch (error) {
      console.error("Session check failed:", error);
      clearStore();
      navigateTo("SignIn");
      return false;
    }
  }
};
