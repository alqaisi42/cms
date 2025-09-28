export default {
  async logout() {
    try {
      // 🧹 Clear all stored session data
      clearStore();

      // Optional: reset login fields if they exist
      resetWidget("InputUsername", true);
      resetWidget("InputPassword", true);

      // ✅ Show success message
      showAlert("You have been logged out successfully.", "success");

      // Small UX delay (optional)
      await new Promise(resolve => setTimeout(resolve, 600));

      // 🔁 Redirect back to SignIn page
      navigateTo("SignIn");

      return true;
    } catch (error) {
      console.error("Logout failed:", error);
      showAlert("Something went wrong while logging out!", "error");
      return false;
    }
  }
};
