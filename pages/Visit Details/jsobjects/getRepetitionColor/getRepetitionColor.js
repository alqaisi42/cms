export default {
  getRepetitionColor(item) {
    const requested = parseInt(item.requestedRepetition);
    const mpRequested = parseInt(item.mpRequestedRepetition);

    if (requested === mpRequested) {
      return "#1976D2"; // ✅ colorPrimary (Blue)
    } else if (requested < mpRequested && requested > 0) {
      return "#FFA500"; // 🟠 Orange
    } else if (requested === 0) {
      return "#F44336"; // 🔴 Red
    } else {
      return "#ffffff"; // ⚪ white (default/unknown)
    }
  }
};
