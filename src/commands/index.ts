import { ExtensionContext, commands } from 'vscode';
import NewNote from './NewNote';
import DeleteNote from './DeleteNote';

const COMMANDS = [ NewNote, DeleteNote ];

export default (context : ExtensionContext) => {
    for (let command of COMMANDS) {
        command.init(context);

        let cmd = commands.registerCommand(command.name, () => { command.callback(context); });

        context.subscriptions.push(cmd);
    }
};