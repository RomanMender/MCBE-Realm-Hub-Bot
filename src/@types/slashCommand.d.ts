import Client from '../client';
import { SlashCommandBuilder } from '@discordjs/builders';

export interface slashCommand {
    data: SlashCommandBuilder,
    execute(client: Client, ...args: any[]): any
}
export interface slashCommandData {
    name: string,
    description: string,
    options: Array<any>,
    default_permission: any
}