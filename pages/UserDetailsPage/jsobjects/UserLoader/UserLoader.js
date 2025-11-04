export default {
  async loadUsers () {
    // if already cached, return cached
    if(appsmith.store.usersCache) {
      return appsmith.store.usersCache;
    }

    // otherwise run query
    const data = await get_app_users.run();

    // save into store
    await storeValue("usersCache", data);
    await storeValue("usersLoaded", true);

    return data;
  },

  async refreshUsers () {
    // always run fresh
    const data = await get_app_users.run();

    // update cache
    await storeValue("usersCache", data);

    return data;
  },

  clearCache () {
    storeValue("usersCache", null);
    storeValue("usersLoaded", false);
  }
}
