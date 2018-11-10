import * as vscode from 'vscode';


export class ProjectItem extends vscode.TreeItem {
    constructor(
        public type: string,
        public path: string,
        public url: string = '',
        public label: string,
        public collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None,
        public command?: vscode.Command) {
        super(label, collapsibleState);
    }
    contextValue = 'idle';
}