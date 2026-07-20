const {
	SlashCommandBuilder,
	ChannelType,
	MessageFlags,
} = require("discord.js");
const { updateConfig, readConfig } = require("../utils/configManager");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("options")
		.setDescription("Options du bot")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("message")
				.setDescription("Crée un message de connexion personnalisé")
				.addStringOption((option) =>
					option
						.setName("message")
						.setDescription(
							"Le message avec lequel le bot indiquera ta présence",
						),
				),
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("canal")
				.setDescription(
					"Choisis le canal textuel dans lequel le bot peut écrire",
				)
				.addChannelOption((option) =>
					option
						.setName("canal")
						.setDescription("Le canal textuel dans lequel le bot pourra écrire")
						.addChannelTypes(ChannelType.GuildText),
				),
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("gif")
				.setDescription("Ajoute un nouveau gif de bienvenue")
				.addStringOption((option) =>
					option
						.setName("url")
						.setDescription("Le lien du gif (https://......)"),
				),
		),

	async execute(interaction) {
		if (interaction.options.getSubcommand() === "canal") {
			const newChannelId = interaction.options.getChannel("canal").id;
			updateConfig({ boundTextChannelId: newChannelId });

			await interaction.reply({
				content: "Le canal textuel a bien été selectionné !",
				flags: MessageFlags.Ephemeral,
			});
		} else if (interaction.options.getSubcommand() === "message") {
			const memberId = interaction.member.id;
			const customMessage = interaction.options.getString("message");

			const { customMessages } = readConfig();
			customMessages[memberId] = customMessage;
			updateConfig({ customMessages: customMessages });

			await interaction.reply({
				content: "Ton message personnalisé a bien été enregistré !",
				flags: MessageFlags.Ephemeral,
			});
		} else if (interaction.options.getSubcommand() === "gif") {
			const gif = interaction.options.getString("url");

			const { gifUrls } = readConfig();
			gifUrls.push(gif);
			updateConfig({ gifUrls: gifUrls });

			await interaction.reply({
				content: "Ton gif a bien été enregistré !",
				flags: MessageFlags.Ephemeral,
			});
		} else {
			console.error(
				`Commande inconnue: ${interaction.options.getSubcommand()}`,
			);
		}
	},
};
