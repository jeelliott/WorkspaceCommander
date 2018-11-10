import * as vscode from "vscode";
import { ProjectItem } from "./ProjectItem";

export class ProjectProvider {

    public static get(): ProjectItem[] {

        let projects: ProjectItem[] = [];
        try {
            if (vscode.workspace.getConfiguration("workspace-commander").get("projects")) {
                projects = vscode.workspace.getConfiguration("workspace-commander").get("projects");
            }
        } catch {
            projects = [];
        }

        if (projects) {
            return projects;
        }
        else {
            return [];
        }
    }
}