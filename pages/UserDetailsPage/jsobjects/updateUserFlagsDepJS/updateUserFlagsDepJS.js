export default {
  updateUserFlag: async () => {
    const row = dep_table.updatedRow;
    const appUserUpdates = [];

    if (row.hasOwnProperty("IS_ADMIN")) {
      appUserUpdates.push(`FLG_ADMIN = ${row.IS_ADMIN ? 1 : 0}`);
    }

    if (row.hasOwnProperty("IS_ENABLED")) {
      appUserUpdates.push(`FLG_ENABLED = ${row.IS_ENABLED ? 1 : 0}`);
       if (row.IS_ENABLED == 0) {
        await notificationJS.sendReminder(row.ID);
      }
     
    }

    if (row.hasOwnProperty("IS_BLOCKED")) {
      appUserUpdates.push(`FLG_BLOCKED = ${row.IS_BLOCKED ? 1 : 0}`);
    }

    if (row.hasOwnProperty("DEVICE_ID")) {
      appUserUpdates.push(`DEVICE_ID = ${row.DEVICE_ID ? `'${row.DEVICE_ID}'` : 'NULL'}`);
    }

    if (row.hasOwnProperty("USER_PHONE")) {
      const mobileNumber = row.DEPENDENT_PHONE ? row.DEPENDENT_PHONE.substring(0, 15) : '';
      appUserUpdates.push(`MOBILE_NUMBER = '${mobileNumber}'`);
    }

    const subsId = row.ID;

    // Build PL/SQL block for Oracle 9i
    let fullSql = `
      DECLARE
        v_exists NUMBER := 0;
        v_changes NUMBER := 0;
      BEGIN
        -- check if user exists
        SELECT COUNT(*) INTO v_exists FROM COREAPPS.APP_USERS WHERE SUBS_ID = ${subsId};

        IF v_exists > 0 THEN
          ${appUserUpdates.length > 0 ? `
          UPDATE COREAPPS.APP_USERS
          SET ${appUserUpdates.join(", ")}
          WHERE SUBS_ID = ${subsId};
          v_changes := v_changes + SQL%ROWCOUNT;` : ''}
        END IF;

        -- handle DEPENDENTS_PHONE manually (no MERGE in 9i)
        UPDATE COREAPPS.DEPENDENTS_PHONE
        SET PHONE_NUMBER = '${row.DEPENDENT_PHONE}', CREATED_DATE = SYSDATE
        WHERE SUBS_ID = ${subsId};
        v_changes := v_changes + SQL%ROWCOUNT;

        IF SQL%ROWCOUNT = 0 THEN
          INSERT INTO COREAPPS.DEPENDENTS_PHONE (ID, SUBS_ID, HOF_ID, PHONE_NUMBER, CREATED_DATE, FLG_ENABLE)
          VALUES (DEPENDENTS_PHONE_SEQ.NEXTVAL, ${subsId}, ${row.HOF_ID || subsId}, '${row.DEPENDENT_PHONE}', SYSDATE, 1);
          v_changes := v_changes + 1;
        END IF;

        IF v_changes = 0 THEN
          RAISE_APPLICATION_ERROR(-20001, 'No rows updated or inserted.');
        END IF;

        COMMIT;
      END;
    `;

    try {
      await update_user_dynamic.run({ query: fullSql });
      showAlert("User and/or Dependent information updated successfully!", "success");
      await getSubsDep.run();
    } catch (error) {
      showAlert("Error updating user information: " + error.message, "error");
      console.error("Update error:", error);
    }
  }
}
