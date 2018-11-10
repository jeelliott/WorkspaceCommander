'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { GroupsTreeProvider } from './GroupsTreeProvider';
import { UxProjectsTreeProvider } from './UxProjectsTreeProvider';
import { ApiProjectsTreeProvider } from './ApiProjectsTreeProvider';
import { EntProjectsTreeProvider } from './EntProjectsTreeProvider';
import { TerminalProvider } from './TerminalProvider';
import { LibProjectsTreeProvider } from './LibProjectsTreeProvider';
import { ProjectItem } from './ProjectItem';
import { GroupItem } from './GroupItem';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
//export function activate(context: vscode.ExtensionContext) {
export function activate() {

    const groupsTree = new GroupsTreeProvider();
    const uxProjectsTree = new UxProjectsTreeProvider();
    const apiProjectsTree = new ApiProjectsTreeProvider();
    const entProjectsTree = new EntProjectsTreeProvider();
    const libProjectsTree = new LibProjectsTreeProvider();
    const terminalProvider = new TerminalProvider();

    vscode.window.registerTreeDataProvider('groupsTree', groupsTree);
    vscode.window.registerTreeDataProvider('uxProjectsTree', uxProjectsTree);
    vscode.window.registerTreeDataProvider('apiProjectsTree', apiProjectsTree);
    vscode.window.registerTreeDataProvider('entProjectsTree', entProjectsTree);
    vscode.window.registerTreeDataProvider('libProjectsTree', libProjectsTree);

    vscode.window.onDidCloseTerminal((e) => {
        terminalProvider.onDidCloseTerminal(e);
    });

    vscode.commands.registerCommand("projects.action", (project: ProjectItem) => {
        let cmd = "";

        if (project.type === "UX") {
            if (terminalProvider.terminals[project.label] === undefined) {
                cmd = "npm start";
                terminalProvider.startTerminal(cmd, project.path, project.label);
                project.iconPath = vscode.ThemeIcon.File;
                project.contextValue = "running";
                uxProjectsTree.refresh(project);
            }
            else {
                terminalProvider.startTerminal("open " + project.url, "", "zsh");
            }
        }
        else if (project.type === "LIB") {
            cmd = "dotnet build";
            terminalProvider.startTerminal(cmd, project.path, project.label);
        }
        else {
            if (terminalProvider.terminals[project.label] === undefined) {
                cmd = "dotnet run";
                terminalProvider.startTerminal(cmd, project.path, project.label);
                project.iconPath = vscode.ThemeIcon.File;
                project.contextValue = "running";
                if (project.type === "API") {
                    apiProjectsTree.refresh(project);
                }
                else {
                    entProjectsTree.refresh(project);
                }
            }
            else {
                terminalProvider.startTerminal("open " + project.url + "swagger/", "", "opener");
            }
        }
    });

    vscode.commands.registerCommand("projects.stop", (project: ProjectItem) => {
        terminalProvider.stopTerminal(project.label);
        project.iconPath = null;
        project.contextValue = "idle";
        if (project.type === "UX") {
            uxProjectsTree.refresh(project);
        }
        else if (project.type === "API") {
            apiProjectsTree.refresh(project);
        }
        else {
            entProjectsTree.refresh(project);
        }
    });

    vscode.commands.registerCommand("projects.restart", (project: ProjectItem) => {
        vscode.commands.executeCommand("projects.stop", project);
        vscode.commands.executeCommand("projects.action", project);
    });

    vscode.commands.registerCommand("groups.start", (group: GroupItem) => {
        let project: ProjectItem;
        let uxProject: ProjectItem;
        let uxChildren = uxProjectsTree.getChildren(null);
        let apiProject: ProjectItem;
        let apiChildren = apiProjectsTree.getChildren(null);
        let entProject: ProjectItem;
        let entChildren = entProjectsTree.getChildren(null);

        // loop project in each tree looking for the name in the group
        // if found and not running, go ahead and start it

        group.projects.forEach(g => {
            if (g.indexOf("Ux") !== -1) {
                uxChildren.forEach(p => {
                    if (p.label === g && p.contextValue !== "running") { uxProject = p; }
                });
            }
            if (g.indexOf("Api") !== -1) {
                apiChildren.forEach(p => {
                    if (p.label === g && p.contextValue !== "running") { apiProject = p; }
                });
            }
            if (g.indexOf("Ent") !== -1) {
                entChildren.forEach(p => {
                    if (p.label === g && p.contextValue !== "running") { entProject = p; }
                });
            }
            project = uxProject ? uxProject : apiProject ? apiProject : entProject ? entProject : null;
            uxProject = null;
            apiProject = null;
            entProject = null;
            if (project) {
                vscode.commands.executeCommand("projects.action", project);
                project = null;
            }
        });
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}