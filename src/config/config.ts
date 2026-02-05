class Config {
  getEnv() {
    return {
      port: process.env.PORT!,
      openStreetMapURL: process.env["OPEN_STREET_MAP_URL"]!,
    };
  }
}

export default new Config();
