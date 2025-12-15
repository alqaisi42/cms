export default {
  async fetchProcFinValues() {
    try {
		
				if (	clmDtl.selectedOptionValue !== '' ){
					   const res = await getProcFin.run();
      const data = res.response;

      // Store individually if needed
      storeValue("coInsurance", data.pcoInsTotAmt?.toFixed(2) || "0.00");
      storeValue("netAmount", data.pmpNetAmt?.toFixed(2) || "0.00");
      storeValue("price", data.preturn?.toFixed(2) || "0.00");
      storeValue("rejected", data.ppriceListRejAmt?.toFixed(2) || "0.00");
      storeValue("service", data.ptpaMpServiceAmt?.toFixed(2) || "0.00");
      storeValue("discount", data.pmpDiscAmt?.toFixed(2) || "0.00");
      storeValue("claimedAmount", data.preturn?.toFixed(2) || "0.00");

				}else{
					  storeValue("coInsurance", "0.00");
      storeValue("netAmount", "0.00");
      storeValue("price",  "0.00");
      storeValue("rejected",  "0.00");
      storeValue("service",  "0.00");
      storeValue("discount", "0.00");
      storeValue("claimedAmount", "0.00");
				}
   
    } catch (e) {
      showAlert("Error loading financial values", "error");
      console.error(e);
    }
  }
}
