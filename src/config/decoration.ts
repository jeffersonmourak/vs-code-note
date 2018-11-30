import { window, OverviewRulerLane } from 'vscode';

export default window.createTextEditorDecorationType({
    overviewRulerColor: 'yellow',
    overviewRulerLane: OverviewRulerLane.Right,
    light: {
        backgroundColor: '#f3db90',
        color: '#7b610e'
    },
    dark: {
        backgroundColor: '#675d42',
        color: '#dad5c4'
    }
});