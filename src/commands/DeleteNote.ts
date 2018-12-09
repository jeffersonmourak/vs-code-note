import { window, StatusBarItem, StatusBarAlignment, ExtensionContext } from 'vscode';
import Notes from '../Notes';
import I18n from '../locale/I18n';
import Command from './Command.interface';
import Context from '../Context';
import Decorator from '../Decorator';

class DeleteNote implements Command {
    public name : string = 'extension.deleteNote';
    
    private editor : any = window.activeTextEditor;
	private statusBarItem : StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
	
	init(context: ExtensionContext) {
		this.statusBarItem.text = `$(trashcan)`;
		this.statusBarItem.command = this.name;
		this.statusBarItem.tooltip = I18n.translate('commands.deleteNote.tooltip');
        context.subscriptions.push(this.statusBarItem); 

        Context.subscribe('noteSelected', (word : string) => {
            this.statusBarItem.show();
        });

        Context.subscribe('noNoteSelected', () => {
            this.statusBarItem.hide();
        });
	}

	callback (editor : any) {
        let affirmative = I18n.translate('common.yes');
        let negative = I18n.translate('common.no');

        window.showInformationMessage(I18n.translate('commands.deleteNote.prompt'), affirmative, negative)
            .then( selection => {
                if (selection === affirmative) {
                    Notes.deleteNote(this.editor.document.languageId, this.editor.document.getText(this.editor.selection));

                    Decorator.reloadNotes();
				    Decorator.update(this.editor);
                }
            });
    }
}

export default new DeleteNote();