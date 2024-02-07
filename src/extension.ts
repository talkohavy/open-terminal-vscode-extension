import * as vscode from 'vscode';
import UriHandler from './uriHandler';
import Utils from './utils';

function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('in-terminal.helloWorld', () => {
    // Command 1: show a pop-up toast
    vscode.window.showInformationMessage('Hello World');
  });

  context.subscriptions.push(disposable);

  new UriHandler();

  return Utils.activateCommand(context);
}

export { activate };
