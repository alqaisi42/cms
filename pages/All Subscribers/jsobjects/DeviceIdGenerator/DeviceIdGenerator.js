export default {
  generate(deviceType = "UNKNOWN") {
    // UUID v4
    const uuid = crypto.randomUUID();

    // System format
    return `APP-${deviceType}-${uuid}`;
  }
}
