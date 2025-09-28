export default {
  async login(username, password) {
    try {
      // 1️⃣ Validate inputs first
      if (!username || !password) {
        showAlert("Please enter both username and password.", "warning");
        return false;
      }

      // 2️⃣ Clean inputs safely
      const cleanUsername = String(username).trim();
      const cleanPassword = String(password).trim();

      // 3️⃣ Run query with parameters
      const result = await check_user.run({
        username: cleanUsername,
        password: cleanPassword
      });

      // 4️⃣ Handle response
      if (result && result.length > 0) {
        const user = result[0];

        // Save session
        await storeValue("currentUser", {
          id: user.ID,
          username: user.USER_ID,
          role: user.ROLE,
          isActive: user.FLG_ACTIVE === 'Y'
        });

        // Show success message
        showAlert(`Welcome ${user.USER_ID}!`, "success");

        // 5️⃣ Redirect based on role
        if (user.ROLE === 'Master Admin') {
          navigateTo('Users');
        } else if (user.ROLE === 'Admin') {
          navigateTo('Users');
        } else {
          navigateTo('Users');
        }

        return true;
      } else {
        showAlert("Invalid credentials or inactive user.", "error");
        return false;
      }

    } catch (e) {
      console.error("Login failed:", e);
      showAlert("Something went wrong during login!", "error");
      return false;
    }
  }
};
