export default {
  fetchAuditLogs: async () => {
    const subsId = appsmith.store.SubsLogsId;

    if (!subsId) {
      showAlert("No SUBS_ID set", "warning");
      return;
    }

await get_logs_by_subs_id.run();
  }
}
