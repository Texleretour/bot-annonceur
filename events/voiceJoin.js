const { Events } = require("discord.js");
const { readConfig, readCustomization } = require("../utils/configManager.js");

const DEFAULT_MESSAGE = (id) => `Bordel.. <@${id}> rentre sur la piste.`;
const DEFAULT_GIF = "https://klipy.com/gifs/exploding-car-explode-1";

module.exports = {
	name: Events.VoiceStateUpdate,
	async execute(oldState, newState) {
		const { customMessages, customGifs } = readCustomization();
		const { boundTextChannelId } = readConfig();

		if (newState.channelId !== null && oldState.channelId === null) {
			const channel = await newState.client.channels.fetch(newState.channelId);
			if (channel.members.size === 1) {
				const memberId = newState.member.id;

				const message = customMessages[memberId] ?? DEFAULT_MESSAGE(memberId);

				const randomGifIndex = Math.floor(Math.random() * customGifs.length);
				const randomGif = customGifs[randomGifIndex] ?? DEFAULT_GIF;

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
