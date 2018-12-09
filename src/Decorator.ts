import { DecorationOptions, Range } from 'vscode';
import decoration from './config/decoration';
import Notes from './Notes';

class Decorator {

    reloadNotes() {
        Notes.reload();
    }

    update(activeEditor : any) {
        if (!activeEditor) {
			return;
        }
        
        let notes = Notes.loadLanguageNotes(activeEditor.document.languageId);

		const regEx = Notes.createRegex(activeEditor.document.languageId);
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

export default new Decorator();