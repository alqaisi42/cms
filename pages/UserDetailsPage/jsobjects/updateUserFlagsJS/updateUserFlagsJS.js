export default {
  updateUserFlag: async () => {
    const row = subsTable.updatedRow;
    const updates = [];

    if (row.hasOwnProperty("IS_ADMIN")) {
      updates.push(`FLG_ADMIN = ${row.IS_ADMIN ? 1 : 0}`);
    }

    if (row.hasOwnProperty("IS_ENABLED")) {
      updates.push(`FLG_ENABLED = ${row.IS_ENABLED ? 1 : 0}`);
    }

    if (row.hasOwnProperty("IS_BLOCKED")) {
      updates.push(`FLG_BLOCKED = ${row.IS_BLOCKED ? 1 : 0}`);
    }
		
    if (row.hasOwnProperty("DEVICE_ID")) {
      updates.push(`DEVICE_ID = '${row.DEVICE_ID}'`);
    }
		
    if (updates.length === 0) {
      showAlert("No fields changed", "info");
      return;
    }

    const subsId = row.ID; 
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
    await get_Subs_Details.run();
  }
}
