import * as vscode from 'vscode';
import UriHandler from './uriHandler';

function activate(context: vscode.ExtensionContext) {
  const commands = [
    {
      id: 'in-terminal.restart',
      message: 'Open Terminal Restarted ✅',
    },
    {
      id: 'in-terminal.open',
      message: 'A new Terminal opened 🚀',
    },
  ];

  commands.forEach(({ id, message }) => {
    const disposable = vscode.commands.registerCommand(id, () => {
      vscode.window.showInformationMessage(message);
    });
    vscode.commands.executeCommand('open.in-terminal');

    context.subscriptions.push(disposable);
  });

  new UriHandler();
}

export { activate };
