export default {
  lastClickTime: 0,

  handleRowClick: () => {
    const now = new Date().getTime();
    const row = usersTable.selectedRow;

    if (!row) return;

    if (now - this.lastClickTime < 300) {
      // Double-click detected (within 300ms)
      navigateTo("UserDetailsPage", {
        subsId: row.SUBS_ID,
        userName: row.USER_NAME
      });
    }

    this.lastClickTime = now;
  }
}
