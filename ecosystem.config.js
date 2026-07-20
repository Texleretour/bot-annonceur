module.exports = {
	apps: [
		{
			name: "bot-annonceur",
			script: "index.js",
			watch: ".",
			ignore_watch: ["node_modules", "assets", "config.json", "data"],
		},
	],
};
