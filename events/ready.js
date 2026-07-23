const { Events } = require("discord.js");
const { startJobs } = require("../jobs/jobs");

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		startJobs(client);
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
