import { ExtensionContext, window, workspace, commands, InputBoxOptions } from 'vscode';
import * as fs from 'fs';
import Decorator from './Decorator';
import Notes from './Notes';
import Constants from './config/constants';



// this method is called when vs code is activated
export function activate(context: ExtensionContext) {
	
	if (!fs.existsSync(Constants.settingsPath)) {
		fs.writeFileSync(Constants.settingsPath, JSON.stringify(Constants.defaultData, null, 4), 'utf-8');
	}

	const decorator = new Decorator();
	const notes = new Notes();
	

    let activeEditor = window.activeTextEditor;

	if (activeEditor) {
		decorator.update(activeEditor);
	}

	window.onDidChangeActiveTextEditor(editor => {
        activeEditor = editor;

		if (editor) {
			decorator.update(activeEditor);
        }

	}, null, context.subscriptions);

	workspace.onDidChangeTextDocument(event => {
		if (activeEditor && event.document === activeEditor.document) {
			decorator.update(activeEditor);
		}
	}, null, context.subscriptions);

	const createNoteCmd = commands.registerCommand('extension.addNewNote', () => {
		let options: InputBoxOptions = {
			prompt: "Npte: ",
			placeHolder: "(Type here your note)"
		};
		
		window.showInputBox(options).then(value => {
			if (value !== undefined && activeEditor !== undefined) {				
				notes.addNote(activeEditor.document.languageId, value, activeEditor.document.getText(activeEditor.selection));
				decorator.reloadNotes();
				decorator.update(activeEditor);
			}
		});
	});

	context.subscriptions.push(createNoteCmd);
}
