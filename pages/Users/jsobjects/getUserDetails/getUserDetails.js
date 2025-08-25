export default {
  storeUserDetails: async () => {
    const response = await get_Subs_Details.run();
    const user = response[0];
    storeValue("SubsData", user);
  }
}
