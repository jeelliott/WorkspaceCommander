import * as vscode from 'vscode';

export class GroupItem extends vscode.TreeItem {
    constructor(
        public label: string,
        public projects: string[] = [],
        public collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.Collapsed,
        public command?: vscode.Command
    ) {
        super(label, collapsibleState);
    }
}