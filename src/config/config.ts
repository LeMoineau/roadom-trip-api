class Config {
  getEnv() {
    return {
      port: process.env.PORT!,
      openStreetMapURL: process.env["OPEN_STREET_MAP_URL"]!,
      googleMapsApiURL: process.env["GOOGLE_MAPS_API_URL"]!,
      googleMapsApiKey: process.env["GOOGLE_MAPS_API_KEY"]!,
    };
  }
}

export default new Config();
