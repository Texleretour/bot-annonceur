const fs = require("node:fs");
const path = require("node:path");
const configPath = path.join(__dirname, "../config.json");
const customizationPath = path.join(
	__dirname,
	"../",
	"data",
	"customization.json",
);

function readConfig() {
	return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function readCustomization() {
	return JSON.parse(fs.readFileSync(customizationPath, "utf8"));
}

function updateCustomization(updates) {
	const customization = readCustomization();
	Object.assign(customization, updates);
	fs.writeFileSync(configPath, JSON.stringify(customization, null, 2));
	return customization;
}

module.exports = { readConfig, readCustomization, updateCustomization };
