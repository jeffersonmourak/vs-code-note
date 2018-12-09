import { window, InputBoxOptions, StatusBarItem, StatusBarAlignment, ExtensionContext } from 'vscode';
import Decorator from '../Decorator';
import Notes from '../Notes';
import I18n from '../locale/I18n';
import Command from './Command.interface';

class NewNote implements Command {
	public name : string = 'extension.addNewNote';
	private statusBarItem : StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
	
	init(context: ExtensionContext) {
		this.statusBarItem.text = `$(comment)`;
		this.statusBarItem.show();
		this.statusBarItem.command = this.name;
		this.statusBarItem.tooltip = I18n.translate('commands.newNote.tooltip');

		context.subscriptions.push(this.statusBarItem);
	}

	callback (editor : any) {
        let options: InputBoxOptions = {
			prompt: I18n.translate('commands.newNote.prompt'),
			placeHolder: I18n.translate('commands.newNote.placeholder')
		};
        
        
        
		window.showInputBox(options).then(value => {
			if (value !== undefined && editor !== undefined) {				
				Notes.addNote(editor.document.languageId, value, editor.document.getText(editor.selection));
				Decorator.reloadNotes();
				Decorator.update(editor);
			}
		});
    }
}

export default new NewNote();