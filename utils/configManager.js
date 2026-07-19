const fs = require("fs");
const path = require("path");
const configPath = path.join(__dirname, "../config.json");

function readConfig() {
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function updateConfig(updates) {
  const config = readConfig();
  Object.assign(config, updates);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  return config;
}

module.exports = { readConfig, updateConfig };
