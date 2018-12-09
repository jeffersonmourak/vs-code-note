import * as fs from 'fs';
import Constants from './config/constants';
import { omit } from 'lodash';
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

    setLanguageNotes(language : any, notes : object) {
        this.notes[language] = notes;
    }

    createRegex(language: any) {
        let names = this.getNotesKeys(language);

        return new RegExp(names.join('|'), 'g');
    }

    getNotesKeys (language : any) {
        return Object.keys(this.loadLanguageNotes(language));
    }

    save() {
        fs.writeFileSync(this.notesPath, JSON.stringify(this.notes, null, 4), 'utf-8');
        this.reload();
    }

    deleteNote(language : any, key : string) {
        this.setLanguageNotes(language, omit({ ...this.loadLanguageNotes(language) }, key));
        this.save();
    }
}

export default new Notes();