// import everything
const { commandModule, CommandType } = require('@sern/handler');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, EmbedBuilder, TextInputBuilder, TextInputStyle, InteractionType } = require('discord.js');
import { publish } from "../../src/plugins/publish";
import { ownerOnly } from "../../src/plugins/ownerOnly"
import { TextChannel, ThreadAutoArchiveDuration, ThreadManager } from "discord.js";

export default commandModule({
    // using CommandType.Modal to get the answers
	type: CommandType.Modal,
	plugins: [],
	description: 'Envia el formulario para entrar al servidor.',
	//alias : [],
	async execute (modal) {
		// first we get the value
		const value = modal.fields.getTextInputValue('sugerenciasInput');
		const taget = modal.user
		// then we create the embed which will be sent when the thing is sent
		const modalEmbed = new EmbedBuilder()
			.setColor("Random")
			.setTitle('Sugerencia')
			.setAuthor({name: `${modal.user.username}`, iconURL: `${modal.user.displayAvatarURL()}`})
			.setDescription(value);
		// finally send the message to the text channel
		const message1 = modal.client.guilds.cache.get('928018226330337280').channels.cache.get('1007269448140476436') as TextChannel
		const message2 = await (await message1.send({embeds: [modalEmbed]}))
		message2.startThread({name: 'Sugerencia', autoArchiveDuration: ThreadAutoArchiveDuration.ThreeDays, reason: 'AUTOMATIZADO: Hilo para discutir sobre la sugerencia.'})
		message2.react("✅")
		message2.react("❎")
		// and return the user that it worked
		modal.reply({content: '¡Enviado!', ephemeral: true})
	}
});