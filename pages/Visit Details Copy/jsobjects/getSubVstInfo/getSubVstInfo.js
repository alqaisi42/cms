export default {
  async loadSubsInfo() {
    try {
      const res = await getSubsVstInfo.run();
      const subs = res.response?.subs;
      const cntDtl = res.response?.cntDtl;
      const degree = res.response?.degree;
      const company = res.response?.insuranceCompanyNameEn;
      const policyPeriod = res.response?.policyRangDate;

      if (res.success && subs) {
        storeValue("subsFullInfo", res.response); 

        storeValue("subscriberId", subs.id);
        storeValue("fullName", subs.nameEnglish);
        storeValue("nationalNo", subs.nationalNO);
        storeValue("birthDate", subs.birthDate);
        storeValue("maritalStatus", subs.maritalStatusEnglish);
        storeValue("degreeDesc", degree?.descE || "");
        storeValue("insuranceCompany", company || "");
        storeValue("policyPeriod", policyPeriod || "");
        storeValue("policyId", res.response?.cnt?.id || "");
      } else {
        throw new Error("Invalid subscriber response");
      }

    } catch (err) {
      showAlert("Failed to load subscriber info", "error");
      console.error(err);
    }
  }
}
