import * as vscode from 'vscode';
import { GroupProvider } from './GroupProvider';
import { GroupItem } from './GroupItem';

export class GroupsTreeProvider implements vscode.TreeDataProvider<vscode.TreeItem> {

    private _onDidChangeTreeData: vscode.EventEmitter<GroupItem> = new vscode.EventEmitter<GroupItem>();
    readonly onDidChangeTreeData: vscode.Event<GroupItem> = this._onDidChangeTreeData.event;

    constructor() { }

    getTreeItem(element: GroupItem): GroupItem {
        return element;
    }
    getChildren(element?: GroupItem): GroupItem[] {
        if (!element) {
            return this.getGroups();
        }
        else {
            return this.getGroupProjects(element);
        }
    }

    private getGroups(): GroupItem[] {
        let groupTreeItems: GroupItem[] = [];

        GroupProvider.get().forEach(g => {
            g.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
            g.command = { command: 'groups.start', title: 'start', arguments: [g] };
            groupTreeItems.push(g);
        });

        return groupTreeItems;
    }

    private getGroupProjects(groupItem: GroupItem): GroupItem[] {
        let groupProjects: GroupItem[] = [];

        groupItem.projects.forEach(g => {
            groupProjects.push(new GroupItem(g, null, vscode.TreeItemCollapsibleState.None, null));
        });

        return groupProjects;
    }
}