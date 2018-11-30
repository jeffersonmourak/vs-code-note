import { DecorationOptions, Range } from 'vscode';
import decoration from './config/decoration';
import NotesLoader from './NotesLoader';

class Decorator {
    public notes : NotesLoader;

    constructor() {
        this.notes = new NotesLoader();
    }

    reloadNotes() {
        this.notes.reload();
    }

    update(activeEditor : any) {
        if (!activeEditor) {
			return;
        }
        
        let notes = this.notes.loadLanguageNotes(activeEditor.document.languageId);

		const regEx = this.notes.createRegex(activeEditor.document.languageId);
		const text = activeEditor.document.getText();
        const smallNumbers: DecorationOptions[] = [];

        if (Object.keys(notes).length > 0) {
            let match;
            while (match = regEx.exec(text)) {
                const startPos = activeEditor.document.positionAt(match.index);
                const endPos = activeEditor.document.positionAt(match.index + match[0].length);
                const decoration = { range: new Range(startPos, endPos), hoverMessage: `Note: ${notes[match[0]]}`};
                
                smallNumbers.push(decoration);
            }
            activeEditor.setDecorations(decoration, smallNumbers);
        }
    }
}

export default Decorator;