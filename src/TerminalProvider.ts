import * as vscode from "vscode";

export class TerminalProvider {

    public startTerminal(cmd: string, path: string, id: string): void {
        if (this.terminals[id] === undefined) {
            this.terminals[id] = vscode.window.createTerminal(id);
        }
        if (path !== "") {
            this.terminals[id].sendText("cd " + this.pathPrefix() + path);
        }
        this.terminals[id].sendText(cmd);
        if (id !== "zsh") {
            this.terminals[id].show();
        }
    }

    public stopTerminal(id: string): void {
        this.terminals[id].dispose();
        delete this.terminals[id];
    }

    public onDidCloseTerminal(closedTerminal: vscode.Terminal): void {
        delete this.terminals[closedTerminal.name];
    }

    public terminals: { [id: string]: vscode.Terminal } = {};

    private pathPrefix(): string {
        try {
            if (vscode.workspace.getConfiguration('workspace-commander').get("pathPrefix") !== undefined) {
                return vscode.workspace.getConfiguration("workspace-commander").get("pathPrefix");
            }
            else {
                return "/documents/appdev/";
            }
        }
        catch {
            return "/documents/appdev/";
        }
    }
}
