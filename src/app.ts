import Client from './client';
import { Intents } from 'discord.js';
import { Config } from './@types/index';
import configJSON from './private/config.json';

const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES
    ], 
    partials: ["CHANNEL"]
});
const config: Config = configJSON;
client.init(config.token);