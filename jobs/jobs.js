const { CronJob } = require("cron");
const { disconnectMember } = require("./disconnectMember");
const { readConfig } = require("../utils/configManager")

function startJobs(client) {
	const disconnectEvaJob = new CronJob("0 1 * * *", async () => {
		const { guildId, idEva } = readConfig();
		await disconnectMember(client, guildId, idEva);
	});

	disconnectEvaJob.start();
}

module.exports = { startJobs };
