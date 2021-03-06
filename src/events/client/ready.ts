import {
    Event,
    BotStatus
} from "../../@types";

export const event: Event = {
    name: 'ready',
    once: true,
    async execute(client) {
        const twitchURL = "https://www.twitch.tv/mcbe_realm_hub";
        const botStatus: Array<BotStatus> = [
            {
                statusType: "STREAMING",
                URL: twitchURL,
                statusMessage: "@mention me!"
            },
            {
                statusType: "WATCHING",
                statusMessage: `over ${client.users.cache.size} users`
            },
            {
                statusType: "LISTENING",
                statusMessage: `${client.channels.cache.size} channels`
            }
        ];
        var onIndex = 1;
        function randomStatus() {
            const status = botStatus[onIndex - 1];
            client.user.setActivity(status.statusMessage ? status.statusMessage : null, {
                type: status.statusType ? status.statusType : null,
                url: status.URL ? status.URL : null
            });
            botStatus.length === onIndex ? onIndex = 1 : onIndex++;
        }; 
        setInterval(randomStatus, 15000);
        randomStatus();
        client.logger.success(`${client.user.username} is online!`);
        //client.application.commands.set([]);
    }
};