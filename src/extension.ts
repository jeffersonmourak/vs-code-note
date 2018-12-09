import { ExtensionContext, window, workspace } from 'vscode';
import Decorator from './Decorator';
import Notes from './Notes';
import Commands from './commands';

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

	Commands(context);
}
