export default {
  getFormattedSubscriberInfo() {
    return `
      <div style="line-height: 0.25;">
        <div style="font-weight: bold; font-size: 16px;">
${appsmith.store.fullName || ""}
        </div>
        <div style="font-size: 12px; color: #444;">
 ${appsmith.store.insuranceCompany || ""}
        </div>
      </div>
    `;
  }
}
