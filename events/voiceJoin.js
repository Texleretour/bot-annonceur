const { Events } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const { readConfig } = require("../utils/configManager.js");

const DEFAULT_MESSAGE = (id) => `Bordel.. <@${id}> rentre sur la piste.`;

module.exports = {
  name: Events.VoiceStateUpdate,
  async execute(oldState, newState) {
    const { customMessages, boundTextChannelId } = readConfig();

    if (newState.channelId !== null && oldState.channelId === null) {
      const channel = await newState.client.channels.fetch(newState.channelId);
      if (channel.members.size === 1) {
        const memberId = newState.member.id;

        const message = customMessages[memberId] ?? DEFAULT_MESSAGE(memberId);

        const gifsPath = path.join(__dirname, "../", "assets", "greeting-gifs");
        const gifFiles = fs
          .readdirSync(gifsPath)
          .filter((file) => file.endsWith(".gif"));
        randomGifIndex = Math.floor(Math.random() * gifFiles.length - 1);
        randomGif = gifFiles[randomGifIndex];
        randomGifPath = path.join(gifsPath, randomGif);

        const boundTextChannel =
          await newState.client.channels.fetch(boundTextChannelId);
        await boundTextChannel
          .send(message, {
            files: [randomGifPath],
          })
          .then(`Sent message: ${message} and gif: ${randomGif}`)
          .catch(console.error);
      }
    }
  },
};
