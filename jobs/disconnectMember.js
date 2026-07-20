async function disconnectMember(client, guildId, memberId) {
	const guild =
		(await client.guilds.cache.get(guildId)) ?? client.guilds.fetch(guildId);
	const member = await guild.member.fetch(memberId);

	member.voice.disconnect();
	console.log(`Disconnected ${member.name} (id ${memberId})`);
}

module.exports = { disconnectMember };
