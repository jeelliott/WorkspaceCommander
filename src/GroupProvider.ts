import * as vscode from 'vscode';
import { GroupItem } from "./GroupItem";

export class GroupProvider {

    public static get(): GroupItem[] {

        let groups: GroupItem[] = [];

        try {
            if (vscode.workspace.getConfiguration("workspace-commander").get("groups")) {
                groups = vscode.workspace.getConfiguration("workspace-commander").get("groups");
            }
            else {
                groups = [];
            }
        }
        catch {
            groups = [];
        }

        return groups;
    }
}