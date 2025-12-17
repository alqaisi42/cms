export default {
  updateUserFlag: async () => {

    /* =======================
       Helpers
    ======================== */

    const flag = (v) =>
      v === true || v === 1 || v === "1" ? 1 : 0;

    const num = (v, fallback = null) =>
      v === undefined || v === null || v === "" ? fallback : Number(v);

    const sqlString = (v) =>
      v === undefined || v === null
        ? null
        : `'${String(v).replace(/'/g, "''")}'`;

    /* =======================
       Rows
    ======================== */

    const updated = dep_table.updatedRow || {};
    const selected = dep_table.selectedRow || {};

    // ✅ SAFEST way
    const subsId = num(selected.SUBS_ID ?? selected.ID);
    if (!subsId) {
      showAlert("No subscriber selected", "error");
      return;
    }

    const hofId = num(selected.HOF_ID, subsId);

    /* =======================
       APP_USERS UPDATE
    ======================== */

    const appUserUpdates = [];

    if (updated.IS_ADMIN !== undefined) {
      appUserUpdates.push(`FLG_ADMIN = ${flag(updated.IS_ADMIN)}`);
    }

    if (updated.IS_ENABLED !== undefined) {
      const enabled = flag(updated.IS_ENABLED);
      appUserUpdates.push(`FLG_ENABLED = ${enabled}`);

      if (enabled === 0) {
        await notificationJS.sendReminder(subsId);
      }
    }

    if (updated.IS_BLOCKED !== undefined) {
      appUserUpdates.push(`FLG_BLOCKED = ${flag(updated.IS_BLOCKED)}`);
    }

    if (updated.DEVICE_ID !== undefined) {
      appUserUpdates.push(
        updated.DEVICE_ID
          ? `DEVICE_ID = ${sqlString(updated.DEVICE_ID)}`
          : `DEVICE_ID = NULL`
      );
    }

    if (updated.DEPENDENT_PHONE !== undefined) {
      const phone = updated.DEPENDENT_PHONE?.substring(0, 15) || '';
      appUserUpdates.push(`MOBILE_NUMBER = ${sqlString(phone)}`);
    }

    const appUsersSql = appUserUpdates.length
      ? `
        UPDATE COREAPPS.APP_USERS
        SET ${appUserUpdates.join(", ")}
        WHERE SUBS_ID = ${subsId}
      `
      : '';

    /* =======================
       DEPENDENTS_PHONE MERGE
    ======================== */

    const dependentPhoneSql =
      updated.DEPENDENT_PHONE !== undefined
        ? `
        MERGE INTO COREAPPS.DEPENDENTS_PHONE d
        USING (
          SELECT 
            ${subsId} AS SUBS_ID,
            ${hofId} AS HOF_ID,
            ${sqlString(updated.DEPENDENT_PHONE.substring(0, 15))} AS PHONE_NUMBER,
            SYSDATE AS CREATED_DATE
          FROM DUAL
        ) src
        ON (d.SUBS_ID = src.SUBS_ID)
        WHEN MATCHED THEN
          UPDATE SET
            d.PHONE_NUMBER = src.PHONE_NUMBER,
            d.CREATED_DATE = src.CREATED_DATE
        WHEN NOT MATCHED THEN
          INSERT (
            ID,
            SUBS_ID,
            HOF_ID,
            PHONE_NUMBER,
            CREATED_DATE
          )
          VALUES (
            COREAPPS.DEPENDENTS_PHONE_SEQ.NEXTVAL,
            src.SUBS_ID,
            src.HOF_ID,
            src.PHONE_NUMBER,
            src.CREATED_DATE
          )
      `
        : '';

    /* =======================
       Final SQL
    ======================== */

    if (!appUsersSql && !dependentPhoneSql) {
      showAlert("No changes detected", "info");
      return;
    }

    const fullSql = `
      BEGIN
        ${appUsersSql ? appUsersSql + ';' : ''}
        ${dependentPhoneSql ? dependentPhoneSql + ';' : ''}
        COMMIT;
      END;
    `;

    /* =======================
       Execute
    ======================== */

    try {
      await update_user_dynamic.run({ query: fullSql });

      showAlert("User updated successfully", "success");

      await getSubsDep.run();

    } catch (e) {
      console.error(e);
      showAlert(e.message || "Update failed", "error");
    }
  }
};
