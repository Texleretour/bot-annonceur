const { CronJob } = require("cron");
const { disconnectMember } = require("./disconnectMember");
const { readConfig } = require("../utils/configManager")

function startJobs(client) {
	const disconnectEvaJob = new CronJob("40 1 * * *", () => {
		const { guildId, idEva } = readConfig();
		disconnectMember(client, guildId, idEva);
	});

	disconnectEvaJob.start();
}

module.exports = { startJobs };
