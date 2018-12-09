import * as fs from 'fs';
import Constants from './config/constants';

class Notes {
    private notesPath : string = Constants.settingsPath;
    private notes : any;

    constructor() {
        this.reload();
    }

    init() {
        if (!fs.existsSync(Constants.settingsPath)) {
            fs.writeFileSync(Constants.settingsPath, JSON.stringify(Constants.defaultData, null, 4), 'utf-8');
        }
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

    save() {
        fs.writeFileSync(this.notesPath, JSON.stringify(this.notes, null, 4), 'utf-8');
        this.reload();
    }
}

export default new Notes();