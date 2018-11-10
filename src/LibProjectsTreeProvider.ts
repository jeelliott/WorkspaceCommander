import * as vscode from 'vscode';
import { ProjectProvider } from './ProjectProvider';
import { ProjectItem } from './ProjectItem';

export class LibProjectsTreeProvider implements vscode.TreeDataProvider<ProjectItem> {

    private _onDidChangeTreeData: vscode.EventEmitter<ProjectItem> = new vscode.EventEmitter<ProjectItem>();
    readonly onDidChangeTreeData: vscode.Event<ProjectItem> = this._onDidChangeTreeData.event;

    constructor() { }

    getTreeItem(element: ProjectItem): ProjectItem {
        return element;
    }
    getChildren(element: ProjectItem): ProjectItem[] {
        if (!element) {
            return this.getProjects();
        }
        else {
            return [];
        }
    }

    private getProjects(): ProjectItem[] {
        let projectTreeItems: ProjectItem[] = [];

        ProjectProvider.get().forEach(p => {
            if (p.type === "LIB") {
                p.command = { command: 'projects.action', title: 'action', arguments: [p] };
                projectTreeItems.push(p);
            }
        });

        return projectTreeItems;
    }
}