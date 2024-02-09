import * as vscode from 'vscode';
import UriHandler from './uriHandler';

function activate(context: vscode.ExtensionContext) {
  launchExtensionOnVsCodeStartUp(context);

  new UriHandler();
}

function launchExtensionOnVsCodeStartUp(context) {
  const disposable = vscode.commands.registerCommand('in-terminal.open', () => {
    console.log('[Open Terminal] ✅ open.in-terminal started successfully');
  });

  context.subscriptions.push(disposable);

  vscode.commands.executeCommand('in-terminal.open');
}

export { activate };
