const { CronJob } = require("cron");
const { disconnectMember } = require("./disconnectMember");

function startJobs(client) {
	const disconnectEvaJob = new CronJob("0 1 * * *", () => {
		disconnectMember(client, guildId, evaId);
	});
	disconnectEvaJob.start();
}

module.exports = { startJobs };
