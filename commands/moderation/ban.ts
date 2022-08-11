const { commandModule, CommandType } = require('@sern/handler');
import { publish } from "../../src/plugins/publish";
import { ownerOnly } from "../../src/plugins/ownerOnly";
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js'

export default commandModule({
	name: 'ban',
    type: CommandType.Both,
	plugins: [publish(['1000400148289036298', '928018226330337280']), ownerOnly()],
	description: 'ADMIN: Banea usuarios.',
	options: [{
		name: 'usuario',
		description: 'Escribe un usuario.',
		type: ApplicationCommandOptionType.User,
		required: true
	},
	{
		name: 'razon',
		description: 'Escribe la razón.',
		type: ApplicationCommandOptionType.String,
		required: true
	}],
	//alias : [],
	execute: async (ctx, options, message) => {
		const userToBan = options[1].getMember('usuario', true);
		const reason = options[1].get('razon', true).value;
		const sendToMods = ctx.client.guilds.cache.get('928018226330337280')!.channels.cache.get('1004118323258208257')
		await sendToMods.send({content: `Se ha baneado a ${userToBan}.\nBan efectuado por ${ctx.user} con razón "${reason}."`})
		userToBan.ban(reason)
		await ctx.reply({content: 'Baneado correctamente!', ephemeral: true})
	},
});