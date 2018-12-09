import { ExtensionContext, window, workspace } from 'vscode';
import Decorator from './Decorator';
import Notes from './Notes';
import Commands from './commands/index';
import Context from './Context';

export function activate(context: ExtensionContext) {
	let activeEditor = window.activeTextEditor;

	Notes.init();
	
	if (activeEditor) {
		Decorator.update(activeEditor);
	}

	window.onDidChangeActiveTextEditor(editor => {
        activeEditor = editor;

		if (editor) {
			Decorator.update(activeEditor);
        }
	}, null, context.subscriptions);

	workspace.onDidChangeTextDocument(event => {
		if (activeEditor && event.document === activeEditor.document) {
			Decorator.update(activeEditor);
		}
	}, null, context.subscriptions);

	window.onDidChangeTextEditorSelection( () => {
		if (activeEditor) {
			let selectedWord = activeEditor.document.getText(activeEditor.selection);

			if (!selectedWord) {
				Context.publish('noNoteSelected');
			} else {
				let allNotesKeys : Array<any> = Notes.getNotesKeys(activeEditor.document.languageId);

				if (allNotesKeys.some( k => k === selectedWord )) {
					Context.publish('noteSelected', selectedWord);
				} else {
					Context.publish('noNoteSelected');
				}
			}
		}
	});

	Commands(context);
}
