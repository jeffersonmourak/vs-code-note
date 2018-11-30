import * as path from 'path';
import * as os from 'os';

export default {
    settingsPath: path.resolve(os.homedir(), '.vscode/vs-code-notes-settings.json'),
    defaultData: {
        '*': {}
    }
};