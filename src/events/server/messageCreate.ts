import { Event } from "../../@types/index";
import { Message, MessageEmbed } from 'discord.js';
import { prefix, ID } from '../../private/settings.json';

export const event: Event = {
    name: 'messageCreate',
    async execute(client, message: Message) {
        if(message.author.bot) return;
        //Bot mentioned
        if(message.content.match(new RegExp(`^<@!${client.user.id}>$`))) {
            const embed = new MessageEmbed()
                .setColor('BLURPLE')
                .setAuthor(client.user.tag, client.user.displayAvatarURL())
                .setDescription(`Hello I'm ${client.user.username}!\nMy prefix is \`${prefix}\`\nType \`${prefix}help\` to get a list of my commands!`)
                .setTimestamp();
            message.reply({ embeds: [embed] });
        };
        //Showcase channel
        if(message.channel.id === ID.showcaseChannel && message.channel.type === 'GUILD_NEWS') {
            if(!message.attachments.size) return message.delete();
            message.startThread({ name: 'Discussion', autoArchiveDuration: 'MAX' });
            message.crosspost();
        };
        //Suggestion channel
        if(message.channel.id === ID.suggestionChannel) {
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(`\`${message.content.replace(/`/g, '')}\``)
                .setFooter(message.author.id)
                .setTimestamp();
            const embedMsg = await message.channel.send({ embeds: [embed] });
            try {
                await embedMsg.react('<:upvote:821114922645192704>');
                await embedMsg.react('<:downvote:821114932049215579>');
            } catch(e) {}
            embedMsg.startThread({ name: 'Discussion', autoArchiveDuration: 'MAX' });
            message.delete();
        };
    }
};