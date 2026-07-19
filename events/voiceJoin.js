const { Events } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const { readConfig } = require("../utils/configManager.js");

const DEFAULT_MESSAGE = (id) => `Bordel.. <@${id}> rentre sur la piste.`;
const gifsPath = path.join(__dirname, "../", "assets", "greeting-gifs");

module.exports = {
  name: Events.VoiceStateUpdate,
  async execute(oldState, newState) {
    const { customMessages, gifUrls, boundTextChannelId } = readConfig();

    if (newState.channelId !== null && oldState.channelId === null) {
      const channel = await newState.client.channels.fetch(newState.channelId);
      if (channel.members.size === 1) {
        const memberId = newState.member.id;

        const message = customMessages[memberId] ?? DEFAULT_MESSAGE(memberId);

        randomGifIndex = Math.floor(Math.random() * gifUrls.length);
        randomGif = gifUrls[randomGifIndex];

        const boundTextChannel =
          await newState.client.channels.fetch(boundTextChannelId);
        boundTextChannel
          .send({
            content: `${message} [gif](${randomGif})`,
          })
          .then(
            console.log(`Sent message: ${message}\n with gif: ${randomGif}`),
          )
          .catch(console.error);
      }
    }
  },
};
