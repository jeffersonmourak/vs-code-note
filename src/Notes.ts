import * as fs from 'fs';
import Constants from './config/constants';

class Notes {
    private notesPath : string = Constants.settingsPath;
    private notes : any;

    constructor() {
        this.reload();
    }

    reload() {
        this.notes = JSON.parse(fs.readFileSync(this.notesPath, 'utf-8'));
    }

    addNote(language: string, value: string, name: string) {
        if (this.notes[language] === undefined) {
            this.notes[language] = {};
        }

        this.notes[language][name] = value;

        this.save();
    }

    save() {
        fs.writeFileSync(this.notesPath, JSON.stringify(this.notes, null, 4), 'utf-8');
        this.reload();
    }
}

export default Notes;