import { SernEmitter } from "@sern/handler";
import axios from "axios";
import { ActivityType, TextChannel, EmbedBuilder, Message, VoiceBasedChannel } from "discord.js";
import { DOMParser } from "@xmldom/xmldom";
const { Client, GatewayIntentBits } = require("discord.js");
const { Sern } = require("@sern/handler");
require("dotenv").config();
const sernPrefix = process.env.PREFIX
const mongoose = require('mongoose');
const youtube = require('discord-bot-youtube-notifications');

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildVoiceStates],
	restTimeOffset: 0
});

export const db = mongoose.connect(process.env.MONGODB, {useNewUrlParser: true,useUnifiedTopology: true}).then(async => {console.log('Connected to MongoDB');})

Sern.init({
	client,
	commands : './commands',
	sernEmitter : new SernEmitter(),
	events: './events'
});


client.on('ready', async () => {
	console.log("logged on!");
	setInterval(() => {
	const statuses = [
		{ name: "Minecraft", type: ActivityType.Playing },
		{ name: "cómo escribe Javi", type: ActivityType.Watching },
		{ name: "a Hermes", type: ActivityType.Watching },
		{ name: "tus comandos", type: ActivityType.Listening },
		{ name: "tu voz", type: ActivityType.Listening }
	]
		var randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
		client.user.setActivity(randomStatus);
	  }, 10000);
});

client.on('rateLimit', async () => {
	console.log(`I just got ratelimited!`)
})

/*async function nowPlayingRadio() {
		const getAPI = await axios.get("https://opml.radiotime.com/Describe.ashx?id=s67006", {validateStatus: function (status) {return status === 200|| status === 403}}).then((res) => res.data).catch((err) => {console.log("now playing radio errored out? diesofcringe")})
		var parser = new DOMParser()
		var XMLDoc = parser.parseFromString(getAPI, "text/xml");
		let getsong, getartist;
		try {
		getsong = XMLDoc.getElementsByTagName("current_song").item(0)!.textContent
		getartist = XMLDoc.getElementsByTagName("current_artist").item(0)!.textContent
		} catch (err) {
		getsong = "Anuncios o cambio de canción"
		getartist = "catJAM"
		}
		const embed = new EmbedBuilder()
			.setColor("Blurple")
			.setTitle(`Ahora reproduciendo: ${getsong}`)
			.setAuthor({name: 'Rock FM', iconURL: 'https://cdn-profiles.tunein.com/s67006/images/logoq.png'})
			.setDescription(`Artista: ${getartist}`)
			.setFooter({text: `El nombre no cambia al instante, aparece 10 segundos después de terminar una canción.`})
		const guild = await client.guilds.fetch("928018226330337280");
		const channel = await guild.channels.fetch("1008730592835281009");
		const edit = (await channel.messages.fetch("1008778179252596736"))
		await edit.edit({content: '', embeds: [embed]})
}

function nowPlayingInterval() {
	setInterval(nowPlayingRadio, 4000)
}

nowPlayingInterval()*/

client.login(process.env.TOKEN);