async function disconnectMember(client, guildId, memberId) {
  const guild = await client.guilds.fetch(guildId);
  const member = await guild.members.fetch(memberId);

  if (member.voice.channel) {
    member.voice
      .disconnect()
      .then(() => {
        member.send("Tu as été déconnecté hehe, bonne nuit ! ");
        console.log(`Disconnected ${member.name} (id ${memberId})`);
      })
      .catch(console.error);
  }
}

module.exports = { disconnectMember };
