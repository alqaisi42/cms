export default {
  updateUserFlag: async () => {
    const row = usersTable.updatedRow;
    const updates = [];

    if (row.hasOwnProperty("FLG_ADMIN_BOOL")) {
      updates.push(`FLG_ADMIN = ${row.FLG_ADMIN_BOOL ? 1 : 0}`);
    }

    if (row.hasOwnProperty("FLG_ENABLED_BOOL")) {
      updates.push(`FLG_ENABLED = ${row.FLG_ENABLED_BOOL ? 1 : 0}`);
    }

    if (row.hasOwnProperty("FLG_BLOCKED_BOOL")) {
      updates.push(`FLG_BLOCKED = ${row.FLG_BLOCKED_BOOL ? 1 : 0}`);
    }

    if (updates.length === 0) {
      showAlert("No fields changed", "info");
      return;
    }

    const subsId = row.SUBS_ID; 
  const sql = `
  BEGIN
    UPDATE APP_USERS
    SET ${updates.join(", ")}
    WHERE SUBS_ID = ${subsId};
    COMMIT;
  END;
`;

    // showAlert(sql, "info"); // You can remove this after confirming
    await update_user_dynamic.run({ query: sql });
    showAlert("User updated successfully!", "success");
    await get_app_users.run();
  }
}
