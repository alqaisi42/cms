export default {
  updateUserFlag: async () => {
    const row = dep_table.updatedRow;
    const appUserUpdates = [];

    if (row.hasOwnProperty("IS_ADMIN")) {
      appUserUpdates.push(`FLG_ADMIN = ${row.IS_ADMIN ? 1 : 0}`);
    }

    if (row.hasOwnProperty("IS_ENABLED")) {
      appUserUpdates.push(`FLG_ENABLED = ${row.IS_ENABLED ? 1 : 0}`);
			
			if(row.IS_ENABLED == 0 ){
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

    let appUsersSql = '';
    if (appUserUpdates.length > 0) {
      appUsersSql = `
        UPDATE COREAPPS.APP_USERS
        SET ${appUserUpdates.join(", ")}
        WHERE SUBS_ID = ${subsId}
      `;
    }

    let dependentPhoneSql = '';
    if (row.hasOwnProperty("DEPENDENT_PHONE")) {
      dependentPhoneSql = `
        MERGE INTO COREAPPS.DEPENDENTS_PHONE d
        USING (SELECT ${subsId} AS SUBS_ID, '${row.DEPENDENT_PHONE}' AS PHONE_NUMBER, SYSDATE AS CREATED_DATE FROM DUAL) src
        ON (d.SUBS_ID = src.SUBS_ID)
        WHEN MATCHED THEN
          UPDATE SET d.PHONE_NUMBER = src.PHONE_NUMBER, d.CREATED_DATE = src.CREATED_DATE
        WHEN NOT MATCHED THEN
          INSERT (SUBS_ID, HOF_ID, PHONE_NUMBER, CREATED_DATE)
          VALUES (src.SUBS_ID, ${row.HOF_ID || subsId}, src.PHONE_NUMBER, src.CREATED_DATE)
      `;
    }
		
    let fullSql = '';
    if (appUsersSql || dependentPhoneSql) {
        fullSql = `
            BEGIN
              ${appUsersSql ? appUsersSql + ';' : ''}
              ${dependentPhoneSql ? dependentPhoneSql + ';' : ''}
              COMMIT;
            END;
        `;
    } else {
      showAlert("No relevant fields changed for update.", "info");
      return;
    }

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