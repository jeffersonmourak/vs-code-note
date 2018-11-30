// import { ExtensionContext, window, workspace, languages } from 'vscode';
import * as fs from 'fs';
import Constants from './config/constants';

class NoteLoader {
    private notesPath : string = Constants.settingsPath;
    private notes : any;

    constructor() {
        this.reload();
    }

    reload() {
        this.notes = JSON.parse(fs.readFileSync(this.notesPath, 'utf-8'));
    }

    loadLanguageNotes(language : any) {
        if (this.notes[language] !== undefined) {
            return { ...this.notes['*'], ...this.notes[language] };
        } else {
            return this.notes['*'];
        }
    }

    createRegex(language: any) {
        let names = Object.keys(this.loadLanguageNotes(language));

        return new RegExp(names.join('|'), 'g');
    }
}

export default NoteLoader;